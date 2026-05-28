"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

/* ─── Types ─────────────────────────────────────────── */
type Tab = "content" | "social" | "servicing";

/* ─── Stats data ─────────────────────────────────────── */
const STATS = [
  { raw: 22,    suffix: "%",  decimals: 0, label: "Reach Growth" },
  { raw: 29.4,  suffix: "M",  decimals: 1, label: "Impressions" },
  { raw: 21,    suffix: "%",  decimals: 0, label: "Engagement Rate" },
  { raw: 4305,  suffix: "",   decimals: 0, label: "Total Followers" },
];

const DURATION = 1800;
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/* ─── Work-done bullets (shared) ─────────────────────── */
const WORK_DONE = [
  "Weekly reporting + action plan",
  "Execution with creatives + revisions",
  "Monthly growth strategy updates",
  "Improved turnaround + consistency",
];

/* ─── Content-calendar rows ──────────────────────────── */
const CAL_ROWS = [
  { type: "Reel",   date: "1/10/2024",  concept: "Diwali",                  copy: "Diwali ki roshni khushiyan ka pal…" },
  { type: "Static", date: "3/11/2024",  concept: "Bhai Dooj",               copy: "Bhai ko ho khushi ke paas…" },
  { type: "Reel",   date: "6/11/2024",  concept: "Rajasthani Garam Masala", copy: "Har dish ko de zeeta sting…" },
];

/* ─── Social analytics cards ─────────────────────────── */
const ANALYTICS = [
  { stat: "+22%", label: "Reach Growth",      sub: "29.4M Impressions" },
  { stat: "+21%", label: "Engagement",         sub: "2.1% Engagement Rate" },
  { stat: "+20%", label: "CTR",                sub: "214 Link Clicks" },
  { stat: "+5%",  label: "Followers",          sub: "4,305 Total" },
];

/* ─── MoM bullets ────────────────────────────────────── */
const MOM = [
  "Festive Content Roadmap Ready",
  "Recipe & Festive Posts Finalised",
  "High-Engagement Content Plan (Reels, GIFs, interactive posts)",
  "Celebrating Culture & Traditions",
  "Clear Posting Plan Set",
  "Success Metrics Defined",
];

