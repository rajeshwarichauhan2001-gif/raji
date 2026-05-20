"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type CardSpec = {
  title: string;
  body: string;
  bg: string;
  accent: string;
  icon: "wave" | "clover" | "diamond";
};

const CARDS: CardSpec[] = [
  {
    title: "Product Foundation",
    body: "We structure your product experience from the ground up — aligning user needs, business goals, and scalable design systems.",
    bg: "linear-gradient(160deg, #d8dad9 0%, #b6b9b7 100%)",
    accent: "#f1f3f2",
    icon: "wave",
  },
  {
    title: "Performance Optimization",
    body: "Through thoughtful iteration and system-level improvements, we refine your product to perform smoothly at scale.",
    bg: "linear-gradient(160deg, #6dbe55 0%, #4ea03c 100%)",
    accent: "#c8e8bb",
    icon: "clover",
  },
  {
    title: "Focused Execution",
    body: "When speed matters, we step in with precise solutions that remove friction and keep your team moving forward.",
    bg: "linear-gradient(160deg, #5fa8e3 0%, #3b85c4 100%)",
    accent: "#c5e0f3",
    icon: "diamond",
  },
];

const IMG_URL =
  "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1800&q=80&auto=format&fit=crop";

function Icon({ kind }: { kind: CardSpec["icon"] }) {
  if (kind === "wave") {
    return (
      <svg viewBox="0 0 64 64" width="68" height="68" aria-hidden="true">
        <circle cx="32" cy="32" r="28" fill="rgba(255,255,255,0.85)" />
        <path
          d="M16 32 q4 -6 8 0 t8 0 t8 0 t8 0 M16 38 q4 -6 8 0 t8 0 t8 0 t8 0 M16 26 q4 -6 8 0 t8 0 t8 0 t8 0"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    );
  }
  if (kind === "clover") {
    return (
      <svg viewBox="0 0 64 64" width="68" height="68" aria-hidden="true">
        <g fill="rgba(255,255,255,0.85)">
          <circle cx="32" cy="18" r="10" />
          <circle cx="32" cy="46" r="10" />
          <circle cx="18" cy="32" r="10" />
          <circle cx="46" cy="32" r="10" />
        </g>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" width="68" height="68" aria-hidden="true">
      <g fill="rgba(255,255,255,0.85)">
        <rect x="18" y="6"  width="12" height="12" rx="2" transform="rotate(45 24 12)" />
        <rect x="32" y="22" width="12" height="12" rx="2" transform="rotate(45 38 28)" />
        <rect x="46" y="38" width="12" height="12" rx="2" transform="rotate(45 52 44)" />
      </g>
    </svg>
  );
}

export default function ImpactFlip() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const strips = Array.from(wrap.querySelectorAll<HTMLDivElement>(".istrip"));
    const inners = Array.from(wrap.querySelectorAll<HTMLDivElement>(".istrip-inner"));
    const heading = wrap.querySelector<HTMLElement>(".impact-heading");
    if (strips.length !== 3 || !heading) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(strips, { x: 0, rotate: 0, opacity: 1 });
      gsap.set(inners, { rotationY: 0 });
      gsap.set(heading, { opacity: 0, y: 24 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=3000",
          scrub: 1.1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(heading, { opacity: 1, y: 0, duration: 1 }, 0);
      tl.to(strips[0], { x: -28, duration: 1 }, 1);
      tl.to(strips[2], { x: 28, duration: 1 }, 1);
      tl.to(heading, { scale: 1.06, duration: 1 }, 2);
      tl.to(inners, { rotationY: 180, duration: 1.4, stagger: 0.12 }, 3);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set(strips, { clearProps: "all" });
      gsap.set(inners, { rotationY: 180 });
      gsap.set(heading, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={wrapRef} className="impact-section">
      <h2 className="impact-heading">How We Create Impact</h2>
      <div className="impact-stage">
        {CARDS.map((c, i) => (
          <div key={c.title} className="istrip">
            <div className="istrip-inner">
              <div
                className="istrip-front"
                style={{
                  backgroundImage: `url(${IMG_URL})`,
                  backgroundPosition: `${(100 / 2) * i}% center`,
                }}
              />
              <div className="istrip-back" style={{ background: c.bg }}>
                <div className="istrip-icon"><Icon kind={c.icon} /></div>
                <div className="istrip-body-wrap">
                  <h3 className="istrip-title">{c.title}</h3>
                  <p className="istrip-body">{c.body}</p>
                  <a className="istrip-link" href="#">Read More ↗</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
