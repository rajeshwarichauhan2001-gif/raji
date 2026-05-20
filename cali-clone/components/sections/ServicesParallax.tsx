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
    const tweens: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      const img = card.querySelector<HTMLElement>(".pcard-img");
      const text = card.querySelector<HTMLElement>(".pcard-text");
      if (!img || !text) return;

      const st = gsap.fromTo(
        img,
        { yPercent: -18 },
        {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
      if (st.scrollTrigger) tweens.push(st.scrollTrigger);

      if (i < cards.length - 1) {
        const next = cards[i + 1];
        const stack = gsap.to(card, {
          scale: 0.92,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
        if (stack.scrollTrigger) tweens.push(stack.scrollTrigger);
      }

      const reveal = ScrollTrigger.create({
        trigger: card,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.from(text.children, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          });
        },
      });
      tweens.push(reveal);
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      tweens.forEach((t) => t.kill());
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