/* ═══════════════════════════════════════════════════════ */
export default function MastMasalaPage() {
  /* Hero fade-up */
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".bp-hero-anim");
    gsap.from(targets, { y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" });
  }, []);

  /* Stats count-up */
  const statsRef = useRef<HTMLDivElement>(null);
  const [vals, setVals] = useState(STATS.map(() => 0));
  const started = useRef(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - t0) / DURATION, 1);
            const eased = easeOutExpo(progress);
            setVals(STATS.map(s => parseFloat((s.raw * eased).toFixed(s.decimals))));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Section reveal */
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".bp-reveal");
    const observers: IntersectionObserver[] = [];
    sections.forEach(sec => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            sec.classList.add("bp-revealed");
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(sec);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* Tabs */
  const [tab, setTab] = useState<Tab>("content");

  return (
    <main className="bp-page">

      {/* ── Section 1: Hero ─────────────────────────────── */}
      <section className="bp-hero">
        <div className="bp-hero-inner" ref={heroRef}>
          <p className="bp-hero-eyebrow bp-hero-anim">CLIENT ARCHIVE</p>
          <h1 className="bp-hero-title bp-hero-anim">Mast Masala</h1>
          <p className="bp-hero-tagline bp-hero-anim">Masala Ek, Swaad Anek!</p>
          <div className="bp-hero-tags bp-hero-anim">
            <span className="bp-tag">Content Writing</span>
            <span className="bp-tag">Social Media</span>
            <span className="bp-tag">Client Servicing</span>
          </div>
        </div>
        <div className="bp-hero-divider" />
      </section>

      {/* ── Section 2: Stats strip ──────────────────────── */}
      <section className="bp-stats">
        <div className="bp-stats-inner" ref={statsRef}>
          {STATS.map((s, i) => (
            <div key={s.label} className="bp-stat-cell">
              <span className="bp-stat-num">
                {vals[i].toFixed(s.decimals)}{s.suffix}
              </span>
              <span className="bp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Service Tabs ─────────────────────── */}
      <section className="bp-tabs-section bp-reveal">
        <div className="bp-tabs-inner">
          <div className="bp-tabs-nav">
            {(["content", "social", "servicing"] as Tab[]).map(t => (
              <button
                key={t}
                className={`bp-tab-btn${tab === t ? " bp-tab-btn--active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t === "content" ? "Content Writing" : t === "social" ? "Social Media" : "Client Servicing"}
              </button>
            ))}
          </div>

          <div className="bp-tab-panel-wrap">
            {/* Content Writing */}
            <div className={`bp-tab-panel${tab === "content" ? " bp-tab-panel--visible" : ""}`}>
              <WorkDone />
              <div className="bp-cal-card">
                <h3 className="bp-cal-title">Content Calendar Glimpse</h3>
                <div className="bp-cal-table-wrap">
                  <table className="bp-cal-table">
                    <thead>
                      <tr>
                        <th>Type</th><th>Date</th><th>Concept</th><th>Copy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CAL_ROWS.map(r => (
                        <tr key={r.date + r.concept}>
                          <td><span className="bp-cal-type">{r.type}</span></td>
                          <td>{r.date}</td>
                          <td>{r.concept}</td>
                          <td className="bp-cal-copy">{r.copy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className={`bp-tab-panel${tab === "social" ? " bp-tab-panel--visible" : ""}`}>
              <WorkDone />
              <div className="bp-analytics-grid">
                {ANALYTICS.map(a => (
                  <div key={a.label} className="bp-analytics-card">
                    <span className="bp-analytics-stat">{a.stat}</span>
                    <span className="bp-analytics-label">{a.label}</span>
                    <span className="bp-analytics-sub">{a.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Servicing */}
            <div className={`bp-tab-panel${tab === "servicing" ? " bp-tab-panel--visible" : ""}`}>
              <WorkDone />
              <div className="bp-mom-card">
                <h3 className="bp-mom-title">Mast Masala — Festive Content Planning</h3>
                <ul className="bp-mom-list">
                  {MOM.map((m, i) => (
                    <li key={i} className="bp-mom-item">
                      <span className="bp-mom-num">{String(i + 1).padStart(2, "0")}</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Gallery ──────────────────────────── */}
      <section className="bp-gallery-section bp-reveal">
        <div className="bp-gallery-inner">
          <h2 className="bp-section-title">Creative Gallery</h2>
          <div className="bp-gallery-grid">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`bp-gallery-box bp-gallery-box--${i < 2 ? "large" : "medium"}`}>
                <span className="bp-gallery-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M4 22l6-5 5 4 4-3 9 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="bp-gallery-placeholder">Image Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Brand Story ───────────────────────── */}
      <section className="bp-story-section bp-reveal">
        <div className="bp-story-inner">
          <div className="bp-story-text">
            <h2 className="bp-section-title">60 Years of Legacy</h2>
            <p className="bp-story-body">
              Mast Masala has a legacy of over 60 years in the field of spices. Founded by Mr. Kailash
              Ramanlal Jhaveri, following the legacy of his late father Shri Ramanlal J. Jhaveri from
              Chorwad, Junagadh, Gujarat. JSPL delivers fresh, pure, and authentic quality products
              through research, innovation, and technological advancements.
            </p>
          </div>
          <div className="bp-story-deco" aria-hidden="true">
            <span className="bp-story-big-num">60</span>
          </div>
        </div>
      </section>

      {/* ── Section 6: CTA Strip ────────────────────────── */}
      <section className="bp-cta-strip">
        <div className="bp-cta-inner">
          <p className="bp-cta-sub">Want results like these?</p>
          <Link href="/contact" className="bp-cta-btn">
            Book a discovery call with Raji →
          </Link>
        </div>
      </section>

    </main>
  );
}

/* ── Shared WorkDone component ────────────────────────── */
function WorkDone() {
  return (
    <div className="bp-work-done">
      <h3 className="bp-work-title">Work Done</h3>
      <ul className="bp-work-list">
        {WORK_DONE.map(w => (
          <li key={w} className="bp-work-item">
            <span className="bp-work-dot" />
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
