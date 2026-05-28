"use client";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { target: 50,  decimals: 0, suffix: "+",  label: "Completed Projects" },
  { target: 40,  decimals: 0, suffix: "+",  label: "Happy Clients" },
  { target: 3,   decimals: 0, suffix: "+",  label: "Years Experience" },
  { target: 4.5, decimals: 1, suffix: "/5", label: "Client Ratings" },
];

const DURATION = 1800; // ms

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function StatsSectionV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const [values, setValues] = useState(STATS.map(() => 0));
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
  }, []);

  return (
    <section ref={sectionRef} className="statsv2-section">
      <div className="statsv2-inner">
        <h2 className="statsv2-title">
          Enhance Your Digital Impact with My Expertise
        </h2>
        <div className="statsv2-grid">
          {STATS.map((s, i) => (
            <div key={s.label} className="statsv2-cell">
              <span className="statsv2-num">
                {values[i].toFixed(s.decimals)}{s.suffix}
              </span>
              <span className="statsv2-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
