"use client";
import { useMarquee } from "@/hooks/useMarquee";

export default function DailyPlannerMarquee() {
  const ref = useMarquee({ duration: 22 });
  const items = Array.from({ length: 4 });
  return (
    <section style={{ background: "var(--color-accent)", overflow: "hidden", padding: "48px 0" }}>
      <div ref={ref as React.Ref<HTMLDivElement>}>
        <div className="marquee-track flex items-center w-max">
          {items.concat(items).map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(56px, 9vw, 120px)",
                lineHeight: 1,
                whiteSpace: "nowrap",
                padding: "0 32px",
              }}
            >
              / daily planner
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
