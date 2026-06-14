import { DEFAULT_SITE } from "@/lib/site";
import { DEFAULT_BLOG } from "@/lib/blog";
import { DEFAULT_BRANDS } from "@/lib/brands";
import { DEFAULT_ABOUT } from "@/lib/about";
import { DEFAULT_CONTACT } from "@/lib/contact";

// Registry of admin-editable JSON docs (besides home, which has its own route).
export const DOC_DEFAULTS = {
  site: DEFAULT_SITE,
  blog: DEFAULT_BLOG,
  brands: DEFAULT_BRANDS,
  about: DEFAULT_ABOUT,
  contact: DEFAULT_CONTACT,
} as const;

export type DocName = keyof typeof DOC_DEFAULTS;

export function isDocName(n: string): n is DocName {
  return Object.prototype.hasOwnProperty.call(DOC_DEFAULTS, n);
}
