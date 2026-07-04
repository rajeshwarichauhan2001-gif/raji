import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminSession";
import { scaffoldFromUrl } from "@/lib/scaffoldBrand";

export const dynamic = "force-dynamic";

// POST { url } → returns a draft Brand parsed from the site (not persisted).
// The client inserts it into the brands collection; the operator reviews and
// then saves via the normal "Save changes" flow.
export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const url = body.url?.trim();
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  try {
    const brand = await scaffoldFromUrl(url);
    return NextResponse.json({ brand });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Scaffold failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
