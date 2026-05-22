"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "What social media services do you offer?",
    a: "I provide comprehensive social media management including strategic planning, content creation and curation, community engagement, influencer collaboration coordination, analytics tracking, and detailed monthly reporting. I manage accounts across Instagram, Facebook, LinkedIn, YouTube, Twitter, and other platforms based on your specific business needs and target audience preferences.",
  },
  {
    q: "How can social media management help my business?",
    a: "Strategic social media management increases brand awareness, builds authentic customer relationships, drives website traffic, generates quality leads, and ultimately boosts sales. Through consistent posting, genuine community engagement, and data-driven optimization, I help businesses achieve measurable growth in their online presence, audience reach, customer loyalty, and conversion rates.",
  },
  {
    q: "Is there a free consultation available?",
    a: "Yes! I offer a complimentary 30-minute discovery call where we'll discuss your current social media situation, business goals, target audience, industry challenges, and how my services can specifically help you achieve the results you're looking for. This is a no-pressure, no-obligation conversation designed to provide genuine value.",
  },
  {
    q: "Can services be customized for my business?",
    a: "Absolutely, every business has unique needs, audiences, goals, and challenges. I tailor my approach based on your specific industry, budget, timeline, and objectives. Whether you need comprehensive account management or support with specific aspects like content creation, community management, or analytics, I'll customize a service package that works perfectly for you.",
  },
  {
    q: "How do you ensure quality in social media campaigns?",
    a: "Quality stems from thorough preparation and consistent execution. I create detailed content calendars, review all content before scheduling, track performance metrics continuously, and optimize based on real data. I stay updated on platform algorithm changes, emerging trends, and industry best practices to ensure your content remains relevant, engaging, and effective at achieving your objectives.",
  },
  {
    q: "What industries have you worked with?",
    a: "I've successfully managed social media for food & beverage brands, digital marketing agencies, cultural organizations, international film festivals, and B2B service providers. My mass media communication background combined with ongoing MBA studies in Digital Marketing gives me the versatility to adapt effectively to various industries while maintaining strategic focus on measurable results.",
  },
  {
    q: "How long before I see results from social media efforts?",
    a: "Initial engagement improvements often become visible within 2-3 weeks of consistent, strategic posting. Significant follower growth and meaningful business impact typically manifest within 2-3 months as we build community, refine strategy, and optimize based on performance data. Social media success is a marathon, not a sprint; sustainable growth requires patience and persistence.",
  },
  {
    q: "Do you provide ongoing support after initial setup?",
    a: "Yes! Social media requires continuous attention and adaptation. I provide ongoing account management, daily monitoring, regular performance reporting, and strategic adjustments. I'm readily available for questions, handle time-sensitive situations promptly, and ensure your social media presence runs smoothly throughout our entire partnership. You're never left wondering what's happening with your accounts.",
  },
  {
    q: "How do I get started working with you?",
    a: "Simple! Use the contact form below or email me directly. We'll schedule a free discovery call to discuss your goals, challenges, and opportunities. If we're a good fit, I'll create a customized proposal outlining strategy, timeline, deliverables, and investment. Once you're comfortable, we'll get your social media growing immediately!",
  },
  {
    q: "What makes your approach different from others?",
    a: "I combine academic knowledge from my MBA with real-world agency experience and genuine passion for social media storytelling. You get strategic thinking, creative execution, transparent communication, and sincere dedication to your success. I don't just manage accounts. I build brands, foster communities, and grow businesses through authentic social media presence.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq-section">
      <div className="faq-inner">
        <p className="eyebrow faq-eyebrow">faqs</p>
        <h2 className="faq-title">
          Still have Qs? Find answers to common questions about our products,
          hosting, domains, and support.
        </h2>
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
