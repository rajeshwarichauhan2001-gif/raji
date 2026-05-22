"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { unsplashUrl } from "@/lib/unsplash";

type Card = {
  no: string;
  label: string;
  title: string;
  body: string;
  img: string;
};

const CARDS: Card[] = [
  {
    no: "01",
    label: "service one",
    title: "Client Servicing",
    body: "Account ownership, brief writing, weekly check-ins and the kind of calm communication that keeps a brand moving forward without chaos.",
    img: "photo-1573497019940-1c28c88b4f3e",
  },
  {
    no: "02",
    label: "service two",
    title: "Social Media",
    body: "Roadmaps, content calendars, posting cadence and the daily reality of running an Instagram, LinkedIn or YouTube presence that actually grows.",
    img: "photo-1611605698335-8b1569810432",
  },
  {
    no: "03",
    label: "service three",
    title: "Content Writing",
    body: "Captions, scripts, blog posts and brand-voice copy — written in your tone, edited for clarity, and structured so people read to the end.",
    img: "photo-1455390582262-044cdead277a",
  },
];

export default function ServicesParallax() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".pcard"));
    if (cards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      const baseY = i * 12;
      const scale = 1 - i * 0.04;
      gsap.set(card, {
        y: baseY,
        scale,
        zIndex: cards.length - i,
        opacity: 1,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: `+=${cards.length * 90}%`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "power2.inOut" },
    });
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      tl.to(
        card,
        {
          yPercent: -120,
          opacity: 0,
          duration: 1,
        },
        i
      );
      cards.forEach((other, j) => {
        if (j > i && j <= cards.length - 1) {
          tl.to(
            other,
            {
              y: (j - i - 1) * 12,
              scale: 1 - (j - i - 1) * 0.04,
              duration: 1,
            },
            i
          );
        }
      });
    });

    cards.forEach((card) => {
      const img = card.querySelector<HTMLElement>(".pcard-img");
      if (!img) return;
      const t = gsap.fromTo(
        img,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      triggers.forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="services-parallax">
      <div className="services-parallax-head">
        <p className="eyebrow">what i do</p>
        <h2>Services</h2>
      </div>
      <div className="services-parallax-stack">
        {CARDS.map((c) => (
          <article key={c.no} className="pcard">
            <div className="pcard-img-wrap">
              <div className="pcard-img">
                <Image
                  src={unsplashUrl(c.img, 1800)}
                  alt={c.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 96vw"
                  priority={c.no === "01"}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="pcard-overlay" />
            </div>
            <div className="pcard-text">
              <span className="pcard-no">{c.no}</span>
              <span className="pcard-label">{c.label}</span>
              <h3 className="pcard-title">{c.title}</h3>
              <p className="pcard-body">{c.body}</p>
              <span className="pcard-arrow">explore →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
