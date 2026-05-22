"use client";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

const services = [
  { label: "Client Servicing", href: "#" },
  { label: "Social Media Manager", href: "#" },
  { label: "Content Writing", href: "#" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="raji-footer">
      <div className="raji-footer-inner">
        <div className="raji-footer-hero">
          <h2 className="raji-footer-hello">HELLO! WE&apos;RE LISTENING</h2>
          <p className="raji-footer-rotate">
            Let&apos;s talk about <em>your project</em> <span>·</span>{" "}
            <em>your idea</em> <span>·</span> <em>your vision</em>
          </p>
          <a href="/contact" className="raji-footer-cta">
            Sounds Good? Let&apos;s connect
          </a>
        </div>

        <div className="raji-footer-grid">
          <div className="raji-footer-brand">
            <Logo style={{ fontSize: 56 }} variant="inverse" />
            <p className="raji-footer-tag">
              Social media strategy, content and steady community building for
              brands that want growth with intention.
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
            <p className="raji-footer-heading">Quick Links</p>
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
              Monthly notes on social media, growth and the calm side of
              building a brand online.
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
          <span>Copyright © 2025 Rajeshwari Chauhan</span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
