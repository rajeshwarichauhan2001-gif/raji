"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { DEFAULT_CONTENT, FaqContent } from "@/lib/content";

export default function FAQSection({ data = DEFAULT_CONTENT.faq }: { data?: FaqContent }) {
  const [open, setOpen] = useState<number | null>(0);
  const FAQS = data.items;

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <p className="eyebrow faq-eyebrow">{data.eyebrow}</p>
        <h2 className="faq-title">{data.title}</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item${isOpen ? " is-open" : ""}`}>
                <button
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-q-icon" aria-hidden>
                    <Plus />
                  </span>
                </button>
                <div className="faq-a-wrap">
                  <p className="faq-a">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
