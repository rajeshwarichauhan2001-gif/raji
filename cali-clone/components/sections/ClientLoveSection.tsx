"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { unsplashUrl } from "@/lib/unsplash";
import { DEFAULT_CONTENT, TestimonialsContent } from "@/lib/content";

// avatar can be an Unsplash photo id (legacy) OR a full URL / uploaded /api/media path
function avatarSrc(avatar: string): string {
  if (avatar.startsWith("/") || avatar.startsWith("http")) return avatar;
  return unsplashUrl(avatar, 200);
}

export default function ClientLoveSection({
  data = DEFAULT_CONTENT.testimonials,
}: {
  data?: TestimonialsContent;
}) {
  const TESTIMONIALS = data.items;
  const [idx, setIdx] = useState(0);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((p) => (p + 1) % total);
    }, 6000);
    return () => clearInterval(t);
  }, [total]);

  const go = (n: number) => setIdx(((n % total) + total) % total);

  return (
    <section className="testi-section">
      <div className="testi-inner">
        <p className="eyebrow testi-eyebrow">{data.eyebrow}</p>
        <h2 className="testi-title">{data.title}</h2>

        <div className="testi-stage">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name + i}
              className={`testi-card${i === idx ? " is-active" : ""}`}
              aria-hidden={i !== idx}
            >
              <div className="testi-avatar">
                <Image
                  src={avatarSrc(t.avatar)}
                  alt={t.name}
                  fill
                  sizes="64px"
                  style={{ objectFit: "cover" }}
                  unoptimized={t.avatar.startsWith("/api/media/")}
                />
              </div>
              <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testi-meta">
                <p className="testi-name">{t.name}</p>
                <p className="testi-role">{t.role}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="testi-controls">
          <button
            className="testi-arrow"
            onClick={() => go(idx - 1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft />
          </button>
          <div className="testi-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`testi-dot${i === idx ? " is-active" : ""}`}
                onClick={() => go(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="testi-arrow"
            onClick={() => go(idx + 1)}
            aria-label="Next testimonial"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
