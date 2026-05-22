"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { unsplashUrl } from "@/lib/unsplash";

type Slide = { title: string; tag: string; img: string };

const SLIDES: Slide[] = [
  { title: "Brand strategy", tag: "01 · positioning", img: "photo-1450101499163-c8848c66ca85" },
  { title: "Content production", tag: "02 · creative", img: "photo-1556761175-5973dc0f32e7" },
  { title: "Social storytelling", tag: "03 · narrative", img: "photo-1542038784456-1ea8e935640e" },
  { title: "Community building", tag: "04 · audience", img: "photo-1521737604893-d14cc237f11d" },
  { title: "Reels & video", tag: "05 · motion", img: "photo-1611162617213-7d7a39e9b1d7" },
  { title: "Performance reports", tag: "06 · analytics", img: "photo-1551836022-d5d88e9218df" },
  { title: "Launch playbooks", tag: "07 · go-live", img: "photo-1499636136210-6f4ee915583e" },
];

const WIDTHS_DESKTOP = [54, 18, 5, 0];
const WIDTHS_TABLET = [62, 16, 4, 0];
const WIDTHS_MOBILE = [82, 16, 0, 0];

function pickWidths() {
  if (typeof window === "undefined") return WIDTHS_DESKTOP;
  const w = window.innerWidth;
  if (w <= 767) return WIDTHS_MOBILE;
  if (w <= 1199) return WIDTHS_TABLET;
  return WIDTHS_DESKTOP;
}

export default function FilmstripSlider() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const widthsRef = useRef<number[]>(WIDTHS_DESKTOP);

  const layout = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const widths = widthsRef.current;
    const total = SLIDES.length;
    const cards = Array.from(track.querySelectorAll<HTMLElement>(".fs-card"));
    cards.forEach((card, i) => {
      let offset = ((i - idx) % total + total) % total;
      if (offset > total / 2) offset -= total;
      const abs = Math.abs(offset);
      const w = widths[abs] ?? 0;
      const visible = abs <= 2 && w > 0;
      card.style.order = String(offset + 100);
      gsap.to(card, {
        width: `${w}%`,
        opacity: visible ? 1 : 0,
        duration: 0.85,
        ease: "power3.inOut",
      });
      card.classList.toggle("is-active", offset === 0);
      card.classList.toggle("is-preview", abs === 1);
      card.classList.toggle("is-sliver", abs === 2);
    });
  };

  useEffect(() => {
    widthsRef.current = pickWidths();
    layout(active);
    const onResize = () => {
      widthsRef.current = pickWidths();
      layout(active);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const next = () => setActive((a) => (a + 1) % SLIDES.length);
  const prev = () => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="fs-section">
      <div className="fs-header">
        <p className="eyebrow">showcase</p>
        <h2 className="fs-heading">Stories we shape</h2>
      </div>

      <div ref={trackRef} className="fs-track" aria-roledescription="carousel">
        {SLIDES.map((s, i) => (
          <article key={s.title} className="fs-card" aria-hidden={false}>
            <div className="fs-card-img">
              <Image
                src={unsplashUrl(s.img, 1400)}
                alt={s.title}
                fill
                sizes="(max-width: 767px) 82vw, (max-width: 1199px) 62vw, 54vw"
                priority={i < 3}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="fs-card-overlay" />
            <div className="fs-card-caption">
              <span className="fs-card-tag">{s.tag}</span>
              <h3 className="fs-card-title">{s.title}</h3>
            </div>
          </article>
        ))}
      </div>

      <div className="fs-controls">
        <button
          type="button"
          className="fs-btn"
          aria-label="previous slide"
          onClick={prev}
        >
          <span aria-hidden="true">←</span>
        </button>
        <span className="fs-counter">
          <span className="fs-counter-now">{String(active + 1).padStart(2, "0")}</span>
          <span className="fs-counter-sep">/</span>
          <span className="fs-counter-total">{String(SLIDES.length).padStart(2, "0")}</span>
        </span>
        <button
          type="button"
          className="fs-btn"
          aria-label="next slide"
          onClick={next}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
