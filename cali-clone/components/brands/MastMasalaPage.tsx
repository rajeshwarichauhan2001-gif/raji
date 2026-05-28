"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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

/* ─── Gallery images ─────────────────────────────────── */
const BASE = "https://rajeshwarichauhan.in/wp-content/uploads";
const GALLERY_IMGS = [
  { src: `${BASE}/2025/12/Mast_Masala.png`,                          alt: "Mast Masala brand",        span2: true  },
  { src: `${BASE}/2025/12/Growth.png`,                               alt: "Reach growth chart",       span2: false },
  { src: `${BASE}/2025/12/Engagements.png`,                          alt: "Engagement analytics",     span2: false },
  { src: `${BASE}/2025/12/Ctr-Left.png`,                             alt: "CTR performance",          span2: false },
  { src: `${BASE}/2026/01/ChatGPT-Image-Jan-5-2026-05_37_59-PM.png`, alt: "Content planning session", span2: false },
];


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
          gsap.fromTo(
            statCards.current.filter(Boolean),
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
          );

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

  /* ── Gallery ─────────────────────────────────────────── */
  const galleryRef   = useRef<HTMLDivElement>(null);
  const galleryBoxes = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const title = el.querySelector<HTMLElement>(".bp-section-title");
    const boxes = galleryBoxes.current.filter(Boolean);
    const triggers: ScrollTrigger[] = [];

    const tTitle = gsap.from(title, {
      y: 24, opacity: 0, duration: 0.6, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 80%" },
    });
    if (tTitle.scrollTrigger) triggers.push(tTitle.scrollTrigger);

    const tBoxes = gsap.from(boxes, {
      scale: 0.88, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 72%" },
      onComplete: () => boxes.forEach(b => gsap.set(b, { clearProps: "transform,opacity" })),
    });
    if (tBoxes.scrollTrigger) triggers.push(tBoxes.scrollTrigger);

    return () => triggers.forEach(t => t.kill());
  }, []);

  /* ── Brand Story split entrance ──────────────────────── */
  const storyLeft  = useRef<HTMLDivElement>(null);
  const storyRight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = storyLeft.current;
    if (!el) return;
    const triggers: ScrollTrigger[] = [];

    const tL = gsap.to(el, {
      x: 0, opacity: 1, duration: 0.75, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 76%" },
    });
    const tR = gsap.to(storyRight.current, {
      x: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.12,
      scrollTrigger: { trigger: el, start: "top 76%" },
    });
    if (tL.scrollTrigger) triggers.push(tL.scrollTrigger);
    if (tR.scrollTrigger) triggers.push(tR.scrollTrigger);

    return () => triggers.forEach(t => t.kill());
  }, []);

  /* ── Approach section ─────────────────────────────── */
  const approachRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = approachRef.current;
    if (!el) return;
    const eyebrow = el.querySelector<HTMLElement>(".bp-approach-eyebrow");
    const heading = el.querySelector<HTMLElement>(".bp-approach-heading");
    const items   = el.querySelectorAll<HTMLElement>(".bp-approach-item");
    const triggers: ScrollTrigger[] = [];

    const tHead = gsap.from([eyebrow, heading], {
      y: 28, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 78%" },
    });
    const tItems = gsap.from(items, {
      y: 50, opacity: 0, duration: 0.7, stagger: 0.13, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 65%" },
    });
    if (tHead.scrollTrigger)  triggers.push(tHead.scrollTrigger);
    if (tItems.scrollTrigger) triggers.push(tItems.scrollTrigger);

    return () => triggers.forEach(t => t.kill());
  }, []);

  /* ── Philosophy section ───────────────────────────── */
  const philoLeft  = useRef<HTMLDivElement>(null);
  const philoRight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left  = philoLeft.current;
    const right = philoRight.current;
    if (!left || !right) return;
    const triggers: ScrollTrigger[] = [];

    const tL = gsap.to(left, {
      x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: left, start: "top 76%" },
    });
    const tR = gsap.to(right, {
      x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.15,
      scrollTrigger: { trigger: left, start: "top 76%" },
    });
    if (tL.scrollTrigger) triggers.push(tL.scrollTrigger);
    if (tR.scrollTrigger) triggers.push(tR.scrollTrigger);

    return () => triggers.forEach(t => t.kill());
  }, []);

  /* ── Delivered section ────────────────────────────── */
  const deliveredRef   = useRef<HTMLDivElement>(null);
  const deliveredCards = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const el = deliveredRef.current;
    if (!el) return;
    const eyebrow = el.querySelector<HTMLElement>(".bp-delivered-eyebrow");
    const heading = el.querySelector<HTMLElement>(".bp-delivered-heading");
    const cards   = deliveredCards.current.filter(Boolean);
    const triggers: ScrollTrigger[] = [];

    const tHead = gsap.from([eyebrow, heading], {
      y: 28, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 78%" },
    });
    const tCards = gsap.from(cards, {
      y: 64, scale: 0.96, opacity: 0, duration: 0.75, stagger: 0.18, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 70%" },
    });
    if (tHead.scrollTrigger)  triggers.push(tHead.scrollTrigger);
    if (tCards.scrollTrigger) triggers.push(tCards.scrollTrigger);

    return () => triggers.forEach(t => t.kill());
  }, []);

  /* ── Featured video ───────────────────────────────── */
  const featuredRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = featuredRef.current;
    if (!el) return;
    const eyebrow = el.querySelector<HTMLElement>(".bp-featured-eyebrow");
    const heading = el.querySelector<HTMLElement>(".bp-featured-heading");
    const wrap    = el.querySelector<HTMLElement>(".bp-featured-video-wrap");
    const glass   = el.querySelector<HTMLElement>(".bp-featured-glass");
    const triggers: ScrollTrigger[] = [];

    const tHead = gsap.from([eyebrow, heading], {
      y: 28, opacity: 0, duration: 0.65, stagger: 0.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 80%" },
    });
    const tWrap = gsap.from(wrap, {
      scale: 0.94, opacity: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: wrap, start: "top 82%" },
    });
    const tGlass = gsap.from(glass, {
      y: 20, opacity: 0, duration: 0.6, ease: "power3.out",
      scrollTrigger: { trigger: wrap, start: "top 70%" },
    });
    if (tHead.scrollTrigger)  triggers.push(tHead.scrollTrigger);
    if (tWrap.scrollTrigger)  triggers.push(tWrap.scrollTrigger);
    if (tGlass.scrollTrigger) triggers.push(tGlass.scrollTrigger);

    return () => triggers.forEach(t => t.kill());
  }, []);

  /* ── CTA Strip ────────────────────────────────────── */
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>(".bp-cta-sub, .bp-cta-btn");
    const tween = gsap.from(items, {
      y: 24, opacity: 0, scale: 0.97, duration: 0.65, stagger: 0.13, ease: "back.out(1.4)",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
    return () => tween.scrollTrigger?.kill();
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
            {GALLERY_IMGS.map((img, i) => (
              <div
                key={i}
                className={`bp-gallery-box${img.span2 ? " bp-gallery-box--span2" : ""}`}
                ref={el => { if (el) galleryBoxes.current[i] = el; }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={img.span2 ? "(max-width:767px) 100vw, 66vw" : "(max-width:767px) 50vw, 33vw"}
                  style={{ objectFit: "cover" }}
                />
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

      {/* ── Section 6: Our Approach ─────────────────────── */}
      <section className="bp-approach-section" ref={approachRef}>
        <div className="bp-approach-inner">
          <p className="bp-approach-eyebrow">HOW WE WORK</p>
          <h2 className="bp-approach-heading">
            Crafted for <em>Growth</em>
          </h2>
          <div className="bp-approach-grid">
            <div className="bp-approach-item">
              <span className="bp-approach-num">01</span>
              <h3 className="bp-approach-item-title">Deep Brand Audit</h3>
              <p className="bp-approach-item-body">We begin by understanding the brand&apos;s voice, audience, and existing content performance before we strategise.</p>
            </div>
            <div className="bp-approach-item">
              <span className="bp-approach-num">02</span>
              <h3 className="bp-approach-item-title">Content Architecture</h3>
              <p className="bp-approach-item-body">Every post is mapped to a goal — awareness, engagement, or conversion — and slotted into a structured monthly calendar.</p>
            </div>
            <div className="bp-approach-item">
              <span className="bp-approach-num">03</span>
              <h3 className="bp-approach-item-title">Execute &amp; Iterate</h3>
              <p className="bp-approach-item-body">We launch, track performance metrics weekly, and refine based on what the data tells us — no guesswork, only growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: Featured Video ───────────────────── */}
      <section className="bp-featured-video-section" ref={featuredRef}>
        <div className="bp-featured-video-inner">
          <p className="bp-featured-eyebrow">CAMPAIGN REEL</p>
          <h2 className="bp-featured-heading">
            Campaigns That <em>Convert</em>
          </h2>
          <div className="bp-featured-video-wrap">
            <video
              className="bp-featured-video"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="bp-featured-glass liquid-glass-warm">
              <p className="bp-featured-glass-label">Featured Work</p>
              <p className="bp-featured-glass-text">Mast Masala festive campaign — building brand recall through storytelling-led content.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 8: Philosophy ───────────────────────── */}
      <section className="bp-philosophy-section">
        <div className="bp-philosophy-inner">
          <div
            className="bp-philosophy-video-col"
            ref={philoLeft}
            style={{ transform: "translateX(-60px)", opacity: 0 }}
          >
            <video
              className="bp-philosophy-video"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <div
            className="bp-philosophy-text-col"
            ref={philoRight}
            style={{ transform: "translateX(60px)", opacity: 0 }}
          >
            <p className="bp-philosophy-eyebrow">OUR PHILOSOPHY</p>
            <h2 className="bp-philosophy-heading">
              Strategy <em>×</em> Results
            </h2>
            <div className="bp-philosophy-divider" />
            <p className="bp-philosophy-body">
              Great content isn&apos;t just creative — it&apos;s calculated. For Mast Masala, we merged authentic cultural storytelling with data-driven posting strategies to achieve measurable growth across Instagram and Facebook.
            </p>
            <p className="bp-philosophy-body">
              From festive reels to daily engagement posts, every deliverable was aligned with the brand&apos;s 60-year legacy while connecting with a modern, digital-first audience.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 9: What We Delivered ────────────────── */}
      <section className="bp-delivered-section" ref={deliveredRef}>
        <div className="bp-delivered-inner">
          <p className="bp-delivered-eyebrow">DELIVERABLES</p>
          <h2 className="bp-delivered-heading">
            What We <em>Delivered</em>
          </h2>
          <div className="bp-delivered-grid">
            <div
              className="bp-delivered-card"
              ref={el => { if (el) deliveredCards.current[0] = el; }}
            >
              <video
                className="bp-delivered-video"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="bp-delivered-overlay liquid-glass-warm">
                <h3 className="bp-delivered-card-title">Content Strategy</h3>
                <p className="bp-delivered-card-body">Monthly calendar, 30+ posts, 6+ reels with cultural hooks and festive themes.</p>
              </div>
            </div>
            <div
              className="bp-delivered-card"
              ref={el => { if (el) deliveredCards.current[1] = el; }}
            >
              <video
                className="bp-delivered-video"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7188672-6e92-402c-9e45-f1e0f454bdc4.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="bp-delivered-overlay liquid-glass-warm">
                <h3 className="bp-delivered-card-title">Growth &amp; Analytics</h3>
                <p className="bp-delivered-card-body">+22% reach, 29.4M impressions, and +21% engagement rate in festive quarter.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 10: CTA Strip ───────────────────────── */}
      <section className="bp-cta-strip" ref={ctaRef}>
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
