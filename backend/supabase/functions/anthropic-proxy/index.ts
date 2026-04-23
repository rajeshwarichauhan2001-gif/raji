// ============================================================================
// anthropic-proxy — Supabase Edge Function that proxies Claude API calls.
// ============================================================================
//
// Source docs:
//   - RAJI-CONTEXT.md §D-09 "Backend proxy mandatory"
//   - MASTER-ARCHITECTURE.md §1 "Unified Tech Stack" (LLM row)
//   - expert-knowledge/05-security-privacy.md §"API key protection"
//   - expert-knowledge/04-performance-latency.md (streaming is non-negotiable)
//   - expert-knowledge/07-cost-optimization.md (Opus 4.7 tokenizer warning)
//
// Contract:
//   - POST /anthropic-proxy
//     Authorization: Bearer <supabase-jwt>
//     Body: Anthropic /v1/messages payload — we pass it through unchanged
//           (including `stream: true`, tool definitions, cache_control blocks).
//
//   - The real ANTHROPIC_API_KEY never leaves the Edge Function environment.
//   - Response is streamed back as SSE (Anthropic native) — we simply
//     forward the upstream body with compatible headers.
//
// DPDP / PII:
//   - We DO NOT log the message body. We log only {prompt_tokens_est,
//     model, stream, status}. Client is responsible for redacting secrets
//     before calling us (see expert-knowledge/05 §"Voice prompt injection").
// ============================================================================

import {
  AuthError,
  CORS_HEADERS,
  jsonError,
  preflight,
  requireUser,
  serviceClient,
} from "../_shared/auth.ts";
import {
  checkAndIncrement,
  DEFAULT_BUCKETS,
  rateLimitResponse,
} from "../_shared/rate-limit.ts";

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
// Pin a conservative default; callers may override via request body if we ever
// expose model selection. Using 2023-06-01 + extended tool-use header.
const ANTHROPIC_VERSION = Deno.env.get("ANTHROPIC_VERSION") ?? "2023-06-01";

Deno.serve(async (req: Request): Promise<Response> => {
  const pf = preflight(req);
  if (pf) return pf;

  if (req.method !== "POST") {
    return jsonError(405, "method_not_allowed");
  }

  // ---- 1. Auth ------------------------------------------------------------
  let user;
  try {
    user = await requireUser(req);
  } catch (e) {
    const status = e instanceof AuthError ? e.status : 401;
    return jsonError(status, (e as Error).message);
  }

  // ---- 2. Rate limit ------------------------------------------------------
  const rl = await checkAndIncrement(user.id, DEFAULT_BUCKETS.anthropic);
  if (!rl.allowed) {
    await logAction(user.id, "anthropic_proxy", "rate_limited", {
      bucket: "anthropic",
    });
    return rateLimitResponse(rl, CORS_HEADERS);
  }

  // ---- 3. Parse body (keep it opaque; we just forward) --------------------
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "invalid_json");
  }

  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) {
    return jsonError(500, "server_misconfigured");
  }

  // Metadata we safely know about (no message content).
  const model = typeof body.model === "string" ? body.model : "unknown";
  const stream = body.stream === true;

  // ---- 4. Forward to Anthropic -------------------------------------------
  let upstream: Response;
  try {
    upstream = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
        // Pass through prompt-caching beta header; safe if not used.
        "anthropic-beta": "prompt-caching-2024-07-31",
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    await logAction(user.id, "anthropic_proxy", "failure", {
      model,
      stream,
      reason: "upstream_fetch_failed",
      error: (e as Error).message,
    });
    return jsonError(502, "upstream_unreachable");
  }

  // ---- 5. Audit log (no PII) ---------------------------------------------
  await logAction(
    user.id,
    "anthropic_proxy",
    upstream.ok ? "success" : "failure",
    {
      model,
      stream,
      upstream_status: upstream.status,
      // Rough estimate; Opus 4.7 tokenizer is ~35% higher than 4.6
      // (expert-knowledge/07). Client-side estimate is better — we just
      // record whatever the client reported in metadata if present.
      prompt_tokens_est: (body.metadata as Record<string, unknown>)?.prompt_tokens_est ?? null,
    },
  );

  // ---- 6. Stream passthrough ---------------------------------------------
  // Anthropic sets Content-Type: text/event-stream for SSE. We keep that
  // intact so the client's SSE parser works unchanged.
  const respHeaders = new Headers(CORS_HEADERS);
  const contentType = upstream.headers.get("Content-Type");
  if (contentType) respHeaders.set("Content-Type", contentType);
  // Disable any proxy buffering that could defeat streaming.
  respHeaders.set("X-Accel-Buffering", "no");
  respHeaders.set("Cache-Control", "no-cache");

  return new Response(upstream.body, {
    status: upstream.status,
    headers: respHeaders,
  });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
async function logAction(
  userId: string,
  actionType: string,
  status: "success" | "failure" | "partial" | "rate_limited" | "blocked" | "pending",
  details: Record<string, unknown>,
): Promise<void> {
  try {
    const db = serviceClient();
    await db.from("action_log").insert({
      user_id: userId,
      action_type: actionType,
      status,
      details,
    });
  } catch (e) {
    // Never fail the user request on audit-log error; just warn.
    console.warn("[anthropic-proxy] action_log insert failed:", (e as Error).message);
  }
}
