import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/content.server";
import { SiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  let body: SiteContent;
  try {
    body = (await req.json()) as SiteContent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !body.hero) {
    return NextResponse.json({ error: "Invalid content shape" }, { status: 400 });
  }
  await saveContent(body);
  return NextResponse.json({ ok: true });
}
