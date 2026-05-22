"use client";

const PILLARS = [
  {
    title: "Strategic Content Planning & Calendar Management",
    body: "Purposeful calendars that align every post with brand goals, audience rhythms, and platform behaviour.",
  },
  {
    title: "Social Media Advertising & Performance Tracking",
    body: "Paid campaigns engineered for reach, retention, and return — measured against the metrics that matter.",
  },
  {
    title: "Audience Growth & Engagement Strategy",
    body: "Steady, authentic community building that turns followers into champions of your brand.",
  },
  {
    title: "Brand Storytelling Through Visuals & Copy",
    body: "Story-led visuals and copy crafted to sound like you and convert like clockwork.",
  },
];

export default function EdgeSection() {
  return (
    <section className="edge-section">
      <div className="edge-inner">
        <p className="eyebrow edge-eyebrow">my edge</p>
        <h2 className="edge-title">
          Social Media Stories That Connect | Ads That Convert | Designs That Engage
        </h2>

        <div className="edge-grid">
          {PILLARS.map((p) => (
            <div key={p.title} className="edge-pillar">
              <h3 className="edge-pillar-title">{p.title}</h3>
              <p className="edge-pillar-body">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="edge-sub-grid">
          <div className="edge-sub-card">
            <h4 className="edge-sub-title">Strategic Clarity in Execution</h4>
            <p className="edge-sub-body">
              True excellence begins with clear planning and thoughtful execution.
            </p>
          </div>
          <div className="edge-sub-card">
            <h4 className="edge-sub-title">Dedication Beyond the Clock</h4>
            <p className="edge-sub-body">
              Social media success demands commitment that extends beyond traditional hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
