"use client";
import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DEFAULT_BRAND, type BrandData } from "@/lib/brand";
import AnalyticsChartCard from "@/components/brands/AnalyticsChartCard";

/* ─── Types ─────────────────────────────────────────── */
type Tab = "content" | "social" | "servicing";

const DURATION = 1800;
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}


/* ═══════════════════════════════════════════════════════ */
export default function MastMasalaPage({ data = DEFAULT_BRAND }: { data?: BrandData & { logo?: string; name?: string } }) {

  const STATS = data.stats;

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
  const TITLE = data.hero.title;
  const chars = TITLE.split("").map((ch, i) =>
    ch === " "
      ? <span key={i} className="bp-char-space" aria-hidden="true">&nbsp;</span>
      : <span key={i} className="bp-char" aria-hidden="true">{ch}</span>
  );

  const pal = data.palette ?? DEFAULT_BRAND.palette;
  const paletteVars = {
    "--bp-primary": pal.primary,
    "--bp-bg": pal.bg,
    "--bp-bg-soft": pal.bgSoft,
    "--bp-ink": pal.ink,
    "--bp-accent": pal.accent,
  } as CSSProperties;

  return (
    <main className="bp-page" style={paletteVars}>

      {/* ── Section 1: Hero ─────────────────────────────── */}
      <section className="bp-hero">
        {/* Decorative BG text */}
        <div className="bp-hero-bg-text" aria-hidden="true">{data.hero.bgText}</div>

        <div className="bp-hero-inner" ref={heroRef}>
          {data.logo ? (
            <div
              className="bp-hero-logo-badge"
              style={{
                marginBottom: 18,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                ...(data.logoBg
                  ? {
                      background: data.logoBg,
                      padding: "16px 24px",
                      borderRadius: 18,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.14)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }
                  : {}),
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.logo} alt={data.name ?? data.hero.title} className="bp-hero-logo"
                style={{ height: 60, width: "auto", objectFit: "contain", display: "block" }} />
            </div>
          ) : null}
          <p className="bp-hero-eyebrow">{data.hero.eyebrow}</p>

          <h1 className="bp-hero-title" aria-label={data.hero.title}>
            {chars}
          </h1>

          {/* Floating accent line */}
          <div className="bp-hero-accent-line" ref={accentLine} />

          <p className="bp-hero-tagline">{data.hero.tagline}</p>

          <div className="bp-hero-tags">
            {data.hero.tags.map(t => (
              <span key={t} className="bp-tag">{t}</span>
            ))}
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
                  {t === "content" ? data.tabs.contentLabel : t === "social" ? data.tabs.socialLabel : data.tabs.servicingLabel}
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
                <WorkDone initReveal={initWorkReveal} itemsRef={workItems} workDone={data.workDone} />
                <div className="bp-cal-card">
                  <h3 className="bp-cal-title">{data.calendar.title}</h3>
                  <div className="bp-cal-table-wrap">
                    <table className="bp-cal-table">
                      <thead>
                        <tr>
                          <th>Type</th><th>Date</th><th>Concept</th><th>Copy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.calendar.rows.map(r => (
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
                <WorkDone initReveal={initWorkReveal} itemsRef={workItems} workDone={data.workDone} />
                <div className="bp-analytics-grid">
                  {data.analytics.map(a => (
                    <div key={a.label} className="bp-analytics-card">
                      <div className="bp-analytics-img-wrap" style={{ position: "relative", overflow: "hidden" }}>
                        <AnalyticsChartCard card={a} brandColor={data.brandColor} />
                      </div>
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
                <WorkDone initReveal={initWorkReveal} itemsRef={workItems} workDone={data.workDone} />
                <div className="bp-mom-card">
                  <h3 className="bp-mom-title">{data.mom.title}</h3>
                  <ul className="bp-mom-list">
                    {data.mom.bullets.map((m, i) => (
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
          <h2 className="bp-section-title">{data.gallery.title}</h2>
          <div className="bp-gallery-grid">
            {data.gallery.images.map((img, i) => (
              <div
                key={i}
                className="bp-gallery-box"
                ref={el => { if (el) galleryBoxes.current[i] = el; }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width:767px) 50vw, 33vw"
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
            <h2 className="bp-section-title">{data.story.title}</h2>
            <p className="bp-story-body">
              {data.story.body}
            </p>
          </div>
          <div className="bp-story-deco" ref={storyRight} aria-hidden="true" style={{ transform: "translateX(60px)", opacity: 0 }}>
            <span className="bp-story-big-num">{data.story.bigNum}</span>
          </div>
        </div>
      </section>

      {/* ── Section 6: Our Approach ─────────────────────── */}
      <section className="bp-approach-section" ref={approachRef}>
        <div className="bp-approach-inner">
          <p className="bp-approach-eyebrow">{data.approach.eyebrow}</p>
          <h2
            className="bp-approach-heading"
            dangerouslySetInnerHTML={{ __html: data.approach.heading }}
          />
          <div className="bp-approach-grid">
            {data.approach.items.map(item => (
              <div className="bp-approach-item" key={item.num}>
                <span className="bp-approach-num">{item.num}</span>
                <h3 className="bp-approach-item-title">{item.title}</h3>
                <p className="bp-approach-item-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 7: Featured Video ───────────────────── */}
      {data.featured.video && (
      <section className="bp-featured-video-section" ref={featuredRef}>
        <div className="bp-featured-video-inner">
          <p className="bp-featured-eyebrow">{data.featured.eyebrow}</p>
          <h2
            className="bp-featured-heading"
            dangerouslySetInnerHTML={{ __html: data.featured.heading }}
          />
          <div className="bp-featured-video-wrap">
            <video
              className="bp-featured-video"
              src={data.featured.video}
              autoPlay
              muted
              loop
              playsInline
            />
            <div className="bp-featured-glass liquid-glass-warm">
              <p className="bp-featured-glass-label">{data.featured.glassLabel}</p>
              <p className="bp-featured-glass-text">{data.featured.glassText}</p>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ── Section 8: Philosophy ───────────────────────── */}
      {data.philosophy.video && (
      <section className="bp-philosophy-section">
        <div className="bp-philosophy-inner">
          <div
            className="bp-philosophy-video-col"
            ref={philoLeft}
            style={{ transform: "translateX(-60px)", opacity: 0 }}
          >
            <video
              className="bp-philosophy-video"
              src={data.philosophy.video}
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
            <p className="bp-philosophy-eyebrow">{data.philosophy.eyebrow}</p>
            <h2
              className="bp-philosophy-heading"
              dangerouslySetInnerHTML={{ __html: data.philosophy.heading }}
            />
            <div className="bp-philosophy-divider" />
            {data.philosophy.paragraphs.map((p, i) => (
              <p className="bp-philosophy-body" key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── Section 9: What We Delivered ────────────────── */}
      {data.delivered.cards.some(c => c.video) && (
      <section className="bp-delivered-section" ref={deliveredRef}>
        <div className="bp-delivered-inner">
          <p className="bp-delivered-eyebrow">{data.delivered.eyebrow}</p>
          <h2
            className="bp-delivered-heading"
            dangerouslySetInnerHTML={{ __html: data.delivered.heading }}
          />
          <div className="bp-delivered-grid">
            {data.delivered.cards.map((card, i) => (
              <div
                key={i}
                className="bp-delivered-card"
                ref={el => { if (el) deliveredCards.current[i] = el; }}
              >
                <video
                  className="bp-delivered-video"
                  src={card.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="bp-delivered-overlay liquid-glass-warm">
                  <h3 className="bp-delivered-card-title">{card.title}</h3>
                  <p className="bp-delivered-card-body">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── Section 10: CTA Strip ───────────────────────── */}
      <section className="bp-cta-strip" ref={ctaRef}>
        <div className="bp-cta-inner">
          <p className="bp-cta-sub">{data.cta.sub}</p>
          <Link href={data.cta.href} className="bp-cta-btn">
            {data.cta.label}
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
  workDone:   BrandData["workDone"];
}
function WorkDone({ initReveal, itemsRef, workDone }: WorkDoneProps) {
  return (
    <div className="bp-work-done">
      <h3 className="bp-work-title">{workDone.title}</h3>
      <ul className="bp-work-list" ref={initReveal}>
        {workDone.bullets.map((w, i) => (
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
