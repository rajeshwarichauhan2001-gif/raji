"use client";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_CONTENT, StatsContent } from "@/lib/content";

const DURATION = 1800; // ms

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function StatsSectionV2({ data = DEFAULT_CONTENT.stats }: { data?: StatsContent }) {
  const STATS = data.items;
  const sectionRef = useRef<HTMLElement>(null);
  const [values, setValues] = useState<number[]>(() => STATS.map(() => 0));
  const started = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / DURATION, 1);
            const eased = easeOutExpo(progress);

            setValues(STATS.map((s) =>
              parseFloat((s.target * eased).toFixed(s.decimals))
            ));

            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [STATS]);

  return (
    <section ref={sectionRef} className="statsv2-section">
      <div className="statsv2-inner">
        <h2 className="statsv2-title">{data.title}</h2>
        <div className="statsv2-grid">
          {STATS.map((s, i) => (
            <div key={s.label + i} className="statsv2-cell">
              <span className="statsv2-num">
                {(values[i] ?? 0).toFixed(s.decimals)}{s.suffix}
              </span>
              <span className="statsv2-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
