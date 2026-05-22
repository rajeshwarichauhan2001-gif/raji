"use client";
import Image from "next/image";
import { unsplashUrl } from "@/lib/unsplash";

const BENEFITS = [
  {
    title: "Clear and Prompt Communication",
    body: "We ensure clear, prompt, and honest communication, keeping you informed every step of the way.",
    img: "photo-1551836022-d5d88e9218df",
  },
  {
    title: "Accelerate Growth",
    body: "Accelerate growth with enhanced email and social media marketing.",
    img: "photo-1460925895917-afdab827c52f",
  },
  {
    title: "Responsive and Scalable Solutions",
    body: "Our solutions adapt seamlessly to your needs, ensuring flexibility, efficiency, and long-term growth.",
    img: "photo-1542038784456-1ea8e935640e",
  },
  {
    title: "Premium Support",
    body: "Explore our comprehensive help desk services, ensuring seamless IT support and swift resolution to keep your operations running smoothly.",
    img: "photo-1521737604893-d14cc237f11d",
  },
];

export default function BenefitsSection() {
  return (
    <section className="benefits-section">
      <div className="benefits-inner">
        <p className="eyebrow benefits-eyebrow">why partner with me</p>
        <h2 className="benefits-title">
          Exploring Digital Frontiers with Me: Your Reliable Partner.
        </h2>
        <div className="benefits-grid">
          {BENEFITS.map((b) => (
            <div key={b.title} className="benefits-card">
              <div className="benefits-card-img">
                <Image
                  src={unsplashUrl(b.img, 600)}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="benefits-card-text">
                <h3 className="benefits-card-title">{b.title}</h3>
                <p className="benefits-card-body">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="benefits-rating">
          <span className="benefits-rating-num">4.5+</span>
          <span className="benefits-rating-label">Client Ratings</span>
        </div>
      </div>
    </section>
  );
}
