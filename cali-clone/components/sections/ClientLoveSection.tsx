"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Marketing Head, Rapoo",
    quote:
      "Their understanding of Indian festivals and cultural moments is exceptional. Every Diwali, Holi, and Navratri campaign feels authentic and resonates with our customers beautifully. They've helped us build a genuine connection with our audience through thoughtful content. Working with them has been an absolute pleasure!",
  },
  {
    name: "Pratik Jain",
    role: "Founder, Pratik",
    quote:
      "What impressed me most is their quick response time and understanding of our needs. They never miss deadlines and always keep us informed about campaign progress. Their content strikes the perfect balance between informative and engaging. Parents trust our brand more now, thanks to their professional approach!",
  },
  {
    name: "Sneha Desai",
    role: "Marketing Head, NBG",
    quote:
      "They brought fresh creative ideas to our wellness brand. From beautiful photography to calming reels, everything they create aligns perfectly with our brand identity. Their ability to create content in regional languages helped us connect with local communities. Patient, professional, and genuinely passionate about our success!",
  },
  {
    name: "Vikram Singh Rathore",
    role: "Social Media Head",
    quote:
      "They understood our vision of showcasing traditional craftsmanship to modern audiences. Their storytelling approach made our artisan stories come alive on social media. International clients often mention discovering us through Instagram. They've given our heritage brand a contemporary voice without losing its soul. Truly grateful!",
  },
  {
    name: "Amish Doshi",
    role: "COO, Furnishing Home",
    quote:
      "Our social media presence has improved significantly since working with this social media manager. From content planning to consistent posting and engagement, everything is handled professionally. The strategies are well thought out and results-driven.",
  },
  {
    name: "Aayush Agarwal",
    role: "COO, Intellve",
    quote:
      "Highly creative and reliable. The social media manager understands our brand voice perfectly and creates content that actually connects with the audience. We've seen better engagement, reach, and overall brand visibility.",
  },
  {
    name: "Hiralkumar Patel",
    role: "COO, Kunuts",
    quote:
      "A very dedicated and proactive social media manager. From reels to captions and analytics, everything is managed smoothly. Timely communication and a clear understanding of trends make working together effortless.",
  },
];

export default function ClientLoveSection() {
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
        <p className="eyebrow testi-eyebrow">client love</p>
        <h2 className="testi-title">Client Feedback &amp; Reviews</h2>

        <div className="testi-stage">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              className={`testi-card${i === idx ? " is-active" : ""}`}
              aria-hidden={i !== idx}
            >
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
