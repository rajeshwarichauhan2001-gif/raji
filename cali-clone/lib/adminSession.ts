import { cookies } from "next/headers";
import { SESSION_COOKIE, isValidToken } from "@/lib/auth";

// Server-only: is the current request an authenticated admin?
// Used so the dashboard's live preview can see drafts while the public can't.
export async function isAdmin(): Promise<boolean> {
  const c = await cookies();
  return isValidToken(c.get(SESSION_COOKIE)?.value);
}

// A brand/post is visible to the public unless explicitly marked draft.
export const isPublic = (item: { published?: boolean }) => item.published !== false;
