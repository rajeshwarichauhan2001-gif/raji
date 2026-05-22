"use client";

const STATS = [
  { num: "50+", label: "Completed Projects" },
  { num: "40+", label: "Happy Clients" },
  { num: "3+", label: "Years Experience" },
  { num: "4.5/5", label: "Client Ratings" },
];

export default function StatsSectionV2() {
  return (
    <section className="statsv2-section">
      <div className="statsv2-inner">
        <h2 className="statsv2-title">
          Enhance Your Digital Impact with My Expertise
        </h2>
        <div className="statsv2-grid">
          {STATS.map((s) => (
            <div key={s.label} className="statsv2-cell">
              <span className="statsv2-num">{s.num}</span>
              <span className="statsv2-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
