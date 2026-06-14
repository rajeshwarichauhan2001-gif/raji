"use client";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { DEFAULT_SITE, type SiteChrome } from "@/lib/site";

export default function Footer({ data = DEFAULT_SITE.footer }: { data?: SiteChrome["footer"] }) {
  return (
    <footer className="raji-footer">
      <div className="raji-footer-inner">
        <div className="raji-footer-hero">
          <h2 className="raji-footer-hello">{data.helloHeading}</h2>
          <p className="raji-footer-rotate">
            Let&apos;s talk about{" "}
            {data.rotateWords.map((w, i) => (
              <span key={w}>
                {i > 0 ? <span>·</span> : null}
                {i > 0 ? " " : null}
                <em>{w}</em>{" "}
              </span>
            ))}
          </p>
          <a href={data.ctaHref} className="raji-footer-cta">
            {data.ctaLabel}
          </a>
        </div>

        <div className="raji-footer-grid">
          <div className="raji-footer-brand">
            <Logo style={{ fontSize: 56 }} variant="inverse" />
            <p className="raji-footer-tag">{data.tagline}</p>
            <div className="raji-footer-socials">
              {data.socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="raji-footer-social">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="raji-footer-col">
            <p className="raji-footer-heading">Services</p>
            <ul>
              {data.serviceLinks.map((s) => (
                <li key={s.label}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="raji-footer-col">
            <p className="raji-footer-heading">Quick Links</p>
            <ul>
              {data.quickLinks.map((c) => (
                <li key={c.label}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="raji-footer-col">
            <p className="raji-footer-heading">{data.stayHeading}</p>
            <p className="raji-footer-subtle">{data.stayText}</p>
            <form
              className="raji-footer-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe">→</button>
            </form>
          </div>
        </div>

        <div className="raji-footer-bottom">
          <span>{data.copyright}</span>
          <span>{data.legal}</span>
        </div>
      </div>
    </footer>
  );
}
