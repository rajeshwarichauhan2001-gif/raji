"use client";
import Image from "next/image";
import { useFadeUp } from "@/hooks/useFadeUp";
import { IMG, unsplashUrl } from "@/lib/unsplash";

function NumeralBlock({
  numeral,
  eyebrow,
  body,
  link,
}: { numeral: string; eyebrow: string; body: string; link?: string }) {
  const ref = useFadeUp({ selector: ".fu", stagger: 0.15 });
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className="flex flex-col gap-6 md:px-12">
      <span
        className="fu"
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: "clamp(120px, 14vw, 220px)",
          lineHeight: 0.8,
          opacity: 0.85,
          color: "var(--color-accent-2)",
        }}
      >
        {numeral}
      </span>
      <span className="fu eyebrow-italic">{eyebrow}</span>
      <p className="fu" style={{ fontSize: 16, lineHeight: 1.75, color: "var(--color-text-muted)", maxWidth: 460 }}>
        {body}
      </p>
      {link && (
        <a className="fu arrow-link" href="#">
          {link} <span aria-hidden>→</span>
        </a>
      )}
    </div>
  );
}

export default function MissionValuesSection() {
  return (
    <section className="relative overflow-hidden" style={{ padding: "160px 0" }}>
      <div className="hidden xl:block absolute -z-0 pointer-events-none" style={{ top: 80, left: "8vw", width: 200, height: 280 }}>
        <Image src={unsplashUrl(IMG.desk1, 600)} alt="" fill sizes="200px" style={{ objectFit: "cover" }} />
      </div>
      <div className="hidden xl:block absolute -z-0 pointer-events-none" style={{ bottom: 80, right: "8vw", width: 220, height: 300 }}>
        <Image src={unsplashUrl(IMG.flat2, 600)} alt="" fill sizes="220px" style={{ objectFit: "cover" }} />
      </div>
      <div className="container-x grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10" style={{ borderLeft: "0" }}>
        <NumeralBlock
          numeral="1"
          eyebrow="mission & goals"
          body="To make modern strategy feel intimate again — I help women translate complex business goals into calm,
          beautiful work they actually want to do. Every system I build is tuned to your nervous system, not someone else's."
          link="more about me"
        />
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0" style={{ width: 1, background: "var(--color-divider)" }} />
        <NumeralBlock
          numeral="2"
          eyebrow="values & believes"
          body="Slow growth. Honest words. Boundaries as a creative tool. I believe femininity is a business advantage and
          rest is a strategy in itself."
        />
      </div>
    </section>
  );
}
