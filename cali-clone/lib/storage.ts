import path from "path";
import { promises as fs } from "fs";

// On Railway, mount a Volume and set DATA_DIR=/data so edits + uploads persist
// across deploys. Locally it falls back to ./data inside the project.
export const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "data");

export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");
export const CONTENT_FILE = path.join(DATA_DIR, "content.json");

export async function ensureDirs() {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

export async function readJson<T>(file: string): Promise<T | null> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeJson(file: string, data: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}
