// ============================================================================
// sarvam-proxy — Supabase Edge Function that proxies Sarvam Saaras v2 STT.
// ============================================================================
//
// Source docs:
//   - MASTER-ARCHITECTURE.md §1 (STT primary = Sarvam Saaras v2)
//   - terminal-2-voice/stt-options.md (Sarvam is India-optimized, 5x cheaper)
//   - expert-knowledge/05-security-privacy.md (NO raw audio on server beyond
//     the single passthrough moment; never persisted)
//   - expert-knowledge/06-india-compliance.md (voice = personal data)
//
// Contract:
//   - POST /sarvam-proxy
//     Authorization: Bearer <supabase-jwt>
//     Content-Type: multipart/form-data OR application/json (Sarvam supports both)
//
//   - We pass the body straight through to Sarvam with the server-side
//     SARVAM_API_KEY attached. We DO NOT buffer or persist audio bytes
//     (DPDP: voice is sensitive personal data).
//
//   - Response is JSON (Sarvam is not streaming per-partial in Saaras v2;
//     if/when they add streaming, switch to body passthrough like anthropic-proxy).
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

// Sarvam endpoint — confirm against current Sarvam docs at integration time.
// Using the v1 Speech-to-Text Translate/Transcribe surface; adjust once
// Saaras v2 production endpoint is finalized.
const SARVAM_URL =
  Deno.env.get("SARVAM_STT_URL") ?? "https://api.sarvam.ai/speech-to-text";

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
  const rl = await checkAndIncrement(user.id, DEFAULT_BUCKETS.sarvam);
  if (!rl.allowed) {
    await logAction(user.id, "sarvam_proxy", "rate_limited", {
      bucket: "sarvam",
    });
    return rateLimitResponse(rl, CORS_HEADERS);
  }

  const apiKey = Deno.env.get("SARVAM_API_KEY");
  if (!apiKey) {
    return jsonError(500, "server_misconfigured");
  }

  // ---- 3. Forward -------------------------------------------------------
  // We forward body as a stream — DO NOT await req.arrayBuffer() unless the
  // upstream requires full length. Streaming keeps memory flat and audio
  // does not linger in Edge Function memory.
  const contentType = req.headers.get("Content-Type") ?? "application/octet-stream";
  const contentLength = req.headers.get("Content-Length") ?? undefined;

  const forwardHeaders: Record<string, string> = {
    "Content-Type": contentType,
    // Sarvam uses an api-subscription-key header per their docs.
    "api-subscription-key": apiKey,
  };
  if (contentLength) forwardHeaders["Content-Length"] = contentLength;

  let upstream: Response;
  try {
    upstream = await fetch(SARVAM_URL, {
      method: "POST",
      headers: forwardHeaders,
      body: req.body, // stream passthrough; no buffering
      // Deno fetch requires this hint when sending a stream body.
      // @ts-ignore — not typed in standard fetch lib but supported.
      duplex: "half",
    });
  } catch (e) {
    await logAction(user.id, "sarvam_proxy", "failure", {
      reason: "upstream_fetch_failed",
      error: (e as Error).message,
    });
    return jsonError(502, "upstream_unreachable");
  }

  // ---- 4. Audit log (no audio, no transcript) ---------------------------
  await logAction(
    user.id,
    "sarvam_proxy",
    upstream.ok ? "success" : "failure",
    {
      upstream_status: upstream.status,
      content_type: contentType,
      // Audio duration is what we'd love to log (for billing); require the
      // client to pass it as a header or metadata query param rather than
      // inspecting the bytes.
      audio_seconds: Number(req.headers.get("X-Audio-Seconds") ?? 0) || null,
    },
  );

  // ---- 5. Return JSON (non-streaming for now) ---------------------------
  const respHeaders = new Headers(CORS_HEADERS);
  const upstreamCt = upstream.headers.get("Content-Type");
  if (upstreamCt) respHeaders.set("Content-Type", upstreamCt);

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
    console.warn("[sarvam-proxy] action_log insert failed:", (e as Error).message);
  }
}
