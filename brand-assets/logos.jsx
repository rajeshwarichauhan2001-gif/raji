// Logo explorations for "Raji" — six directions, each a self-contained
// component that renders into an SVG and reacts to a palette prop.
// All logos use the brand name "raji" (the user said: "raji same brand name hay").

const { useId } = React;

/* ───────────────────────── 01 · Italic Serif Wordmark ───────────────────────
   The hero direction — editorial serif italic, very Cali-coded. Soft, warm,
   feminine. A pin-dot accent sits after the wordmark like a signature mark. */
function LogoSerifItalic({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  const accent = palette?.accent2 ?? '#c97b5b';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 0, lineHeight: 1 }}>
      <span style={{
        fontFamily: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: `${88 * size}px`,
        letterSpacing: '-0.02em',
        color: ink,
        lineHeight: 0.9,
      }}>raji</span>
      <span style={{
        display: 'inline-block',
        width: `${10 * size}px`,
        height: `${10 * size}px`,
        borderRadius: '50%',
        background: accent,
        marginLeft: `${4 * size}px`,
        transform: `translateY(-${4 * size}px)`,
      }}></span>
    </div>
  );
}

/* ───────────────────────── 02 · Lowercase Sans with Sparkle ─────────────────
   Clean lowercase grotesk + an asterisk sparkle mark dotting the i. Minimal,
   playful in restraint. */
function LogoSansSparkle({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  const accent = palette?.accent2 ?? '#c97b5b';
  return (
    <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
      <span style={{
        fontFamily: '"DM Sans", "Manrope", sans-serif',
        fontWeight: 500,
        fontSize: `${72 * size}px`,
        letterSpacing: '-0.04em',
        color: ink,
        display: 'inline-block',
      }}>raj<span style={{ position: 'relative' }}>
        <span style={{ visibility: 'hidden' }}>i</span>
        {/* stem of i (no dot) */}
        <span style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: `${10 * size}px`,
          height: `${44 * size}px`,
          background: ink,
          borderRadius: `${3 * size}px`,
        }}></span>
        {/* sparkle replacing the i-dot */}
        <svg
          width={20 * size}
          height={20 * size}
          viewBox="0 0 20 20"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: `${52 * size}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z"
                fill={accent} />
        </svg>
      </span></span>
    </div>
  );
}

/* ───────────────────────── 03 · Circle Stamp Monogram ────────────────────────
   Soft circle "badge" with a serif R inside, "raji studio" set in small caps
   below. Reads as a personal-brand seal. */
function LogoStamp({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  const accent = palette?.accent2 ?? '#c97b5b';
  const soft = palette?.soft ?? '#f0d6c4';
  const dim = 120 * size;
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: `${10 * size}px` }}>
      <div style={{
        width: dim,
        height: dim,
        borderRadius: '50%',
        background: soft,
        border: `1.5px solid ${accent}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <span style={{
          fontFamily: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
          fontStyle: 'italic',
          fontSize: `${72 * size}px`,
          color: ink,
          fontWeight: 400,
          lineHeight: 1,
        }}>R</span>
        {/* tiny "est." marks around the rim */}
        <span style={{
          position: 'absolute',
          bottom: `${8 * size}px`,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: `${7 * size}px`,
          letterSpacing: '0.3em',
          color: accent,
          textTransform: 'uppercase',
        }}>est · mmxxv</span>
      </div>
      <span style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: `${11 * size}px`,
        letterSpacing: '0.4em',
        color: ink,
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>raji · studio</span>
    </div>
  );
}

/* ───────────────────────── 04 · Handwritten Signature ────────────────────────
   "Raji" as a hand-drawn signature mark, drawn with bezier paths. Feels
   personal and intimate — the human behind the brand. */
function LogoSignature({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  return (
    <svg width={260 * size} height={90 * size} viewBox="0 0 260 90"
         style={{ display: 'block' }}>
      <g fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* R — loop + leg */}
        <path d="M 18 70
                 C 12 58, 14 38, 20 22
                 C 25 10, 35 8, 42 16
                 C 49 24, 44 38, 30 42
                 L 22 42
                 C 30 48, 40 56, 52 70" />
        {/* a — round bowl + tail */}
        <path d="M 78 50
                 C 72 42, 60 42, 56 52
                 C 52 64, 60 72, 70 70
                 C 76 69, 80 64, 80 56
                 L 80 70
                 C 80 76, 86 78, 92 72" />
        {/* j — tall stem + descender + dot up high */}
        <path d="M 108 38
                 L 108 76
                 C 108 84, 102 88, 94 84" />
        <circle cx="108" cy="26" r="2" fill={ink} />
        {/* i — short stem + dot */}
        <path d="M 130 50 L 130 70" />
        <circle cx="130" cy="40" r="2" fill={ink} />
        {/* underline flourish */}
        <path d="M 8 82
                 C 60 88, 140 88, 220 80
                 C 240 78, 248 74, 250 70" opacity="0.55" />
      </g>
    </svg>
  );
}

