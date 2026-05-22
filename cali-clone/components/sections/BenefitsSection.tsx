"use client";

const BENEFITS = [
  {
    title: "Clear and Prompt Communication",
    body: "We ensure clear, prompt, and honest communication, keeping you informed every step of the way.",
  },
  {
    title: "Accelerate Growth",
    body: "Accelerate growth with enhanced email and social media marketing.",
  },
  {
    title: "Responsive and Scalable Solutions",
    body: "Our solutions adapt seamlessly to your needs, ensuring flexibility, efficiency, and long-term growth.",
  },
  {
    title: "Premium Support",
    body: "Explore our comprehensive help desk services, ensuring seamless IT support and swift resolution to keep your operations running smoothly.",
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
              <h3 className="benefits-card-title">{b.title}</h3>
              <p className="benefits-card-body">{b.body}</p>
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
