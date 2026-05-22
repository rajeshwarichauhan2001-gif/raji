"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { unsplashUrl } from "@/lib/unsplash";

type SideToken = { text: string; em?: boolean };

type Slide = {
  category: string;
  filter: string;
  stat: string;
  statSuffix?: string;
  title: string;
  body: string;
  side: SideToken[];
  images: [string, string];
};

const SLIDES: Slide[] = [
  {
    category: "Stories",
    filter: "Weekly",
    stat: "48",
    statSuffix: "%",
    title: "audiences engage with steady weekly stories",
    body: "Consistent narrative beats clever one-offs. Show up every week, same voice, same hour, same care.",
    side: [
      { text: "Find" },
      { text: "your" },
      { text: "steady", em: true },
      { text: "audience" },
      { text: "here", em: true },
    ],
    images: ["photo-1611162617213-7d7a39e9b1d7", "photo-1611605698335-8b1569810432"],
  },
  {
    category: "Recall",
    filter: "Brand",
    stat: "62",
    statSuffix: "%",
    title: "brand recall comes from consistent posting",
    body: "Pick the cadence you can sustain for a year. Tone, palette, photo grid — repeat it until it sticks.",
    side: [
      { text: "Build" },
      { text: "the" },
      { text: "recall", em: true },
      { text: "you" },
      { text: "want", em: true },
    ],
    images: ["photo-1573497019940-1c28c88b4f3e", "photo-1517842645767-c639042777db"],
  },
  {
    category: "Growth",
    filter: "Aligned",
    stat: "3",
    statSuffix: "×",
    title: "growth on brand-aligned content over trending",
    body: "Trending sounds urgent and feels light. Aligned sounds quiet and compounds slowly into authority.",
    side: [
      { text: "Slow" },
      { text: "growth", em: true },
      { text: "that" },
      { text: "holds", em: true },
    ],
    images: ["photo-1551836022-d5d88e9218df", "photo-1460925895917-afdab827c52f"],
  },
  {
    category: "Launches",
    filter: "Monthly",
    stat: "10",
    statSuffix: "+",
    title: "high-ticket sales per launch month",
    body: "Calm landing pages, soft email sequences, no count-down anxiety. Premium clients prefer premium pacing.",
    side: [
      { text: "Sales" },
      { text: "without" },
      { text: "the", em: true },
      { text: "chase", em: true },
    ],
    images: ["photo-1455390582262-044cdead277a", "photo-1542038784456-1ea8e935640e"],
  },
  {
    category: "Velocity",
    filter: "Week 1",
    stat: "7",
    statSuffix: "d",
    title: "first review delivered by week one",
    body: "We start with the calm part: brief, voice notes, calendar. By day seven you already have something you can post.",
    side: [
      { text: "Calm" },
      { text: "pace", em: true },
      { text: "real" },
      { text: "velocity", em: true },
    ],
    images: ["photo-1611224885990-ab7363d7f2a9", "photo-1499636136210-6f4ee915583e"],
  },
];

const SLIDE_MS = 5500;

export default function MotionSlideCards() {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sideRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const side = sideRef.current;
    if (!card || !side) return;

    const ctx = gsap.context(() => {
      const sideWords = side.querySelectorAll<HTMLElement>(".msc-word");
      gsap.from(sideWords, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power4.out",
      });

      const statEl = card.querySelector<HTMLElement>(".msc-stat-number");
      const slide = SLIDES[active];
      if (statEl && slide) {
        const target = parseFloat(slide.stat);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.3,
          ease: "power2.out",
          onUpdate: () => {
            const isDecimal = !Number.isInteger(target);
            statEl.textContent = isDecimal ? obj.v.toFixed(1) : Math.round(obj.v).toString();
          },
        });
      }

      gsap.from(card.querySelectorAll(".msc-fade"), {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.15,
        ease: "power3.out",
      });

      gsap.from(card.querySelectorAll(".msc-pill"), {
        scale: 0.6,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.45,
        ease: "back.out(1.6)",
      });

      const bar = card.querySelector<HTMLElement>(".msc-progress-bar");
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          { scaleX: 1, duration: SLIDE_MS / 1000, ease: "none" }
        );
      }
    }, wrapRef);

    timerRef.current = setTimeout(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, SLIDE_MS);

    return () => {
      ctx.revert();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active]);

  const go = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActive(i);
  };

  const slide = SLIDES[active];

  return (
    <section ref={wrapRef} className="msc-section">
      <div className="msc-shell">
        <div ref={sideRef} className="msc-side" key={`side-${active}`}>
          <p className="msc-side-text">
            {slide.side.map((tok, i) => (
              <span key={i} className="msc-word-wrap">
                <span className={`msc-word${tok.em ? " is-em" : ""}`}>{tok.text}</span>{" "}
              </span>
            ))}
          </p>
        </div>

        <div ref={cardRef} className="msc-card" key={`card-${active}`}>
          <div className="msc-card-head msc-fade">
            <span className="msc-chip msc-chip-info">
              <span className="msc-chip-dot" /> {slide.category}
            </span>
            <span className="msc-chip msc-chip-filter">
              {slide.filter} <span className="msc-chip-caret">▾</span>
            </span>
            <button className="msc-chip-icon" aria-label="open">
              <span aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="msc-stat msc-fade">
            <span className="msc-stat-number">0</span>
            <span className="msc-stat-suffix">{slide.statSuffix ?? ""}</span>
            <span className="msc-stat-arrow" aria-hidden="true">↗</span>
          </div>

          <h3 className="msc-card-title msc-fade">{slide.title}</h3>
          <p className="msc-card-body msc-fade">{slide.body}</p>

          <div className="msc-gallery">
            {slide.images.map((id, i) => (
              <div key={`${active}-${i}`} className="msc-pill">
                <Image
                  src={unsplashUrl(id, 400)}
                  alt={`${slide.category} ${i + 1}`}
                  fill
                  sizes="120px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          <div className="msc-dots" role="tablist" aria-label="Slide navigation">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Slide ${i + 1}`}
                className={`msc-dot${i === active ? " is-active" : ""}`}
                onClick={() => go(i)}
              >
                {i === active && <span className="msc-progress-bar" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