/* ───────────────────────── 05 · Geometric Sun Mark ───────────────────────────
   Abstract sunrise / arc mark + RAJI in spaced caps. Warm but modern,
   minimal-clean direction. */
function LogoSunMark({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  const accent = palette?.accent2 ?? '#c97b5b';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: `${16 * size}px` }}>
      <svg width={64 * size} height={64 * size} viewBox="0 0 64 64">
        {/* full sun circle */}
        <circle cx="32" cy="32" r="14" fill={accent} />
        {/* arc rays */}
        <g stroke={ink} strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M 32 6 L 32 12" />
          <path d="M 32 52 L 32 58" />
          <path d="M 6 32 L 12 32" />
          <path d="M 52 32 L 58 32" />
          <path d="M 13 13 L 17 17" />
          <path d="M 47 47 L 51 51" />
          <path d="M 13 51 L 17 47" />
          <path d="M 47 17 L 51 13" />
        </g>
      </svg>
      <span style={{
        fontFamily: '"DM Sans", "Manrope", sans-serif',
        fontSize: `${42 * size}px`,
        letterSpacing: '0.32em',
        color: ink,
        fontWeight: 500,
        textTransform: 'uppercase',
        paddingRight: `${4 * size}px`, // optical balance for tracking
      }}>raji</span>
    </div>
  );
}

/* ───────────────────────── 06 · Stacked Editorial Lockup ────────────────────
   "raji" big serif italic over a hairline divider with the role descriptors
   in small caps — the most editorial / "studio plate" feel. */
function LogoStacked({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  const accent = palette?.accent2 ?? '#c97b5b';
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: `${10 * size}px` }}>
      <span style={{
        fontFamily: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: `${72 * size}px`,
        color: ink,
        lineHeight: 0.85,
        letterSpacing: '-0.02em',
      }}>raji</span>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: `${10 * size}px`,
        width: '100%',
        justifyContent: 'center',
      }}>
        <span style={{ flex: 1, height: 1, background: ink, opacity: 0.4 }}></span>
        <span style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: `${10 * size}px`,
          letterSpacing: '0.35em',
          color: accent,
          textTransform: 'uppercase',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}>social · content · service</span>
        <span style={{ flex: 1, height: 1, background: ink, opacity: 0.4 }}></span>
      </div>
    </div>
  );
}

/* ───────────────────────── 07 · Boxed Caps Wordmark ─────────────────────────
   "RAJI" set in spaced caps inside a thin rectangle frame — confident,
   architectural. Reads like a stamp or a name plate. */
function LogoBoxed({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  const accent = palette?.accent2 ?? '#c97b5b';
  return (
    <div style={{
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: `1.5px solid ${ink}`,
      padding: `${18 * size}px ${36 * size}px ${14 * size}px`,
      gap: `${4 * size}px`,
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%) translateY(-50%)',
        background: palette?.bg ?? '#f6efe6',
        padding: `0 ${10 * size}px`,
        fontFamily: '"DM Sans", sans-serif',
        fontSize: `${8 * size}px`,
        letterSpacing: '0.4em',
        color: accent,
        textTransform: 'uppercase',
      }}>est. mmxxv</div>
      <span style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: `${44 * size}px`,
        letterSpacing: '0.4em',
        color: ink,
        fontWeight: 600,
        textTransform: 'uppercase',
        lineHeight: 1,
        paddingRight: `${10 * size}px`, // optical balance for tracking
      }}>raji</span>
      <span style={{
        fontFamily: '"Instrument Serif", serif',
        fontStyle: 'italic',
        fontSize: `${14 * size}px`,
        color: accent,
        lineHeight: 1,
        marginTop: `${4 * size}px`,
      }}>writes &amp; serves</span>
    </div>
  );
}

