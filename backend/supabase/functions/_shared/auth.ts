// ============================================================================
// _shared/auth.ts — JWT verification middleware for Supabase Edge Functions.
// ============================================================================
//
// Source docs:
//   - RAJI-CONTEXT.md §D-09 "Backend proxy mandatory"
//   - expert-knowledge/05-security-privacy.md §"API key protection" + §"User authentication"
//
// Contract:
//   - Every Edge Function MUST call `requireUser(req)` before doing anything
//     that touches upstream paid APIs or user data.
//   - We verify the JWT by letting Supabase resolve it server-side
//     (supabase.auth.getUser(token)) rather than parsing the JWT ourselves,
//     so Supabase's key rotation & revocation are respected automatically.
//   - Returns a typed `AuthedUser` with user id + service-role client bound
//     to the caller's JWT (so downstream DB calls still hit RLS policies).
// ============================================================================

import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.45.4";

export interface AuthedUser {
  /** auth.users.id — UUID. Stable across sessions. */
  id: string;
  /** Phone number, if phone-OTP login was used. May be undefined. */
  phone?: string;
  /** Email, if email login was used. May be undefined. */
  email?: string;
  /** Supabase client scoped to this user's JWT (RLS applies). */
  supabase: SupabaseClient;
  /** Raw access token — needed when forwarding to other Edge Functions. */
  accessToken: string;
}

export class AuthError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Extracts & verifies the JWT from the Authorization header.
 * Throws AuthError on any failure. Caller should catch and convert to 401.
 */
export async function requireUser(req: Request): Promise<AuthedUser> {
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    throw new AuthError(401, "Missing Authorization header");
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !anonKey) {
    // Misconfiguration on our side — treat as 500, not 401.
    throw new AuthError(500, "Supabase env vars missing");
  }

  // Client bound to caller's JWT — RLS will enforce row ownership.
  const supabase = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    throw new AuthError(401, "Invalid or expired token");
  }

  return {
    id: data.user.id,
    phone: data.user.phone ?? undefined,
    email: data.user.email ?? undefined,
    supabase,
    accessToken: token,
  };
}

/**
 * Service-role client — bypasses RLS. Use ONLY for:
 *   - writing to action_log (user cannot write own audit rows)
 *   - rate_limits upserts (user cannot manipulate own bucket)
 *   - admin/cron flows
 * Never expose results from this client straight back to the user without
 * first re-filtering by user id.
 */
export function serviceClient(): SupabaseClient {
  const url = Deno.env.get("SUPABASE_URL")!;
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ---------------------------------------------------------------------------
// CORS helpers — permissive for mobile. Web callers come from a known origin
// and should be tightened in production.
// ---------------------------------------------------------------------------
export const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, anthropic-version",
  "Access-Control-Max-Age": "86400",
};

export function preflight(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }
  return null;
}

export function jsonError(status: number, message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}
