"use client";
import { useMarquee } from "@/hooks/useMarquee";
import EyebrowText from "@/components/ui/EyebrowText";

const wordmarks = ["JOURNAL", "GAZETTE", "EDITION", "REVIEW", "TRIBUNE"];

function Mark({ label }: { label: string }) {
  return (
    <svg height="40" viewBox="0 0 200 40" style={{ overflow: "visible" }} aria-label={label}>
      <text
        x="0"
        y="30"
        style={{
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 30,
          letterSpacing: "0.08em",
          fill: "var(--color-text)",
        }}
      >
        {label}
      </text>
    </svg>
  );
}

export default function PressMarqueeSection() {
  const ref = useMarquee({ duration: 30 });
  const items = [...wordmarks, ...wordmarks];

  return (
    <section style={{ background: "var(--color-bg-alt)", padding: "48px 0" }}>
      <div className="container-x text-center mb-8">
        <EyebrowText>my clients featured in</EyebrowText>
      </div>
      <div ref={ref as React.Ref<HTMLDivElement>} className="overflow-hidden">
        <div className="marquee-track flex gap-24 w-max">
          {items.concat(items).map((w, i) => (
            <div key={i} className="shrink-0 flex items-center justify-center" style={{ minWidth: 200 }}>
              <Mark label={w} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
