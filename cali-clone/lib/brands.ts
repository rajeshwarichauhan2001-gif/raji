// Client-safe Brands collection model (no "fs").
// Each brand has archive-card fields PLUS the full case-study content (BrandData).
import { BrandData, DEFAULT_BRAND } from "@/lib/brand";

export type Brand = BrandData & {
  slug: string;          // url segment → /brands/<slug>
  name: string;          // brand name shown on the card
  logo: string;          // logo image URL or /api/media/... (empty → initials placeholder)
  cardDescription: string; // short blurb on the archive card
  published?: boolean;   // hidden from public site when false (draft). undefined = visible.
};

export type BrandsData = {
  archiveTitle: string;
  archiveIntro: string;
  items: Brand[];
};

export const DEFAULT_BRANDS: BrandsData = {
  archiveTitle: "Brands",
  archiveIntro: "A selection of brands we've helped grow with strategy, content and community.",
  items: [
    {
      ...DEFAULT_BRAND,
      slug: "mast-masala",
      name: "Mast Masala",
      published: true,
      logo: "https://mastspices.com/wp-content/uploads/2025/08/logo-107x104.png",
      cardDescription: "60 years of spice legacy — festive content and steady social growth.",
    },
  ],
};

export function findBrand(d: BrandsData, slug: string): Brand | undefined {
  return d.items.find((b) => b.slug === slug);
}
