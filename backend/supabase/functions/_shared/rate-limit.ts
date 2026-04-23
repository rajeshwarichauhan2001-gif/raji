// ============================================================================
// _shared/rate-limit.ts — Token-bucket rate limiter backed by Postgres.
// ============================================================================
//
// Source docs:
//   - expert-knowledge/05-security-privacy.md §"API key protection" (rate limits)
//   - expert-knowledge/07-cost-optimization.md (budget guardrails)
//
// Strategy:
//   - Fixed window per (user_id, bucket). Simple, ~1 row write per request.
//   - Token bucket semantics via `count` and `window_start`.
//   - When `now - window_start >= window_seconds`, reset to 0 and re-window.
//   - This uses a single atomic upsert — no distributed-lock headache.
//
// Why not Redis?
//   - We already have Postgres (Supabase).
//   - At <100 RPS/user this is plenty; if we ever exceed that, swap in
//     Upstash Redis without changing call sites (interface stays).
//
// Buckets:
//   - "anthropic"    : Claude API proxy calls (see cost model §6 of ARCH)
//   - "sarvam"       : Sarvam STT proxy calls
//   - Add more as we add proxies. Keep bucket names lowercase.
// ============================================================================

import { serviceClient } from "./auth.ts";

export interface RateLimitConfig {
  /** Human bucket name. Must be stable. */
  bucket: string;
  /** Max requests allowed per window. */
  limit: number;
  /** Window size in seconds. */
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  /** Epoch millis when the current window resets. */
  resetAt: number;
}

/**
 * Default per-user buckets. Tune as real traffic data comes in.
 *
 * Rationale:
 *   - anthropic 30/min: at 15 exchanges/user/day (MASTER-ARCH §6), 30/min is
 *     ~45x headroom vs steady-state — comfortable for burst, tight against
 *     extracted-key abuse.
 *   - sarvam 60/min: STT may fire several chunks per utterance; 2x anthropic.
 */
export const DEFAULT_BUCKETS: Record<string, RateLimitConfig> = {
  anthropic: { bucket: "anthropic", limit: 30, windowSeconds: 60 },
  sarvam: { bucket: "sarvam", limit: 60, windowSeconds: 60 },
};

/**
 * Check + increment in a single round-trip.
 * Returns { allowed: false } if the caller should be rejected (HTTP 429).
 *
 * Implementation note: we use an atomic UPSERT that resets the window when
 * the stored window_start is stale. Postgres handles the race via primary key.
 */
export async function checkAndIncrement(
  userId: string,
  cfg: RateLimitConfig,
): Promise<RateLimitResult> {
  const db = serviceClient();
  const nowMs = Date.now();
  const nowIso = new Date(nowMs).toISOString();
  const windowMs = cfg.windowSeconds * 1000;

  // Atomic upsert via SQL: if row missing or window expired, reset; else bump.
  const { data, error } = await db.rpc("rate_limit_touch", {
    p_user_id: userId,
    p_bucket: cfg.bucket,
    p_limit: cfg.limit,
    p_window_seconds: cfg.windowSeconds,
    p_now: nowIso,
  });

  // If the RPC helper isn't deployed yet, fall back to a best-effort
  // read-then-write (acceptable for MVP; migrate to RPC before scale).
  if (error && error.code === "PGRST202" /* function not found */) {
    return await fallbackTouch(userId, cfg, nowMs, windowMs);
  }
  if (error) {
    // Fail-open on DB errors — we don't want to take down chat because rate
    // limiter flaked. Log it via action_log at the call-site if needed.
    console.warn("[rate-limit] db error, fail-open:", error.message);
    return {
      allowed: true,
      remaining: cfg.limit,
      resetAt: nowMs + windowMs,
    };
  }

  const row = Array.isArray(data) ? data[0] : data;
  const count = row?.count ?? 0;
  const windowStart = row?.window_start
    ? new Date(row.window_start).getTime()
    : nowMs;

  return {
    allowed: count <= cfg.limit,
    remaining: Math.max(0, cfg.limit - count),
    resetAt: windowStart + windowMs,
  };
}

/**
 * Fallback path when the `rate_limit_touch` RPC isn't deployed.
 * Runs two queries — not atomic, but bounded by per-user contention.
 */
async function fallbackTouch(
  userId: string,
  cfg: RateLimitConfig,
  nowMs: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const db = serviceClient();
  const { data: existing } = await db
    .from("rate_limits")
    .select("count, window_start")
    .eq("user_id", userId)
    .eq("bucket", cfg.bucket)
    .maybeSingle();

  let count = 1;
  let windowStart = new Date(nowMs).toISOString();
  if (existing) {
    const startMs = new Date(existing.window_start).getTime();
    if (nowMs - startMs < windowMs) {
      count = (existing.count ?? 0) + 1;
      windowStart = existing.window_start;
    }
  }

  const { error } = await db.from("rate_limits").upsert(
    {
      user_id: userId,
      bucket: cfg.bucket,
      count,
      window_start: windowStart,
    },
    { onConflict: "user_id,bucket" },
  );

  if (error) {
    console.warn("[rate-limit] upsert fallback failed, fail-open:", error.message);
    return { allowed: true, remaining: cfg.limit, resetAt: nowMs + windowMs };
  }

  return {
    allowed: count <= cfg.limit,
    remaining: Math.max(0, cfg.limit - count),
    resetAt: new Date(windowStart).getTime() + windowMs,
  };
}

/**
 * Standard 429 response shape with Retry-After + remaining headers.
 */
export function rateLimitResponse(
  result: RateLimitResult,
  corsHeaders: Record<string, string>,
): Response {
  const retryAfterSec = Math.max(
    1,
    Math.ceil((result.resetAt - Date.now()) / 1000),
  );
  return new Response(
    JSON.stringify({
      error: "rate_limited",
      retry_after_seconds: retryAfterSec,
    }),
    {
      status: 429,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Retry-After": String(retryAfterSec),
        "X-RateLimit-Remaining": String(result.remaining),
        "X-RateLimit-Reset": String(Math.floor(result.resetAt / 1000)),
      },
    },
  );
}
