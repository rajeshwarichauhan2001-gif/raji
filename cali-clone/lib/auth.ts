// Simple single-admin auth. Set ADMIN_PASSWORD in Railway env vars.
export const SESSION_COOKIE = "raji_admin";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "admin123";
}

// Session token = sha256(password). Works in both Node and Edge (middleware)
// via the Web Crypto API, so we never ship the raw password in the cookie.
export async function expectedToken(): Promise<string> {
  const data = new TextEncoder().encode(`raji::${getAdminPassword()}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  return token === (await expectedToken());
}
