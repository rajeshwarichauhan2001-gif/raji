"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import MobileNavOverlay from "./MobileNavOverlay";
import { useNavScroll } from "@/hooks/useNavScroll";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "/about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
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
            {NAV_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="raji-nav-link">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="raji-nav-actions">
            <Link href="#" className="raji-nav-signin">Sign in</Link>
            <Link href="/contact" className="raji-nav-cta">
              Book a call <span aria-hidden="true">→</span>
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
        links={NAV_LINKS}
      />
    </>
  );
}
