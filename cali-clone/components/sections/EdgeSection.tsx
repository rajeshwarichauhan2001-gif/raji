"use client";
import Image from "next/image";
import { unsplashUrl } from "@/lib/unsplash";

const PILLARS = [
  {
    title: "Strategic Content Planning & Calendar Management",
    body: "Purposeful calendars that align every post with brand goals, audience rhythms, and platform behaviour.",
    img: "photo-1611224885990-ab7363d7f2a9",
  },
  {
    title: "Social Media Advertising & Performance Tracking",
    body: "Paid campaigns engineered for reach, retention, and return — measured against the metrics that matter.",
    img: "photo-1551836022-d5d88e9218df",
  },
  {
    title: "Audience Growth & Engagement Strategy",
    body: "Steady, authentic community building that turns followers into champions of your brand.",
    img: "photo-1521737604893-d14cc237f11d",
  },
  {
    title: "Brand Storytelling Through Visuals & Copy",
    body: "Story-led visuals and copy crafted to sound like you and convert like clockwork.",
    img: "photo-1455390582262-044cdead277a",
  },
];

const SUB_CARDS = [
  {
    title: "Strategic Clarity in Execution",
    body: "True excellence begins with clear planning and thoughtful execution.",
    img: "photo-1517842645767-c639042777db",
  },
  {
    title: "Dedication Beyond the Clock",
    body: "Social media success demands commitment that extends beyond traditional hours.",
    img: "photo-1499636136210-6f4ee915583e",
  },
];

export default function EdgeSection() {
  return (
    <section className="edge-section">
      <div className="edge-inner">
        <p className="eyebrow edge-eyebrow">my edge</p>
        <h2 className="edge-title">
          Social Media Stories That Connect | Ads That Convert | Designs That Engage
        </h2>

        <div className="edge-grid">
          {PILLARS.map((p) => (
            <div key={p.title} className="edge-pillar">
              <div className="edge-pillar-img">
                <Image
                  src={unsplashUrl(p.img, 240)}
                  alt=""
                  fill
                  sizes="56px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <h3 className="edge-pillar-title">{p.title}</h3>
              <p className="edge-pillar-body">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="edge-sub-grid">
          {SUB_CARDS.map((c) => (
            <div key={c.title} className="edge-sub-card">
              <div className="edge-sub-img">
                <Image
                  src={unsplashUrl(c.img, 800)}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 320px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="edge-sub-text">
                <h4 className="edge-sub-title">{c.title}</h4>
                <p className="edge-sub-body">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
