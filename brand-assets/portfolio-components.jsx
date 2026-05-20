// Shared portfolio components for the Raji portfolio — used by the main
// Raji Portfolio.html and the all-palettes comparison page.
// Every component takes `palette` as a prop and uses it inline so multiple
// instances on the same page (with different palettes) don't fight over
// :root CSS variables.

// ─────────────────────────────────────────────────────────────
// Apply the selected palette as CSS variables on :root so the
// stylesheet above and inline styles below can both react.
// ─────────────────────────────────────────────────────────────
function applyPalette(p) {
  const r = document.documentElement;
  r.style.setProperty('--bg', p.bg);
  r.style.setProperty('--surface', p.surface);
  r.style.setProperty('--soft', p.soft);
  r.style.setProperty('--accent', p.accent);
  r.style.setProperty('--accent2', p.accent2);
  r.style.setProperty('--ink', p.ink);
  r.style.setProperty('--muted', p.muted);
  r.style.setProperty('--line', p.line);
}

// Invert a palette into a dark-mode variant: ink becomes the background,
// cream becomes the text colour, soft → ink-mid for surfaces. The accent
// stays the same so the brand spark survives.
function darkenPalette(p) {
  return {
    ...p,
    bg: p.ink,
    surface: '#1a1410',
    soft: '#2a221c',
    ink: p.bg,
    muted: p.soft,
    line: 'rgba(255,255,255,0.10)',
  };
}

// ─────────────────────────────────────────────────────────────
// Nav
// ─────────────────────────────────────────────────────────────
function Nav({ palette, Logo }) {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: palette.bg + 'ee',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${palette.line}`,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '18px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 24,
      }}>
        <div style={{ transform: 'scale(0.42)', transformOrigin: 'left center', height: 50, display: 'flex', alignItems: 'center' }}>
          <Logo palette={palette} size={1} />
        </div>
        <div style={{
          display: 'flex', gap: 36, alignItems: 'center',
          fontSize: 13, letterSpacing: '0.02em',
          color: palette.ink,
        }}>
          {['work', 'services', 'about', 'journal'].map((l) => (
            <a key={l} href={`#${l}`} style={{
              textDecoration: 'none',
              opacity: 0.85,
              borderBottom: '1px solid transparent',
              paddingBottom: 2,
              transition: 'opacity .15s, border-color .15s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.borderColor = palette.ink; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = 0.85; e.currentTarget.style.borderColor = 'transparent'; }}
            >{l}</a>
          ))}
        </div>
        <a href="#contact" style={{
          background: palette.ink,
          color: palette.bg,
          textDecoration: 'none',
          padding: '11px 22px',
          borderRadius: 999,
          fontSize: 12,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontWeight: 500,
          transition: 'transform .15s, background .15s',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >say hi →</a>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero — big italic serif headline, optional inline capsule images
// ─────────────────────────────────────────────────────────────
function Hero({ palette, Logo, headline, showCapsules }) {
  return (
    <section style={{ padding: '90px 40px 60px', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        {/* eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 50,
          fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
          color: palette.muted,
        }}>
          <span style={{ width: 32, height: 1, background: palette.muted, opacity: 0.5 }}></span>
          <span>portfolio · vol 01</span>
          <span style={{ flex: 1, height: 1, background: palette.line }}></span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: palette.accent2,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: palette.accent2,
              animation: 'raji-pulse 2s ease-in-out infinite',
            }}></span>
            available · jun 2026
          </span>
        </div>

        {/* headline */}
        <h1 style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(56px, 9vw, 144px)',
          lineHeight: 0.95,
          letterSpacing: '-0.035em',
          color: palette.ink,
          margin: 0,
          textWrap: 'balance',
        }}>
          hello, i'm{' '}
          {showCapsules && (
            <span style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              width: 'clamp(80px, 12vw, 180px)',
              height: 'clamp(50px, 8vw, 110px)',
              borderRadius: 999,
              background: `linear-gradient(135deg, ${palette.soft} 0%, ${palette.accent} 100%)`,
              border: `3px solid ${palette.bg}`,
              boxShadow: `0 6px 20px ${palette.accent2}33`,
              margin: '0 12px',
              transform: 'translateY(-8px) rotate(-3deg)',
            }} aria-hidden="true"></span>
          )}
          <span style={{ color: palette.accent2 }}>raji</span> —{' '}
          {showCapsules && (
            <span style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              width: 'clamp(70px, 9vw, 130px)',
              height: 'clamp(50px, 8vw, 110px)',
              borderRadius: 999,
              background: palette.ink,
              border: `3px solid ${palette.bg}`,
              boxShadow: `0 6px 20px ${palette.ink}33`,
              margin: '0 8px',
              transform: 'translateY(-4px) rotate(2deg)',
              position: 'relative',
              overflow: 'hidden',
            }} aria-hidden="true">
              <span style={{
                position: 'absolute', inset: 0,
                background: `repeating-linear-gradient(45deg, transparent 0 8px, ${palette.bg}22 8px 9px)`,
              }}></span>
            </span>
          )}
          {headline}
        </h1>

        {/* sub + ctas */}
        <div style={{
          marginTop: 50,
          display: 'flex', gap: 60, flexWrap: 'wrap',
          alignItems: 'flex-end', justifyContent: 'space-between',
        }}>
          <p style={{
            fontSize: 17, lineHeight: 1.6, color: palette.ink, opacity: 0.78,
            maxWidth: 520, margin: 0,
            textWrap: 'pretty',
          }}>
            Three years writing copy &amp; running socials for D2C beauty, F&amp;B and lifestyle brands.
            I do <em style={{ fontFamily: '"Instrument Serif", serif', color: palette.accent2 }}>client servicing</em> like a producer,{' '}
            <em style={{ fontFamily: '"Instrument Serif", serif', color: palette.accent2 }}>social</em> like a curator, and{' '}
            <em style={{ fontFamily: '"Instrument Serif", serif', color: palette.accent2 }}>copy</em> like it has to earn its rent.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#work" style={{
              background: palette.ink, color: palette.bg,
              textDecoration: 'none',
              padding: '14px 28px', borderRadius: 999,
              fontSize: 13, letterSpacing: '0.18em',
              textTransform: 'uppercase', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>see selected work <span>→</span></a>
            <a href="#contact" style={{
              background: 'transparent', color: palette.ink,
              textDecoration: 'none',
              padding: '14px 28px', borderRadius: 999,
              border: `1px solid ${palette.ink}`,
              fontSize: 13, letterSpacing: '0.18em',
              textTransform: 'uppercase', fontWeight: 500,
            }}>work with me</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes raji-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero · Centered variant — minimal, magazine cover
