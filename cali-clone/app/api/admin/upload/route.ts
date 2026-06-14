import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { UPLOADS_DIR, ensureDirs } from "@/lib/storage";

export const dynamic = "force-dynamic";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: `Unsupported type: ${file.type}` }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "Max 10MB" }, { status: 400 });
  }

  await ensureDirs();
  const buf = Buffer.from(await file.arrayBuffer());
  const safe = file.name.replace(/[^a-z0-9.]+/gi, "-").replace(/-+/g, "-").toLowerCase();
  const stamp = `${Date.now()}-${Math.round(buf.length % 100000)}`;
  const name = `${stamp}-${safe || `upload.${EXT[file.type]}`}`;
  await fs.writeFile(path.join(UPLOADS_DIR, name), buf);

  return NextResponse.json({ url: `/api/media/${name}` });
}
