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
    title: "Social Media Strategy & Management",
    body: "Complete end-to-end management of your social media accounts across all major platforms. I develop comprehensive content calendars, strategically schedule posts, manage daily operations, and ensure your brand voice remains consistent. From Instagram and Facebook to LinkedIn and YouTube, I handle every aspect with expertise, keeping your audience engaged and your brand top-of-mind.",
    img: "photo-1432888622747-4eb9a8efeb07",
  },
  {
    no: "02",
    label: "service two",
    title: "Content Creation & Curation",
    body: "Designing visually compelling posts, crafting engaging stories, and creating scroll-stopping content that captures attention. I blend creativity with strategy to produce visuals and copy that resonate deeply with your target audience. Whether showcasing products, sharing behind-the-scenes moments, or running promotional campaigns, every post is purposefully crafted to drive engagement and reflect your brand identity.",
    img: "photo-1542744173-8e7e53415bb0",
  },
  {
    no: "03",
    label: "service three",
    title: "Community Management & Engagement",
    body: "Building meaningful relationships one interaction at a time. I actively monitor your social channels, respond to comments and messages promptly, and engage authentically with your audience. By fostering genuine conversations and addressing concerns professionally, I transform casual followers into loyal brand advocates who champion your business organically.",
    img: "photo-1556761175-b413da4baf72",
  },
  {
    no: "04",
    label: "service four",
    title: "Influencer Collaboration Management",
    body: "Strategic planning and seamless execution of influencer partnerships that amplify your reach. From identifying the right creators who align with your brand values to coordinating campaigns, managing deliverables, and measuring impact, I handle the entire collaboration process to drive authentic engagement.",
    img: "photo-1612872087720-bb876e2e67d1",
  },
  {
    no: "05",
    label: "service five",
    title: "Analytics & Performance Tracking",
    body: "Data-driven insights that tell your success story. I track key performance metrics, analyze engagement patterns, identify growth opportunities, and provide clear, actionable reports. These insights translate complex numbers into strategic recommendations, guiding decision-making and ensuring continuous improvement.",
    img: "photo-1460925895917-afdab827c52f",
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
        <h2>Where Strategy Meets Social Media Success</h2>
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
              <span className="pcard-arrow">learn more →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
