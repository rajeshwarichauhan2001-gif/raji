// Server-only: build a draft Brand from just a website URL.
// Fetches the page HTML and best-effort extracts name, logo, description and a
// theme colour, then clones DEFAULT_BRAND and overrides the surface fields.
// Case-study data (stats, analytics, gallery, videos) can't come from a URL —
// that's the operator's own work, filled in the admin editor afterwards.
import { DEFAULT_BRAND } from "@/lib/brand";
import type { Brand } from "@/lib/brands";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function normUrl(input: string): URL {
  const trimmed = input.trim();
  const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return new URL(withProto);
}

// Pull the content of the first matching <meta ...> tag (property or name).
function meta(html: string, key: string): string | undefined {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${key}["'][^>]*>`,
    "i"
  );
  const tag = html.match(re)?.[0];
  if (!tag) return undefined;
  const content = tag.match(/content=["']([^"']*)["']/i)?.[1];
  return content?.trim() || undefined;
}

// Absolute-ise a possibly-relative asset URL against the page origin.
function abs(base: URL, href?: string): string {
  if (!href) return "";
  try {
    return new URL(href, base).toString();
  } catch {
    return "";
  }
}

function pickLogo(html: string, base: URL): string {
  // Preference: og:image → apple-touch-icon → <link rel icon> → <img> with "logo".
  const og = meta(html, "og:image");
  if (og) return abs(base, og);

  const linkRe = /<link[^>]+rel=["']([^"']*)["'][^>]*>/gi;
  let m: RegExpExecArray | null;
  let icon = "";
  while ((m = linkRe.exec(html))) {
    const rel = m[1].toLowerCase();
    const href = m[0].match(/href=["']([^"']*)["']/i)?.[1];
    if (!href) continue;
    if (rel.includes("apple-touch-icon")) return abs(base, href);
    if (rel.includes("icon") && !icon) icon = abs(base, href);
  }
  if (icon) return icon;

  const imgRe = /<img[^>]+>/gi;
  while ((m = imgRe.exec(html))) {
    const tag = m[0];
    const src = tag.match(/src=["']([^"']*)["']/i)?.[1];
    if (!src) continue;
    if (/logo/i.test(tag)) return abs(base, src);
  }
  return "";
}

function title(html: string): string | undefined {
  const t = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
  return t || undefined;
}

// ---- colour helpers: derive a 5-colour palette from a single seed hex ----
function parseHex(c?: string): [number, number, number] | null {
  if (!c) return null;
  const m = c.trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split("").map((x) => x + x).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}
const toHex = (rgb: number[]) =>
  "#" + rgb.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
const mix = (rgb: number[], target: number, amt: number) =>
  rgb.map((v) => v + (target - v) * amt);

function paletteFrom(seed?: string): Brand["palette"] | null {
  const rgb = parseHex(seed);
  if (!rgb) return null;
  return {
    primary: toHex(rgb),
    bg: toHex(mix(rgb, 255, 0.94)),     // very light tint of brand colour
    bgSoft: toHex(mix(rgb, 255, 0.88)),
    ink: toHex(mix(rgb, 0, 0.82)),      // dark, slightly brand-tinted
    accent: toHex(mix(rgb, 255, 0.35)), // lighter secondary accent
  };
}

export async function scaffoldFromUrl(input: string): Promise<Brand> {
  const url = normUrl(input);

  const res = await fetch(url.toString(), {
    headers: { "user-agent": "Mozilla/5.0 (RajiBrandScaffold)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  const html = await res.text();

  const name =
    meta(html, "og:site_name") ||
    (title(html) || "").split(/[|\-–—·]/)[0].trim() ||
    url.hostname.replace(/^www\./, "");

  const description =
    meta(html, "og:description") || meta(html, "description") || "";

  const logo = pickLogo(html, url);
  const themeColor = meta(html, "theme-color");
  const palette = paletteFrom(themeColor);

  const base = structuredClone(DEFAULT_BRAND);
  const brand: Brand = {
    ...base,
    slug: slugify(name) || slugify(url.hostname.replace(/^www\./, "")),
    name,
    logo,
    cardDescription: description.slice(0, 160),
    published: false, // always land as a draft for review
    ...(palette ? { palette, brandColor: palette.primary } : {}),
    hero: {
      ...base.hero,
      eyebrow: "Case Study",
      title: name.toUpperCase(),
      bgText: name,
      tagline: description.slice(0, 120) || base.hero.tagline,
    },
    story: {
      ...base.story,
      body: description || base.story.body,
    },
  };
  return brand;
}
