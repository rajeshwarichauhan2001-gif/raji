"use client";
import Image from "next/image";
import { unsplashUrl } from "@/lib/unsplash";

const STEPS = [
  {
    no: "01",
    title: "Get a Free Consultation",
    body: "Strategic planning session to understand your brand goals, target audience, and marketing objectives — completely complimentary.",
    img: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    no: "02",
    title: "Instant Chat Support",
    body: "Real-time communication to discuss campaign strategies, content requirements, and answer all your social media queries promptly.",
    img: "photo-1611605698335-8b1569810432",
  },
  {
    no: "03",
    title: "Wireframe & Development",
    body: "Develop customized content calendars and campaign blueprints that align perfectly with your brand identity and business goals.",
    img: "photo-1517842645767-c639042777db",
  },
  {
    no: "04",
    title: "Prototype & Testing",
    body: "Preview and approve all content before publishing, ensuring every post reflects your brand voice and messaging perfectly.",
    img: "photo-1611162617213-7d7a39e9b1d7",
  },
];

export default function ProcessSection() {
  return (
    <section className="process-section">
      <div className="process-inner">
        <p className="eyebrow process-eyebrow">how we work</p>
        <h2 className="process-title">
          Achieve Incredible Results in Just 4 Easy Steps!
        </h2>
        <div className="process-grid">
          {STEPS.map((s) => (
            <div key={s.no} className="process-step">
              <div className="process-step-head">
                <div className="process-step-img">
                  <Image
                    src={unsplashUrl(s.img, 240)}
                    alt=""
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="process-step-no">{s.no}</span>
              </div>
              <h3 className="process-step-title">{s.title}</h3>
              <p className="process-step-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
