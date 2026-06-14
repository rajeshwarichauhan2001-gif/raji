"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import MobileNavOverlay from "./MobileNavOverlay";
import { useNavScroll } from "@/hooks/useNavScroll";
import { DEFAULT_SITE, type SiteChrome } from "@/lib/site";

export default function Nav({ data = DEFAULT_SITE.nav }: { data?: SiteChrome["nav"] }) {
  const scrolled = useNavScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={`raji-nav-wrap ${scrolled ? "is-scrolled" : ""}`}>
        <div className="raji-nav">
          <Link href="/" className="raji-nav-logo" aria-label="raji home">
            <Logo style={{ fontSize: 30 }} />
          </Link>

          <nav className="raji-nav-center" aria-label="primary">
            {data.links.map((l) => (
              <Link key={l.label} href={l.href} className="raji-nav-link">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="raji-nav-actions">
            <Link href={data.signInHref} className="raji-nav-signin">{data.signInLabel}</Link>
            <Link href={data.ctaHref} className="raji-nav-cta">
              {data.ctaLabel} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <button
            type="button"
            className="raji-nav-hamburger"
            aria-label="open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <MobileNavOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={data.links}
      />
    </>
  );
}
