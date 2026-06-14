"use client";
import { usePathname } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CookieStrip from "@/components/layout/CookieStrip";
import FloatingCTA from "@/components/layout/FloatingCTA";
import Preloader from "@/components/layout/Preloader";
import type { SiteChrome as SiteChromeData } from "@/lib/site";

// Hides the public site header/footer/etc. on admin routes so the
// dashboard renders standalone.
export default function SiteChrome({
  site,
  children,
}: {
  site: SiteChromeData;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Preloader />
      <Nav data={site.nav} />
      {children}
      <Footer data={site.footer} />
      <CookieStrip />
      <FloatingCTA />
    </>
  );
}
