import { NextRequest, NextResponse } from "next/server";
import { getDoc, saveDoc } from "@/lib/store";
import { DOC_DEFAULTS, DocName, isDocName } from "@/lib/registry";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  if (!isDocName(name)) return NextResponse.json({ error: "Unknown doc" }, { status: 404 });
  const data = await getDoc(name as DocName, DOC_DEFAULTS[name as DocName]);
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  if (!isDocName(name)) return NextResponse.json({ error: "Unknown doc" }, { status: 404 });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  await saveDoc(name as DocName, body);
  return NextResponse.json({ ok: true });
}