/* ───────────────────────── 08 · Floral Mark + Wordmark ──────────────────────
   A small botanical bloom mark beside an italic wordmark. Soft, organic,
   reads as personal/feminine without being twee. */
function LogoFloral({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  const accent = palette?.accent2 ?? '#c97b5b';
  const soft = palette?.soft ?? '#f0d6c4';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: `${18 * size}px` }}>
      <svg width={56 * size} height={56 * size} viewBox="0 0 56 56" fill="none">
        {/* five-petal abstract bloom */}
        <g transform="translate(28 28)">
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse key={deg}
              cx="0" cy="-12"
              rx="6" ry="11"
              fill={soft}
              stroke={accent}
              strokeWidth="1.2"
              transform={`rotate(${deg})`}
            />
          ))}
          <circle cx="0" cy="0" r="5" fill={accent} />
        </g>
      </svg>
      <span style={{
        fontFamily: '"Instrument Serif", serif',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: `${76 * size}px`,
        letterSpacing: '-0.02em',
        color: ink,
        lineHeight: 0.9,
      }}>raji</span>
    </div>
  );
}

/* ───────────────────────── 09 · Underline Swoosh ──────────────────────────
   "raji" with a hand-drawn underline flourish in the accent colour. */
function LogoUnderline({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  const accent = palette?.accent2 ?? '#c97b5b';
  return (
    <div style={{ display: 'inline-block', position: 'relative', lineHeight: 1 }}>
      <span style={{
        fontFamily: '"Instrument Serif", serif',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: `${96 * size}px`,
        letterSpacing: '-0.025em',
        color: ink,
        lineHeight: 0.9,
        display: 'inline-block',
      }}>raji</span>
      <svg
        viewBox="0 0 220 30"
        width={`${180 * size}px`}
        height={`${24 * size}px`}
        style={{
          display: 'block',
          marginTop: `${-2 * size}px`,
          marginLeft: `${-4 * size}px`,
        }}
      >
        <path
          d="M 4 18 C 30 6, 80 4, 130 10 C 170 15, 200 18, 216 12"
          stroke={accent}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 210 9 L 216 12 L 211 17"
          stroke={accent}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ───────────────────────── 10 · Vertical Initials ──────────────────────────
   R.A.J.I. stacked vertically — sidebar / spine treatment. Magazine-coded. */
function LogoVertical({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  const accent = palette?.accent2 ?? '#c97b5b';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: `${20 * size}px` }}>
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: `${6 * size}px`,
        alignItems: 'center',
      }}>
        {['r', 'a', 'j', 'i'].map((c, i) => (
          <span key={i} style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: `${38 * size}px`,
            color: i % 2 ? accent : ink,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}>{c}</span>
        ))}
      </div>
      <div style={{
        width: 1,
        background: ink,
        opacity: 0.4,
        alignSelf: 'stretch',
      }}></div>
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: `${6 * size}px`,
        fontFamily: '"DM Sans", sans-serif',
        fontSize: `${10 * size}px`,
        letterSpacing: '0.32em',
        color: ink,
        textTransform: 'uppercase',
      }}>
        <span>social</span>
        <span>content</span>
        <span>servicing</span>
      </div>
    </div>
  );
}

/* ───────────────────────── 11 · Ampersand Pair ──────────────────────────
   "raji &amp; co." with a focal italic ampersand — studio plate feel. */
function LogoAmpersand({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  const accent = palette?.accent2 ?? '#c97b5b';
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: `${2 * size}px` }}>
      <div style={{
        display: 'inline-flex', alignItems: 'baseline',
        fontFamily: '"Instrument Serif", serif',
        color: ink,
        lineHeight: 0.9,
        letterSpacing: '-0.02em',
      }}>
        <span style={{
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: `${64 * size}px`,
        }}>raji</span>
        <span style={{
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: `${96 * size}px`,
          color: accent,
          margin: `0 ${4 * size}px 0 ${10 * size}px`,
          transform: `translateY(${6 * size}px)`,
          display: 'inline-block',
        }}>&amp;</span>
        <span style={{
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: `${64 * size}px`,
        }}>co.</span>
      </div>
      <span style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: `${10 * size}px`,
        letterSpacing: '0.4em',
        color: ink,
        opacity: 0.7,
        textTransform: 'uppercase',
        marginTop: `${10 * size}px`,
      }}>a one-woman studio</span>
    </div>
  );
}

