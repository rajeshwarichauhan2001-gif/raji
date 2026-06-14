"use client";
import BoomerangVideoBg from "./BoomerangVideoBg";
import { DEFAULT_CONTENT, HeroContent } from "@/lib/content";

const styleClass: Record<string, string> = {
  primary: "hero-boom-btn-primary",
  outline: "hero-boom-btn-outline",
  ghost: "hero-boom-btn-ghost",
};

export default function HeroSection({ data = DEFAULT_CONTENT.hero }: { data?: HeroContent }) {
  return (
    <section className="hero-boom">
      <BoomerangVideoBg src={data.bgVideo} className="hero-boom-bg" />
      <div className="hero-boom-veil" />

      <div className="hero-boom-copy">
        <p className="hero-boom-eyebrow">{data.eyebrow}</p>
        <h1 className="hero-boom-title">
          {data.title}{" "}
          <span className="hero-boom-accent">{data.titleAccent}</span>
        </h1>
        <p className="hero-boom-sub">{data.sub}</p>
        <div className="hero-boom-actions">
          {data.actions.map((a, i) => (
            <a key={i} href={a.href} className={styleClass[a.style] || "hero-boom-btn-ghost"}>
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
