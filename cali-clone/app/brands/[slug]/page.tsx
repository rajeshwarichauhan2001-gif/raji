import { notFound } from "next/navigation";
import MastMasalaPage from "@/components/brands/MastMasalaPage";
import { getDoc } from "@/lib/store";
import { DEFAULT_BRANDS, findBrand } from "@/lib/brands";
import { isAdmin, isPublic } from "@/lib/adminSession";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getDoc("brands", DEFAULT_BRANDS);
  const brand = findBrand(data, slug);
  return { title: brand?.name ?? "Brand" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getDoc("brands", DEFAULT_BRANDS);
  const brand = findBrand(data, slug);

  if (!brand) notFound();
  if (!isPublic(brand) && !(await isAdmin())) notFound();

  return <MastMasalaPage data={brand} />;
}
