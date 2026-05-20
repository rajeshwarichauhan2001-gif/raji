"use client";
import { useCountUp } from "@/hooks/useCountUp";
import { useFadeUp } from "@/hooks/useFadeUp";

type ColProps = { numeral: string; sub: string; body: string; useCount?: boolean; target?: number; suffix?: string };

function Col({ numeral, sub, body, useCount = false, target = 0, suffix = "" }: ColProps) {
  const countRef = useCountUp(target, suffix);
  const textRef = useFadeUp({ selector: ".fu", stagger: 0.1, delay: 0.3 });
  return (
    <div className="flex flex-col gap-5 px-8">
      {useCount ? (
        <h2 ref={countRef as React.Ref<HTMLHeadingElement>} style={{ fontSize: "clamp(64px, 8vw, 120px)", lineHeight: 0.95 }}>
          0{suffix}
        </h2>
      ) : (
        <h2 style={{ fontSize: "clamp(64px, 8vw, 120px)", lineHeight: 0.95 }}>{numeral}</h2>
      )}
      <div ref={textRef as React.Ref<HTMLDivElement>}>
        <p className="fu mb-3" style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22 }}>{sub}</p>
        <p className="fu mb-4" style={{ fontSize: 14, color: "var(--color-text-muted)", lineHeight: 1.7 }}>{body}</p>
        <a className="fu arrow-link" href="#">learn more <span aria-hidden>→</span></a>
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section style={{ background: "var(--color-bg-alt)", padding: "120px 0" }}>
      <div className="container-x grid grid-cols-1 md:grid-cols-3" style={{ position: "relative" }}>
        <Col useCount target={1500} suffix="+" numeral="1500+" sub="amazing students" body="from 14 countries who finished a Raji program in the last three years." />
        <div className="hidden md:block" style={{ position: "absolute", left: "33.333%", top: 0, bottom: 0, width: 1, background: "var(--color-divider)" }} />
        <Col useCount target={50} suffix="+" numeral="50+" sub="Businesses Supported" body="from boutique studios to coaching practices — each rebuilt with intention." />
        <div className="hidden md:block" style={{ position: "absolute", left: "66.666%", top: 0, bottom: 0, width: 1, background: "var(--color-divider)" }} />
        <Col numeral="∞" sub="Success Stories" body="because the most magnetic thing a strategy can do is keep working long after we&apos;ve hung up the call." />
      </div>
    </section>
  );
}