// ─────────────────────────────────────────────────────────────
function HeroCentered({ palette, headline }) {
  return (
    <section style={{ padding: '110px 40px 80px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        {/* eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 14,
          fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
          color: palette.muted, marginBottom: 40,
        }}>
          <span style={{ width: 24, height: 1, background: palette.muted, opacity: 0.5 }}></span>
          <span>vol 01 · mmxxvi</span>
          <span style={{ width: 24, height: 1, background: palette.muted, opacity: 0.5 }}></span>
        </div>

        <h1 style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(60px, 9vw, 156px)',
          lineHeight: 0.93,
          letterSpacing: '-0.035em',
          color: palette.ink,
          margin: 0,
          textWrap: 'balance',
        }}>
          hello, i'm <span style={{ color: palette.accent2 }}>raji</span><br/>
          <span style={{ fontSize: '0.7em' }}>{headline}</span>
        </h1>

        <p style={{
          fontSize: 17, lineHeight: 1.65, color: palette.ink, opacity: 0.78,
          maxWidth: 620, margin: '40px auto 0',
          textWrap: 'pretty',
        }}>
          Three years writing copy &amp; running socials for D2C beauty, F&amp;B and lifestyle brands. Client servicing like a producer, social like a curator, copy like it has to earn its rent.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 44, flexWrap: 'wrap' }}>
          <a href="#work" style={{
            background: palette.ink, color: palette.bg, textDecoration: 'none',
            padding: '14px 28px', borderRadius: 999,
            fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase',
            fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>see selected work <span>→</span></a>
          <a href="#contact" style={{
            background: 'transparent', color: palette.ink, textDecoration: 'none',
            padding: '14px 28px', borderRadius: 999, border: `1px solid ${palette.ink}`,
            fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500,
          }}>work with me</a>
        </div>

        {/* decorative scattered marks */}
        <div style={{ marginTop: 64, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
          {['social', 'content', 'client servicing'].map((s, i) => (
            <React.Fragment key={i}>
              <span style={{
                fontFamily: '"Instrument Serif", serif', fontStyle: 'italic',
                fontSize: 18, color: palette.ink, opacity: 0.65,
              }}>{s}</span>
              {i < 2 && <span style={{ width: 6, height: 6, borderRadius: '50%', background: palette.accent2 }}></span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero · Split variant — left copy, right big image-slot column
// ─────────────────────────────────────────────────────────────
function HeroSplit({ palette, headline }) {
  return (
    <section style={{ padding: '60px 40px 80px' }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: 80,
        alignItems: 'center',
      }}>
        <div>
          <div style={{
            fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: palette.accent2, marginBottom: 28,
          }}>portfolio · a writer who serves</div>
          <h1 style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(48px, 6.5vw, 108px)',
            lineHeight: 0.96,
            letterSpacing: '-0.03em',
            color: palette.ink,
            margin: 0,
            textWrap: 'balance',
          }}>
            hello, i'm <span style={{ color: palette.accent2 }}>raji</span>.<br/>
            {headline}
          </h1>
          <p style={{
            fontSize: 16, lineHeight: 1.65, color: palette.ink, opacity: 0.78,
            maxWidth: 520, marginTop: 36,
            textWrap: 'pretty',
          }}>
            Three years writing copy &amp; running socials for D2C beauty, F&amp;B and lifestyle brands. I do client servicing like a producer, social like a curator, copy like it has to earn its rent.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
            <a href="#work" style={{
              background: palette.ink, color: palette.bg, textDecoration: 'none',
              padding: '14px 28px', borderRadius: 999,
              fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase',
              fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>see selected work <span>→</span></a>
            <a href="#contact" style={{
              background: 'transparent', color: palette.ink, textDecoration: 'none',
              padding: '14px 28px', borderRadius: 999, border: `1px solid ${palette.ink}`,
              fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500,
            }}>work with me</a>
          </div>
        </div>

        {/* hero image stack */}
        <div style={{ position: 'relative', aspectRatio: '4 / 5' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(165deg, ${palette.soft} 0%, ${palette.accent} 65%, ${palette.accent2} 100%)`,
            borderRadius: 32,
            transform: 'rotate(2deg)',
            boxShadow: `0 30px 60px ${palette.ink}22`,
          }}>
            <image-slot
              id="hero-photo"
              shape="rect"
              placeholder="drop your portrait"
              style={{
                position: 'absolute', inset: 0,
                borderRadius: 32,
                width: '100%', height: '100%',
              }}
            ></image-slot>
          </div>
          {/* sticker */}
          <div style={{
            position: 'absolute', top: -20, right: -10,
            background: palette.bg,
            color: palette.ink,
            padding: '12px 18px',
            borderRadius: 999,
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 18,
            transform: 'rotate(8deg)',
            border: `1.5px solid ${palette.ink}`,
            boxShadow: `0 6px 14px ${palette.ink}22`,
            zIndex: 2,
          }}>— booking jun 2026</div>
          {/* badge bottom-left */}
          <div style={{
            position: 'absolute', bottom: -16, left: -16,
            background: palette.ink,
            color: palette.bg,
            padding: '14px 18px',
            borderRadius: 16,
            fontFamily: '"DM Sans", sans-serif',
            fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: 10,
            zIndex: 2,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: palette.accent }}></span>
            14m organic reach → 2025
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero router — picks a variant by tweak
// ─────────────────────────────────────────────────────────────
function HeroRouter(props) {
  if (props.heroStyle === 'centered') return <HeroCentered {...props} />;
  if (props.heroStyle === 'split')    return <HeroSplit    {...props} />;
  return <Hero {...props} />;
}

// ─────────────────────────────────────────────────────────────
// Marquee strip — services / vibe words
// ─────────────────────────────────────────────────────────────
function Marquee({ palette }) {
  const words = [
    'client servicing', 'social strategy', 'content writing',
    'brand voice', 'launch campaigns', 'short-form video',
    'newsletter copy', 'community building',
  ];
  const row = [...words, ...words];
  return (
    <section style={{
      padding: '40px 0',
      borderTop: `1px solid ${palette.line}`,
      borderBottom: `1px solid ${palette.line}`,
      overflow: 'hidden',
      background: palette.surface,
    }}>
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i} style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 64,
            letterSpacing: '-0.02em',
            color: palette.ink,
            padding: '0 40px',
            display: 'inline-flex', alignItems: 'center', gap: 80,
            whiteSpace: 'nowrap',
          }}>
            {w}
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: palette.accent2,
              flexShrink: 0,
            }}></span>
          </span>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// About — photo capsule + intro + stat strip
// ─────────────────────────────────────────────────────────────
function About({ palette }) {
  return (
    <section id="about" style={{ padding: '120px 40px' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        gap: 80,
        alignItems: 'center',
      }}>
        {/* photo slot */}
        <div style={{
          width: '100%',
          aspectRatio: '4 / 5',
          background: `linear-gradient(160deg, ${palette.soft} 0%, ${palette.accent} 70%, ${palette.accent2} 100%)`,
          borderRadius: '50% 50% 18px 18px / 30% 30% 18px 18px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 30px 60px ${palette.ink}22`,
        }}>
          <image-slot
            id="about-photo"
            shape="rect"
            placeholder="drop a portrait here"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              width: '100%',
              height: '100%',
            }}
          ></image-slot>
          {/* signature stamp */}
          <div style={{
            position: 'absolute',
            bottom: 20, right: 20,
            background: palette.bg,
            color: palette.ink,
            padding: '10px 16px',
            borderRadius: 999,
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 18,
            transform: 'rotate(-6deg)',
            boxShadow: `0 4px 14px ${palette.ink}33`,
          }}>— raji ✿</div>
        </div>

        {/* copy */}
        <div>
          <div style={{
            fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
            color: palette.accent2, marginBottom: 24,
          }}>· about</div>
          <h2 style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(40px, 5vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: palette.ink,
            margin: 0,
            textWrap: 'balance',
          }}>i write copy that <span style={{ color: palette.accent2 }}>doesn't try too hard</span> &amp; servicing that doesn't make you chase.</h2>

          <p style={{
            fontSize: 16, lineHeight: 1.7, color: palette.ink, opacity: 0.78,
            maxWidth: 580, marginTop: 28,
            textWrap: 'pretty',
          }}>
            I started writing for a tiny clean-beauty brand at 22, fell in love with the bit where you make a stranger feel seen in two lines, and never stopped. Today I run socials &amp; copy for founders who'd rather be in the kitchen / lab / studio than in their drafts folder.
          </p>

          {/* stat strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            marginTop: 48,
            borderTop: `1px solid ${palette.line}`,
            borderBottom: `1px solid ${palette.line}`,
          }}>
            {[
              { n: '3+', l: 'years writing' },
              { n: '20+', l: 'brands shipped' },
              { n: '14m', l: 'organic impressions, 2025' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: '24px 20px',
                borderLeft: i > 0 ? `1px solid ${palette.line}` : 'none',
              }}>
                <div style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: 'italic',
                  fontSize: 48,
                  lineHeight: 1,
                  color: palette.accent2,
                  letterSpacing: '-0.03em',
                }}>{s.n}</div>
                <div style={{
                  fontSize: 11, letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: palette.muted,
                  marginTop: 8,
                }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Services — 3 cards
// ─────────────────────────────────────────────────────────────
function Services({ palette }) {
  const items = [
    {
      n: '01',
      t: 'Client Servicing',
      d: 'I sit between you and the brand like a translator with deadlines. Briefs, timelines, status calls, the awkward feedback round — all handled, all human.',
      tags: ['agency pod', 'retainer', 'launch sprints'],
    },
    {
      n: '02',
      t: 'Social Media Management',
      d: 'Strategy, calendar, captions, community. I treat the feed like a magazine — every post earns its place, nothing is filler, replies happen in actual sentences.',
      tags: ['IG + LinkedIn', 'reels scripting', 'monthly retainer'],
    },
    {
      n: '03',
      t: 'Content Writing',
      d: 'Web copy, newsletters, brand voice docs, launch landing pages. Warm, specific, never doing too much. Punctuation included.',
      tags: ['voice guides', 'long-form', 'launch pages'],
    },
  ];
  return (
    <section id="services" style={{
      padding: '120px 40px',
      background: palette.surface,
      borderTop: `1px solid ${palette.line}`,
      borderBottom: `1px solid ${palette.line}`,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: 24,
          marginBottom: 64,
        }}>
          <div>
            <div style={{
              fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
              color: palette.accent2, marginBottom: 16,
            }}>· services</div>
            <h2 style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: palette.ink,
              margin: 0,
              textWrap: 'balance',
            }}>three ways i can <span style={{ color: palette.accent2 }}>help</span>.</h2>
          </div>
          <div style={{
            fontSize: 14, lineHeight: 1.55,
            color: palette.muted, maxWidth: 360, textWrap: 'pretty',
          }}>
            Project-based or monthly retainer. Half-day strategy sessions for founders who don't need ongoing support.
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}>
          {items.map((s, i) => (
            <article key={i} style={{
              background: palette.bg,
              border: `1px solid ${palette.line}`,
              borderRadius: 24,
              padding: '36px 32px',
              display: 'flex', flexDirection: 'column',
              gap: 20,
              minHeight: 420,
              transition: 'transform .25s ease, box-shadow .25s ease',
              cursor: 'default',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 24px 40px ${palette.ink}1a`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <div style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: 'italic',
                  fontSize: 28,
                  color: palette.accent2,
                }}>{s.n}</div>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: palette.soft,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: palette.ink,
                  fontSize: 18,
                }}>→</div>
              </div>
              <h3 style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 36, lineHeight: 1.05,
                color: palette.ink,
                margin: 0,
                letterSpacing: '-0.02em',
                textWrap: 'balance',
              }}>{s.t}</h3>
              <p style={{
                fontSize: 14.5, lineHeight: 1.6,
                color: palette.ink, opacity: 0.75,
                margin: 0, flex: 1,
                textWrap: 'pretty',
              }}>{s.d}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {s.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: 11, letterSpacing: '0.06em',
                    padding: '6px 12px',
                    borderRadius: 999,
                    border: `1px solid ${palette.line}`,
                    color: palette.muted,
                  }}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Selected work — 4 cards
// ─────────────────────────────────────────────────────────────
function Work({ palette }) {
  const projects = [
    { id: 'p1', client: 'Mira & Co.', kind: 'D2C beauty · launch + socials',
      title: 'a launch that actually launched.', year: '2025',
      tint: palette.soft, accent: palette.accent2 },
    { id: 'p2', client: 'Slow Press', kind: 'F&B · brand voice + newsletter',
      title: 'a voice that tastes like the product.', year: '2025',
      tint: palette.accent, accent: palette.ink },
    { id: 'p3', client: 'Anaya Studio', kind: 'jewellery · social retainer',
      title: 'turning quiet drops into sell-outs.', year: '2024',
      tint: palette.ink, accent: palette.bg },
    { id: 'p4', client: 'Field Notes', kind: 'wellness · client servicing',
      title: 'four founders, one calm inbox.', year: '2024',
      tint: palette.surface, accent: palette.accent2 },
  ];
  return (
    <section id="work" style={{ padding: '120px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: 56, flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <div style={{
              fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
              color: palette.accent2, marginBottom: 16,
            }}>· selected work</div>
            <h2 style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: palette.ink,
              margin: 0,
              textWrap: 'balance',
            }}>recent <span style={{ color: palette.accent2 }}>chapters</span>.</h2>
          </div>
          <a href="#contact" style={{
            color: palette.ink, textDecoration: 'none',
            fontSize: 13, letterSpacing: '0.18em',
            textTransform: 'uppercase', fontWeight: 500,
            borderBottom: `1px solid ${palette.ink}`,
            paddingBottom: 4,
          }}>full case decks on request →</a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gridTemplateRows: 'auto auto',
          gap: 24,
        }}>
          {projects.map((p, i) => (
            <article key={p.id} style={{
              gridColumn: i % 2 === 0 ? '1' : '2',
              background: p.tint,
              borderRadius: 28,
              padding: '32px 36px',
              minHeight: i === 0 || i === 3 ? 360 : 320,
              border: `1px solid ${palette.line}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform .3s ease',
              color: i === 2 ? palette.bg : palette.ink,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
                <div>
                  <div style={{
                    fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
                    opacity: 0.7, marginBottom: 8,
                  }}>{p.client}</div>
                  <div style={{
                    fontSize: 12, opacity: 0.6,
                  }}>{p.kind}</div>
                </div>
                <div style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: 'italic',
                  fontSize: 24,
                  opacity: 0.8,
                }}>'{p.year.slice(2)}</div>
              </div>

              <div>
                <h3 style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(32px, 3.4vw, 52px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  margin: 0,
                  marginTop: 40,
                  textWrap: 'balance',
                }}>{p.title}</h3>
                <div style={{
                  marginTop: 24, display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{
                    fontSize: 12, letterSpacing: '0.18em',
                    textTransform: 'uppercase', fontWeight: 500,
                  }}>view case →</span>
                  <span style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: p.accent,
                    color: i === 2 ? palette.ink : palette.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18,
                  }}>↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Quote
// ─────────────────────────────────────────────────────────────
function Quote({ palette }) {
  return (
    <section style={{
      padding: '120px 40px',
      background: palette.ink,
      color: palette.bg,
    }}>
      <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontSize: 96,
          lineHeight: 0.5,
          color: palette.accent,
          marginBottom: 28,
        }}>"</div>
        <blockquote style={{
          margin: 0,
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontSize: 'clamp(32px, 4vw, 56px)',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          textWrap: 'balance',
        }}>
          raji is the rare writer who actually <span style={{ color: palette.accent }}>reads the brand brief</span> before opening google docs. she gave our social a voice in three weeks that we'd been searching for in two years.
        </blockquote>
        <div style={{
          marginTop: 48,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: palette.accent,
          }}></div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Anaya M.</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Founder · Anaya Studio</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────────
function Contact({ palette }) {
  return (
    <section id="contact" style={{ padding: '140px 40px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
          color: palette.accent2, marginBottom: 28,
        }}>· say hi</div>
        <h2 style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(60px, 9vw, 144px)',
          lineHeight: 0.95,
          letterSpacing: '-0.035em',
          color: palette.ink,
          margin: 0,
          textWrap: 'balance',
        }}>
          let's make <span style={{ color: palette.accent2 }}>something</span> people want to read.
        </h2>

        <div style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 60,
          alignItems: 'start',
        }}>
          <p style={{
            fontSize: 17, lineHeight: 1.6,
            color: palette.ink, opacity: 0.78,
            margin: 0,
            textWrap: 'pretty',
          }}>
            Currently booking June–August 2026. I take on three retainer clients at a time and one launch project a month. The shortest path is a real email — tell me what you're building, and I'll reply within two working days.
          </p>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 12,
            fontSize: 14,
          }}>
            <a href="mailto:hello@raji.studio" style={{
              padding: '18px 22px',
              border: `1px solid ${palette.line}`,
              borderRadius: 16,
              background: palette.surface,
              textDecoration: 'none', color: palette.ink,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span>
                <span style={{ display: 'block', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: palette.muted, marginBottom: 4 }}>email</span>
                <span style={{ fontWeight: 500 }}>hello@raji.studio</span>
              </span>
              <span style={{ color: palette.accent2 }}>→</span>
            </a>
            <a href="#" style={{
              padding: '18px 22px',
              border: `1px solid ${palette.line}`,
              borderRadius: 16,
              background: palette.surface,
              textDecoration: 'none', color: palette.ink,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span>
                <span style={{ display: 'block', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: palette.muted, marginBottom: 4 }}>instagram</span>
                <span style={{ fontWeight: 500 }}>@raji.studio</span>
              </span>
              <span style={{ color: palette.accent2 }}>↗</span>
            </a>
            <a href="#" style={{
              padding: '18px 22px',
              border: `1px solid ${palette.line}`,
              borderRadius: 16,
              background: palette.surface,
              textDecoration: 'none', color: palette.ink,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span>
                <span style={{ display: 'block', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: palette.muted, marginBottom: 4 }}>linkedin</span>
                <span style={{ fontWeight: 500 }}>in/raji-writer</span>
              </span>
              <span style={{ color: palette.accent2 }}>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
function Footer({ palette, Logo }) {
  return (
    <footer style={{
      borderTop: `1px solid ${palette.line}`,
      padding: '40px',
      background: palette.surface,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        gap: 24, flexWrap: 'wrap',
        fontSize: 12, color: palette.muted,
      }}>
        <div style={{ transform: 'scale(0.34)', transformOrigin: 'left center', height: 36 }}>
          <Logo palette={palette} size={1} />
        </div>
        <div>© 2026 raji · made slowly, on purpose, in mumbai.</div>
        <div style={{ display: 'flex', gap: 18 }}>
          <a href="#" style={{ textDecoration: 'none', color: palette.muted }}>instagram</a>
          <a href="#" style={{ textDecoration: 'none', color: palette.muted }}>linkedin</a>
          <a href="mailto:hello@raji.studio" style={{ textDecoration: 'none', color: palette.muted }}>email</a>
        </div>
      </div>
    </footer>
  );
}


Object.assign(window, {
  applyPalette, darkenPalette,
  Nav, Hero, HeroCentered, HeroSplit, HeroRouter,
  Marquee, About, Services, Work, Quote, Contact, Footer,
});
