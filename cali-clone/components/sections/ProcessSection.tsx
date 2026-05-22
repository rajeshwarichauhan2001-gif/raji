"use client";

const STEPS = [
  {
    no: "01",
    title: "Get a Free Consultation",
    body: "Strategic planning session to understand your brand goals, target audience, and marketing objectives — completely complimentary.",
  },
  {
    no: "02",
    title: "Instant Chat Support",
    body: "Real-time communication to discuss campaign strategies, content requirements, and answer all your social media queries promptly.",
  },
  {
    no: "03",
    title: "Wireframe & Development",
    body: "Develop customized content calendars and campaign blueprints that align perfectly with your brand identity and business goals.",
  },
  {
    no: "04",
    title: "Prototype & Testing",
    body: "Preview and approve all content before publishing, ensuring every post reflects your brand voice and messaging perfectly.",
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
              <span className="process-step-no">{s.no}</span>
              <h3 className="process-step-title">{s.title}</h3>
              <p className="process-step-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
