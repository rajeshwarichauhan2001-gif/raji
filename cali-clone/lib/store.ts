// Generic JSON document store (server-only — uses fs).
// Each "doc" is a named JSON file under DATA_DIR, e.g. site.json, blog.json.
// Frontend routes call getDoc(name, DEFAULTS); the admin API reads/writes via
// the same names. Shallow-merge over defaults so new schema keys never break.
import path from "path";
import { promises as fs } from "fs";
import { DATA_DIR } from "@/lib/storage";

export async function getDoc<T>(name: string, defaults: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, `${name}.json`), "utf8");
    const stored = JSON.parse(raw);
    if (Array.isArray(defaults)) return (stored ?? defaults) as T;
    return { ...defaults, ...stored } as T;
  } catch {
    return defaults;
  }
}

export async function saveDoc<T>(name: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, `${name}.json`), JSON.stringify(data, null, 2), "utf8");
}
