// Client-safe site chrome config (no fs / server-only imports).
// Drives Nav + Footer so an admin dashboard can edit them.

export type LinkItem = { label: string; href: string };
export type SocialItem = { label: string; href: string };

export type SiteChrome = {
  nav: {
    links: LinkItem[];
    signInLabel: string;
    signInHref: string;
    ctaLabel: string;
    ctaHref: string;
  };
  footer: {
    helloHeading: string;
    rotateWords: string[];
    ctaLabel: string;
    ctaHref: string;
    tagline: string;
    socials: SocialItem[];
    serviceLinks: LinkItem[];
    quickLinks: LinkItem[];
    stayHeading: string;
    stayText: string;
    copyright: string;
    legal: string;
  };
};

export const DEFAULT_SITE: SiteChrome = {
  nav: {
    links: [
      { label: "Brands", href: "/brands" },
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    signInLabel: "Sign in",
    signInHref: "#",
    ctaLabel: "Book a call",
    ctaHref: "/contact",
  },
  footer: {
    helloHeading: "HELLO! WE'RE LISTENING",
    rotateWords: ["your project", "your idea", "your vision"],
    ctaLabel: "Sounds Good? Let's connect",
    ctaHref: "/contact",
    tagline:
      "Social media strategy, content and steady community building for brands that want growth with intention.",
    socials: [
      { label: "ig", href: "#" },
      { label: "tw", href: "#" },
      { label: "ln", href: "#" },
      { label: "fb", href: "#" },
    ],
    serviceLinks: [
      { label: "Client Servicing", href: "#" },
      { label: "Social Media Manager", href: "#" },
      { label: "Content Writing", href: "#" },
    ],
    quickLinks: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
    stayHeading: "Stay Informed",
    stayText:
      "Monthly notes on social media, growth and the calm side of building a brand online.",
    copyright: "Copyright © 2025 Rajeshwari Chauhan",
    legal: "Privacy · Terms",
  },
};