/* ───────────────────────── 12 · Reversed Chip ─────────────────────────────
   "raji" set in cream out of a dark pill — bold, modern, great as a button
   or favicon. */
function LogoChip({ palette, size = 1 }) {
  const ink = palette?.ink ?? '#2a2018';
  const bg = palette?.bg ?? '#f6efe6';
  const accent = palette?.accent2 ?? '#c97b5b';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      background: ink,
      color: bg,
      padding: `${16 * size}px ${28 * size}px`,
      borderRadius: 999,
      gap: `${12 * size}px`,
    }}>
      <span style={{
        width: `${8 * size}px`,
        height: `${8 * size}px`,
        borderRadius: '50%',
        background: accent,
        display: 'inline-block',
      }}></span>
      <span style={{
        fontFamily: '"Instrument Serif", serif',
        fontStyle: 'italic',
        fontSize: `${56 * size}px`,
        color: bg,
        lineHeight: 0.9,
        letterSpacing: '-0.02em',
      }}>raji</span>
      <span style={{
        fontFamily: '"DM Sans", sans-serif',
        fontSize: `${10 * size}px`,
        letterSpacing: '0.32em',
        color: bg,
        opacity: 0.7,
        textTransform: 'uppercase',
        borderLeft: `1px solid ${bg}55`,
        paddingLeft: `${12 * size}px`,
        lineHeight: 1.3,
      }}>studio<br/>2026</span>
    </div>
  );
}

window.RAJI_LOGOS = [
  { id: 'serif-italic', name: 'Soft Serif Italic',
    note: 'Editorial italic wordmark with a pin-dot signature mark. Hero option — feels warm, intentional, very personal-brand.',
    Component: LogoSerifItalic },
  { id: 'sans-sparkle', name: 'Sans with Sparkle',
    note: 'Clean lowercase grotesk; sparkle replaces the i-dot for a hint of warmth. Reads modern and minimal.',
    Component: LogoSansSparkle },
  { id: 'stamp', name: 'Circle Stamp Monogram',
    note: 'Personal-seal direction — soft badge with serif R inside, descriptor set in spaced caps. Great for avatars & favicons.',
    Component: LogoStamp },
  { id: 'signature', name: 'Hand-drawn Signature',
    note: 'Raji as a signature mark. Most intimate — useful as a secondary lockup or sign-off, alongside a primary wordmark.',
    Component: LogoSignature },
  { id: 'sun-mark', name: 'Sun Mark + Caps',
    note: 'Abstract sun/arc icon paired with spaced caps. Warm but architectural; the only option with a true icon that works standalone.',
    Component: LogoSunMark },
  { id: 'stacked', name: 'Editorial Lockup',
    note: 'Stacked italic wordmark over a hairline rule + role descriptors. Reads like a magazine masthead — strong on a cover/hero.',
    Component: LogoStacked },
  { id: 'boxed', name: 'Boxed Name Plate',
    note: 'Caps wordmark inside a framed box with "est." tab. Architectural and confident — works well on stationery & email signatures.',
    Component: LogoBoxed },
  { id: 'floral', name: 'Botanical Mark + Wordmark',
    note: 'Small five-petal bloom paired with the italic wordmark. Soft and organic without being twee.',
    Component: LogoFloral },
  { id: 'underline', name: 'Underline Swoosh',
    note: 'Wordmark + a hand-drawn underline arrow flourish. Personal, expressive — useful as a social profile avatar lockup.',
    Component: LogoUnderline },
  { id: 'vertical', name: 'Vertical Initials',
    note: 'R / A / J / I stacked next to descriptors. Spine/sidebar treatment — magazine-coded, perfect for a vertical nav.',
    Component: LogoVertical },
  { id: 'ampersand', name: 'Raji & Co.',
    note: 'Pair lockup with a focal italic ampersand. Reads as "a studio" rather than a personal brand — use if you want to scale beyond solo.',
    Component: LogoAmpersand },
  { id: 'chip', name: 'Reversed Chip',
    note: 'Wordmark reversed out of a dark pill with a date tag. Bold contrast — works as a CTA, button, or favicon.',
    Component: LogoChip },
];

Object.assign(window, {
  LogoSerifItalic, LogoSansSparkle, LogoStamp,
  LogoSignature, LogoSunMark, LogoStacked,
  LogoBoxed, LogoFloral, LogoUnderline,
  LogoVertical, LogoAmpersand, LogoChip,
});
