"use client";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

const services = [
  { label: "Client Servicing", href: "#" },
  { label: "Social Media", href: "#" },
  { label: "Content Writing", href: "#" },
  { label: "Brand Strategy", href: "#" },
  { label: "Analytics", href: "#" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Process", href: "#" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="raji-footer">
      <div className="raji-footer-inner">
        <div className="raji-footer-grid">
          <div className="raji-footer-brand">
            <Logo style={{ fontSize: 56 }} variant="inverse" />
            <p className="raji-footer-tag">
              Strategy, content and steady community building for service providers
              and coaches who would rather grow with intention than chase trends.
            </p>
            <div className="raji-footer-socials">
              {[
                { k: "ig", label: "Instagram" },
                { k: "tw", label: "Twitter" },
                { k: "ln", label: "LinkedIn" },
                { k: "fb", label: "Facebook" },
              ].map((s) => (
                <a key={s.k} href="#" aria-label={s.label} className="raji-footer-social">
                  {s.k}
                </a>
              ))}
            </div>
          </div>

          <div className="raji-footer-col">
            <p className="raji-footer-heading">Services</p>
            <ul>
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="raji-footer-col">
            <p className="raji-footer-heading">Company</p>
            <ul>
              {company.map((c) => (
                <li key={c.label}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="raji-footer-col">
            <p className="raji-footer-heading">Stay Informed</p>
            <p className="raji-footer-subtle">
              Monthly notes on content, growth and the calm side of building a brand online.
            </p>
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
          <span>© 2026 Raji · Social Media Strategist · Mumbai</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
