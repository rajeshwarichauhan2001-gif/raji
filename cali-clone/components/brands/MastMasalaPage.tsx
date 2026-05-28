"use client";
import { useEffect, useRef, useState, useCallback } from "react";
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

/* ─── Work-done bullets ───────────────────────────────── */
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
  { stat: "+22%", label: "Reach Growth",  sub: "29.4M Impressions" },
  { stat: "+21%", label: "Engagement",    sub: "2.1% Engagement Rate" },
  { stat: "+20%", label: "CTR",           sub: "214 Link Clicks" },
  { stat: "+5%",  label: "Followers",     sub: "4,305 Total" },
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

/* ─── Camera icon SVG ────────────────────────────────── */
function CameraIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 22l6-5 5 4 4-3 9 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════ */
export default function MastMasalaPage() {

  /* ── Hero: char-by-char GSAP ─────────────────────────── */
  const heroRef      = useRef<HTMLDivElement>(null);
  const accentLine   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const chars   = el.querySelectorAll<HTMLElement>(".bp-char");
    const tagline = el.querySelector<HTMLElement>(".bp-hero-tagline");
    const tags    = el.querySelectorAll<HTMLElement>(".bp-tag");
    const eyebrow = el.querySelector<HTMLElement>(".bp-hero-eyebrow");
    const line    = accentLine.current;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(eyebrow, { y: 20, opacity: 0, duration: 0.6 })
      .from(chars, { y: 80, opacity: 0, duration: 0.7, stagger: 0.04 }, "-=0.3")
      .from(line,  { scaleX: 0, transformOrigin: "left center", duration: 0.7, ease: "power2.out" }, "-=0.3")
      .from(tagline, { y: 24, opacity: 0, duration: 0.6 }, "-=0.2")
      .from(tags,    { y: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3");
  }, []);

  /* ── Stats count-up ──────────────────────────────────── */
  const statsRef = useRef<HTMLDivElement>(null);
  const [vals, setVals] = useState(STATS.map(() => 0));
  const statsStarted = useRef(false);
  const statCards = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsStarted.current) {
          statsStarted.current = true;

          // slide cards up
          gsap.from(statCards.current.filter(Boolean), {
            y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
          });

          // count-up
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

  /* ── Work Done bullet sequential reveal ──────────────── */
  const workListRef = useRef<HTMLUListElement | null>(null);
  const workItems   = useRef<HTMLLIElement[]>([]);
  const workStarted = useRef(false);

  const initWorkReveal = useCallback((ulEl: HTMLUListElement | null) => {
    if (!ulEl || workStarted.current) return;
    workListRef.current = ulEl;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !workStarted.current) {
          workStarted.current = true;
          const items = workItems.current.filter(Boolean);
          items.forEach((item, idx) => {
            setTimeout(() => {
              item.style.transform = "translateX(0)";
              item.style.opacity   = "1";
            }, idx * 120);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(ulEl);
  }, []);

  /* ── Gallery staggered scale reveal ─────────────────── */
  const galleryRef   = useRef<HTMLDivElement>(null);
  const galleryBoxes = useRef<HTMLDivElement[]>([]);
  const galStarted   = useRef(false);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !galStarted.current) {
          galStarted.current = true;
          const boxes = galleryBoxes.current.filter(Boolean);
          boxes.forEach((box, idx) => {
            setTimeout(() => {
              box.style.transform = "scale(1)";
              box.style.opacity   = "1";
            }, idx * 80);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Brand Story split entrance ──────────────────────── */
  const storyLeft  = useRef<HTMLDivElement>(null);
  const storyRight = useRef<HTMLDivElement>(null);
  const storyStarted = useRef(false);

  useEffect(() => {
    const el = storyLeft.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !storyStarted.current) {
          storyStarted.current = true;
          gsap.to(storyLeft.current,  { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" });
          gsap.to(storyRight.current, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.1 });
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Tabs with sliding indicator ────────────────────── */
  const [tab, setTab]         = useState<Tab>("content");
  const tabsNavRef            = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback((t: Tab) => {
    const nav = tabsNavRef.current;
    if (!nav) return;
    const btn = nav.querySelector<HTMLButtonElement>(`[data-tab="${t}"]`);
    if (!btn) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicatorStyle({
      left:  btnRect.left - navRect.left,
      width: btnRect.width,
    });
  }, []);

  useEffect(() => { updateIndicator(tab); }, [tab, updateIndicator]);

  const handleTabClick = (t: Tab) => {
    setTab(t);
    updateIndicator(t);
  };

  /* ── Tab content transition state ────────────────────── */
  const [displayTab, setDisplayTab] = useState<Tab>("content");
  const [transitioning, setTransitioning] = useState(false);

  const switchTab = useCallback((t: Tab) => {
    if (t === displayTab) return;
    setTransitioning(true);
    setTimeout(() => {
      setDisplayTab(t);
      setTransitioning(false);
    }, 250);
    handleTabClick(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayTab]);

  /* ── TITLE chars ─────────────────────────────────────── */
  const TITLE = "MAST MASALA";
  const chars = TITLE.split("").map((ch, i) =>
    ch === " "
      ? <span key={i} className="bp-char-space" aria-hidden="true">&nbsp;</span>
      : <span key={i} className="bp-char" aria-hidden="true">{ch}</span>
  );

  return (
    <main className="bp-page">

      {/* ── Section 1: Hero ─────────────────────────────── */}
      <section className="bp-hero">
        {/* Decorative BG text */}
        <div className="bp-hero-bg-text" aria-hidden="true">MM</div>

        <div className="bp-hero-inner" ref={heroRef}>
          <p className="bp-hero-eyebrow">CLIENT ARCHIVE</p>

          <h1 className="bp-hero-title" aria-label="Mast Masala">
            {chars}
          </h1>

          {/* Floating accent line */}
          <div className="bp-hero-accent-line" ref={accentLine} />

          <p className="bp-hero-tagline">Masala Ek, Swaad Anek!</p>

          <div className="bp-hero-tags">
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
            <div
              key={s.label}
              className="bp-stat-card"
              ref={el => { if (el) statCards.current[i] = el; }}
            >
              <span className="bp-stat-num">
                {vals[i].toFixed(s.decimals)}{s.suffix}
              </span>
              <span className="bp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Service Tabs ─────────────────────── */}
      <section className="bp-tabs-section">
        <div className="bp-tabs-inner">

          <div className="bp-tabs-nav-wrap">
            <div className="bp-tabs-nav" ref={tabsNavRef}>
              {(["content", "social", "servicing"] as Tab[]).map(t => (
                <button
                  key={t}
                  data-tab={t}
                  className={`bp-tab-btn${tab === t ? " bp-tab-btn--active" : ""}`}
                  onClick={() => switchTab(t)}
                >
                  {t === "content" ? "Content Writing" : t === "social" ? "Social Media" : "Client Servicing"}
                </button>
              ))}
              {/* Sliding indicator */}
              <div
                className="bp-tab-indicator"
                style={{
                  left:  indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />
            </div>
          </div>

          <div className={`bp-tab-panel-wrap${transitioning ? " bp-tab-transitioning" : ""}`}>
            {/* Content Writing */}
            {displayTab === "content" && (
              <div className="bp-tab-panel bp-tab-panel--visible">
                <WorkDone initReveal={initWorkReveal} itemsRef={workItems} />
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
            )}

            {/* Social Media */}
            {displayTab === "social" && (
              <div className="bp-tab-panel bp-tab-panel--visible">
                <WorkDone initReveal={initWorkReveal} itemsRef={workItems} />
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
            )}

            {/* Client Servicing */}
            {displayTab === "servicing" && (
              <div className="bp-tab-panel bp-tab-panel--visible">
                <WorkDone initReveal={initWorkReveal} itemsRef={workItems} />
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
            )}
          </div>
        </div>
      </section>

      {/* ── Section 4: Gallery ──────────────────────────── */}
      <section className="bp-gallery-section">
        <div className="bp-gallery-inner" ref={galleryRef}>
          <h2 className="bp-section-title">Creative Gallery</h2>
          <div className="bp-gallery-grid">
            {[0, 1, 2, 3, 4, 5].map(i => (
              <div
                key={i}
                className={`bp-gallery-box${i === 0 ? " bp-gallery-box--span2" : ""}`}
                ref={el => { if (el) galleryBoxes.current[i] = el; }}
              >
                <span className="bp-gallery-icon">
                  <CameraIcon />
                </span>
                <span className="bp-gallery-placeholder">Image Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Brand Story ───────────────────────── */}
      <section className="bp-story-section">
        <div className="bp-story-inner">
          <div className="bp-story-text" ref={storyLeft} style={{ transform: "translateX(-60px)", opacity: 0 }}>
            <h2 className="bp-section-title">60 Years of Legacy</h2>
            <p className="bp-story-body">
              Mast Masala has a legacy of over 60 years in the field of spices. Founded by Mr. Kailash
              Ramanlal Jhaveri, following the legacy of his late father Shri Ramanlal J. Jhaveri from
              Chorwad, Junagadh, Gujarat. JSPL delivers fresh, pure, and authentic quality products
              through research, innovation, and technological advancements.
            </p>
          </div>
          <div className="bp-story-deco" ref={storyRight} aria-hidden="true" style={{ transform: "translateX(60px)", opacity: 0 }}>
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
interface WorkDoneProps {
  initReveal: (el: HTMLUListElement | null) => void;
  itemsRef:   React.MutableRefObject<HTMLLIElement[]>;
}
function WorkDone({ initReveal, itemsRef }: WorkDoneProps) {
  return (
    <div className="bp-work-done">
      <h3 className="bp-work-title">Work Done</h3>
      <ul className="bp-work-list" ref={initReveal}>
        {WORK_DONE.map((w, i) => (
          <li
            key={w}
            className="bp-work-item"
            ref={el => { if (el) itemsRef.current[i] = el; }}
            style={{ transform: "translateX(-30px)", opacity: 0, transition: "transform 0.45s ease, opacity 0.45s ease" }}
          >
            <span className="bp-work-dot" />
            {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
