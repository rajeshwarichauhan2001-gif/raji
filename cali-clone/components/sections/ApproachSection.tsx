"use client";
import Image from "next/image";
import { DEFAULT_CONTENT, ApproachContent } from "@/lib/content";

export default function ApproachSection({ data = DEFAULT_CONTENT.approach }: { data?: ApproachContent }) {
  return (
    <section className="approach-section">
      <div className="approach-inner approach-grid">
        <div className="approach-text">
          <p className="eyebrow approach-eyebrow">{data.eyebrow}</p>
          <h2 className="approach-title">{data.title}</h2>
          <p className="approach-body">{data.body}</p>
          <div className="approach-stats">
            {data.stats.map((s, i) => (
              <div key={i} className="approach-stat">
                <span className="approach-stat-num">{s.num}</span>
                <span className="approach-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="approach-media">
          <div className="approach-img-wrap">
            <Image
              src={data.image}
              alt="Rajeshwari Chauhan portrait"
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 480px"
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
              priority
              unoptimized={data.image.startsWith("/api/media/")}
            />
            <span className="approach-img-dot" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
