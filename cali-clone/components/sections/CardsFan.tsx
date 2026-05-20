"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { unsplashUrl } from "@/lib/unsplash";

type FanCard = {
  no: string;
  label: string;
  title: string;
  img: string;
};

const CARDS: FanCard[] = [
  { no: "01", label: "service one",   title: "Client Servicing", img: "photo-1573497019940-1c28c88b4f3e" },
  { no: "02", label: "service two",   title: "Social Media",     img: "photo-1611605698335-8b1569810432" },
  { no: "03", label: "service three", title: "Content Writing",  img: "photo-1455390582262-044cdead277a" },
  { no: "04", label: "service four",  title: "Brand Strategy",   img: "photo-1517842645767-c639042777db" },
  { no: "05", label: "service five",  title: "Analytics",        img: "photo-1460925895917-afdab827c52f" },
];

export default function CardsFan() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const cards = Array.from(wrap.querySelectorAll<HTMLElement>(".fcard"));
    if (!cards.length) return;

    const stackRotations = [-8, -4, 0, 4, 8];
    const n = cards.length;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = wrap.querySelector<HTMLDivElement>(".fan-track");
      if (!track) return;

      const layout = () => {
        const trackW = track.clientWidth;
        const cardW = cards[0].offsetWidth;
        const gap = 16;
        const totalRow = cardW * n + gap * (n - 1);
        const rowStartX = (trackW - totalRow) / 2;
        const fanTargets: number[] = [];
        const rowTargets: number[] = [];
        cards.forEach((_, i) => {
          const stackCenter = (trackW - cardW) / 2;
          const stackOffset = (i - (n - 1) / 2) * 18;
          fanTargets.push(stackCenter + stackOffset);
          rowTargets.push(rowStartX + i * (cardW + gap));
        });
        return { fanTargets, rowTargets };
      };

      const { fanTargets, rowTargets } = layout();
      cards.forEach((card, i) => {
        gsap.set(card, {
          x: fanTargets[i],
          y: (i - (n - 1) / 2) * 4,
          rotation: stackRotations[i] ?? 0,
          zIndex: i,
        });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=2000",
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      cards.forEach((card, i) => {
        tl.to(card, { x: rowTargets[i], y: 0, rotation: 0 }, 0);
      });

      const onResize = () => {
        const { fanTargets: f2 } = layout();
        cards.forEach((card, i) => gsap.set(card, { x: f2[i] }));
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", onResize);
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        window.removeEventListener("resize", onResize);
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    mm.add("(max-width: 767px)", () => {
      cards.forEach((card) => {
        gsap.set(card, { clearProps: "all" });
      });
      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.from(card, { y: 40, opacity: 0, duration: 0.6, ease: "power3.out" });
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={wrapRef} className="fan-section">
      <div className="fan-head">
        <p className="eyebrow">what i do</p>
        <h2>Five things, done well.</h2>
        <p className="fan-hint">scroll to spread</p>
      </div>
      <div className="fan-track">
        {CARDS.map((c) => (
          <article key={c.no} className="fcard">
            <div className="fcard-img">
              <Image
                src={unsplashUrl(c.img, 900)}
                alt={c.title}
                fill
                sizes="(max-width: 767px) 60vw, 18vw"
                style={{ objectFit: "cover" }}
              />
              <div className="fcard-overlay" />
            </div>
            <div className="fcard-text">
              <span className="fcard-no">{c.no}</span>
              <span className="fcard-label">{c.label}</span>
              <h3 className="fcard-title">{c.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
