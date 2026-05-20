# MASTER PROMPT — CALI HOME PAGE BUILD
### Next.js 14 (App Router) + React 18 + Tailwind + GSAP · Home Page Only · 3 Viewports · Self-Generated Imagery

> **Reference:** https://cali-website-for-service-providers.webflow.io/
> **Scope:** Build the HOME PAGE only. Do not build /about, /services, /podcast, /blog, /success-stories, /shop, /contact, /instagram-links yet. Those will be assigned later. Build the home page so well that everything else can plug into the same design system.
>
> **Stack — non-negotiable:**
> - **Next.js 14 (App Router)** with TypeScript
> - **React 18**
> - **Tailwind CSS** for layout + utility classes
> - **GSAP 3.12+** with ScrollTrigger, ScrollSmoother, ScrollToPlugin, Observer, SplitText, DrawSVGPlugin, MotionPathPlugin — use the specific plugin per use case, listed in §C
> - **Framer Motion**: do NOT use it. GSAP only.
> - **Lenis**: do NOT use it. GSAP ScrollSmoother handles smooth scroll.
> - **Node 20+, npm or pnpm**
>
> **Output deliverable:** A working Next.js project. `npm run dev` boots a clean home page at `localhost:3000`. All 24 home-page sections present, responsive at 3 viewports, all animations wired with GSAP, all images either generated or placeholdered with the prompts inside this doc.
>
> **Read order:** §0 Global Rules → §A Image Generation → §B Responsive → §C GSAP Plugin Assignments → §1–§24 Sections → §D QA → §E CSS Tokens → §F Anti-patterns → §G Project Structure.

---

# §0. ABSOLUTE RULES (read first, never violate)

1. **Stack must be Next.js 14 App Router + React 18 + Tailwind + GSAP.** No other animation library. No Framer Motion. No Lenis. No CSS-only marquees (GSAP drives all motion).
2. **Build the HOME PAGE only** in this pass. Other routes get stubbed as empty Next.js page files but not built.
3. **Do NOT pick colors, fonts, or final copy on your own** — those come from the brand guide supplied separately. Use placeholder tokens in §E until brand guide arrives.
4. **Do NOT skip any of the 24 sections.** They must render in the documented order on `/` (home).
5. **Do NOT skip imagery.** Every image slot has an AI generation prompt — generate the image and place it at the documented file path. Use Midjourney, DALL·E, SDXL, or FLUX.
6. **Do NOT use any GSAP plugin outside §C.** That table is the contract between intent and implementation. If a section's animation maps to ScrollTrigger + SplitText, use exactly those — not "whatever feels right."
7. **Do NOT skip responsive blocks.** Each section has Desktop / Tablet / Mobile rules. Build all three.
8. **All GSAP code lives in `/lib/gsap.ts`** (plugin registration) and one hook per animation pattern in `/hooks/` (e.g. `useFadeUp.ts`, `useMarquee.ts`, `useRotatingBadge.ts`). Sections call hooks — never inline GSAP into a section component.
9. **All GSAP code runs inside `useGSAP()` hook** from `@gsap/react` to handle React 18 strict mode + cleanup automatically.

---

# §A. IMAGE GENERATION — UNIVERSAL RULES

You are responsible for generating EVERY image referenced. Use these rules for visual consistency.

## A.1 Global aesthetic suffix (append to every image prompt)

```
, soft natural daylight, warm neutral color palette, cream and beige tones with muted blush and sage accents, film grain texture, shot on 35mm Portra 400, shallow depth of field, editorial fashion photography, minimal feminine aesthetic, soft skin tones, no harsh shadows, no oversaturation, no text, no logos, no watermarks
```

## A.2 Subject rules

- Models: female, age 25–40, diverse ethnicities, natural makeup, relaxed candid expressions.
- Wardrobe: linen, silk, knit, neutral palette (cream, oat, taupe, sand, soft white, dusty rose).
- Settings: minimalist interiors, soft window light, neutral studio backdrops, natural greenery, sunlit cafés, beach at golden hour.
- NO branded clothing, NO logos, NO crowd scenes, NO direct camera stare in lifestyle shots.

## A.3 Aspect ratios

| Slot type | Aspect | Notes |
|---|---|---|
| Hero video poster | 9:16 portrait | will be replaced by MP4 but needs poster frame |
| Section portrait (large) | 3:4 portrait | dominant images |
| Section portrait (small) | 2:3 portrait | secondary/overlap images |
| Product/planner image | 4:5 | flatlay or hand-held |
| Press wordmark | SVG monochrome | DO NOT use real brands — generate generic: JOURNAL, GAZETTE, EDITION, REVIEW, TRIBUNE |
| Footer thumb grid | 1:1 square | 6 images, Instagram-style |
| Podcast cover | 1:1 square | feminine vinyl/cassette aesthetic |

## A.4 File paths

```
/public/images/sec-{N}/{slot}.jpg
/public/videos/sec-{N}/{slot}.mp4
/public/svg/{name}.svg
```

In Next.js use `<Image>` from `next/image` for all images. Set `priority` only on hero. Use `fill` + parent `relative` for portrait fills. Specify `sizes` for responsive.

## A.5 Video generation

Generate each video clip with Runway/Pika/Sora using the prompts inside §1-24. 8–15 second loop, 9:16 portrait, no audio. Encode MP4 H.264, max 4MB. Tag `muted autoplay loop playsinline preload="metadata"` (or `auto` for hero).

---

# §B. RESPONSIVE — THREE VIEWPORTS

Tailwind config breakpoints (override in `tailwind.config.ts`):

```ts
screens: {
  'mobile':  { 'max': '767px' },     // ≤767
  'tablet':  { 'min': '768px', 'max': '1199px' },
  'desktop': { 'min': '1200px' },
  // Tailwind defaults retained for sm/md/lg/xl/2xl utility access
}
```

## B.1 Container & gutters

| Breakpoint | Max-width | Side padding | Base font |
|---|---|---|---|
| Desktop ≥1200 | 1440px | 80px | 16px |
| Tablet 768–1199 | 100% fluid | 48px | 15px |
| Mobile ≤767 | 100% fluid | 24px | 14px |

## B.2 Column collapse rules (default)

- 50/50 → 100% stacked on mobile, 50/50 retained on tablet.
- 60/40 → 100% stacked on mobile, 55/45 on tablet.
- 3-column grids → stay 3 on tablet, 1-column on mobile.
- Absolute-positioned overlap images on desktop → become inline normal-flow on mobile.

## B.3 Type scale

| Token | Desktop | Tablet | Mobile |
|---|---|---|---|
| H1-display | clamp(80px, 9vw, 140px) | 64px | 44px |
| H2-display | clamp(56px, 6vw, 88px) | 48px | 36px |
| H3 | 32px | 28px | 24px |
| Body-lg | 18px | 17px | 16px |
| Body | 16px | 15px | 14px |
| Eyebrow | 12px tracked 0.2em | 11px | 10px |
| Marquee text | 120px | 80px | 56px |

## B.4 Mobile rules

- Nav becomes hamburger → full-screen overlay (right-side slide).
- All marquees keep running.
- Floating "Purchase Template" CTA shrinks to 44px square icon.
- Cart drawer becomes 100vw.
- Cookie consent strip becomes a bottom sheet.

## B.5 Tablet rules

- Side gutters 48px.
- Hero H1 caps at 64px.
- Footer columns 4 → 2x2 grid.

---

# §C. GSAP PLUGIN ASSIGNMENTS (the contract — follow exactly)

**Plugin registration** — done once in `/lib/gsap.ts`:

```ts
'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin,
    Observer,
    SplitText,
    DrawSVGPlugin,
    MotionPathPlugin
  );
}
export { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin, Observer, SplitText, DrawSVGPlugin, MotionPathPlugin };
```

**Use `useGSAP` hook from `@gsap/react`** in every component that animates — handles cleanup on unmount.

## C.1 Plugin → section map (do not deviate)

| Section | Animation intent | GSAP plugin(s) | Hook to write |
|---|---|---|---|
| Global (App) | Smooth scroll site-wide, fixed nav respect | **ScrollSmoother** | `/hooks/useScrollSmoother.ts` (init once in `app/layout.tsx` client wrapper) |
| Global | Smooth anchor jumps (e.g. "scroll to top") | **ScrollToPlugin** | `/hooks/useScrollTo.ts` |
| §1 Nav | Background appears on scroll past 80px | **ScrollTrigger** | `/hooks/useNavScroll.ts` |
| §1 Nav | Mobile menu slide-in stagger | **gsap.timeline** (no plugin) | `/hooks/useMobileNav.ts` |
| §1 Cart | Drawer slide + backdrop fade | **gsap.timeline** | `/hooks/useCartDrawer.ts` |
| §2 Hero | H1 character-level reveal | **SplitText** + **gsap.from** | `/hooks/useHeroIntro.ts` |
| §2 Hero | Video parallax on scroll | **ScrollTrigger** + `y` tween | reuse `useParallax.ts` |
| §2 Hero | Scroll cue bounce | **gsap.to** repeat infinity | inline in HeroSection |
| §3 / §6 / §15 / §17 / §19 / §23 / etc | Text fade-up on enter viewport | **ScrollTrigger** | `/hooks/useFadeUp.ts` (universal, takes ref) |
| §3 / §9 / §10 / §14 / §17 / §19 / §23 | Image scale reveal on enter | **ScrollTrigger** | `/hooks/useImageReveal.ts` |
| §4 Press logos | Infinite horizontal marquee | **gsap.to** with `x: '-50%'` + `repeat: -1` + `modifiers` | `/hooks/useMarquee.ts` |
| §7 Mission/Values | Big numeral fade-in + slight rotation | **ScrollTrigger** + **SplitText** (for label) | reuse `useFadeUp.ts` + custom |
| §8 Services | Each block fade-up sequenced | **ScrollTrigger** with stagger | reuse `useFadeUp.ts` |
| §11 Stats | Number count-up | **ScrollTrigger** + `gsap.to` on `innerText` value | `/hooks/useCountUp.ts` |
| §12 Rotating badge | Continuous 360° rotation around its center | **gsap.to** `rotation: 360, repeat: -1, duration: 22, ease: 'none'` | `/hooks/useRotatingBadge.ts` |
| §12 Rotating badge | Text on curved path | **MotionPathPlugin** (NOT for runtime; used to author the SVG curve along which text sits via `<textPath>`) | static SVG, no JS animation of path |
| §14 Success Story | Overlapping image parallax (small image moves slightly faster than large) | **ScrollTrigger** + `y` tween at different speeds | reuse `useParallax.ts` with multiplier prop |
| §16 Podcast | Auto-scrolling card row (drag-pause optional) | **gsap.to** `x: '-50%'` infinite + **Observer** (for drag-to-scroll on touch + scroll-wheel) | `/hooks/usePodcastRail.ts` |
| §18 Plan Like a Boss | Horizontal marquee | **gsap.to** + **Observer** (optional speed boost on scroll) | reuse `useMarquee.ts` |
| §20 Daily Planner | Horizontal marquee | reuse `useMarquee.ts` | — |
| §22 Blog list | Row hover slide | **gsap.to** on `mouseenter`/`mouseleave` | `/hooks/useRowHover.ts` |
| §23 Freebie | Underline draw on email focus | **DrawSVGPlugin** on a `<line>` SVG under input | `/hooks/useUnderlineDraw.ts` |
| §24 Footer | IG grid items stagger reveal | **ScrollTrigger** + `stagger` | reuse `useFadeUp.ts` |
| Cookie strip | Slide-up entry, slide-down dismiss | **gsap.timeline** | `/hooks/useCookieStrip.ts` |
| Floating CTA | Subtle pulse OR fade-in on first scroll | **ScrollTrigger** + `gsap.to` | `/hooks/useFloatingCTA.ts` |
| Custom cursor (optional) | Cursor follow + scale on hover | **gsap.quickTo** for x/y, **gsap.to** for scale | `/hooks/useCursor.ts` |

## C.2 Core animation defaults

- **Easing default:** `'power3.out'` (matches the editorial calm tone)
- **Reveal duration:** `0.8s` for text, `1.2s` for images
- **Fade-up offset:** `y: 40, opacity: 0` → `y: 0, opacity: 1`
- **Image scale-in:** `scale: 1.08` → `scale: 1` over `1.2s`
- **ScrollTrigger defaults:**
  ```ts
  ScrollTrigger.defaults({
    start: 'top 80%',
    toggleActions: 'play none none none', // play once, no reverse
  });
  ```
- **Reduce motion:**
  ```ts
  gsap.matchMedia().add('(prefers-reduced-motion: reduce)', () => {
    gsap.set('*', { clearProps: 'all' });
    // disable ScrollSmoother
  });
  ```

## C.3 ScrollSmoother setup (one-time in `app/layout.tsx` client wrapper)

```tsx
'use client';
import { useEffect } from 'react';
import { gsap, ScrollSmoother } from '@/lib/gsap';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      effects: true,
      smoothTouch: 0.1,
    });
    return () => smoother.kill();
  }, []);
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
```

Wrap `{children}` in `app/layout.tsx` with `<SmoothScroll>`.

**NOTE:** ScrollSmoother is a paid GSAP plugin (Club GreenSock). If license unavailable, fall back to no smooth scroll (native browser scroll), and still use ScrollTrigger for the reveal animations.

---

# §1–§24 — SECTIONS

> Sections §1–§24 keep the same structural specs as the previous prompt version. They are repeated here in compressed form with explicit **GSAP wiring** added. Each section ends with the GSAP hook(s) to call. Pixel values, copy, image prompts unchanged.

---

## §1 NAVIGATION

### Structure
- Fixed top, full width, z-50.
- Height: 80px desktop / 72px tablet / 64px mobile.
- Initial background: transparent. After 80px scroll: `bg-[var(--color-bg)] shadow-[0_1px_0_var(--color-divider)]`.
- Grid: `[logo | center-nav | actions]` flex space-between.

### Center nav (desktop + tablet)
`home · about · program · podcast · blog · success stories` — lowercase, font-eyebrow 13px tracked 0.15em.

### Actions
`Shop | Contact | IG links | Cart (0)`

### Mobile
Hamburger right. On tap → full-screen overlay slides in from right.

### Cart drawer
Slide from right. Width 420 / 380 / 100vw. Header "Your Cart" + X. Empty state "No items found." Footer: Subtotal, "Pay with browser.", "Continue to Checkout" pill 56px.

### GSAP wiring
- `useNavScroll()` — ScrollTrigger on `window`, when `scrollY > 80`, add class `nav-scrolled` and run `gsap.to(nav, { backgroundColor: var(--color-bg), boxShadow: ..., duration: 0.25 })`.
- `useMobileNav()` — timeline: backdrop fade 0→1 (200ms), panel translateX 100%→0 (350ms power3.out), then stagger links `y: 20, opacity: 0 → 0, 1` (50ms each).
- `useCartDrawer()` — same shape as mobile nav timeline but for cart panel.

### Images
None.

---

## §2 HERO

### Structure
- 100vh / 90vh / auto-100vh+.
- Desktop + tablet: 2-column 55/45 (text LEFT, video RIGHT).
- Mobile: video (60vh) on top, text below.

### LEFT text stack (gap 24px)
1. Eyebrow: `Welcome to Cali`
2. H1: `Website for service providers & coaches` — clamp(80, 9vw, 140px), line-height 0.95, letter-spacing -0.02em.
3. Scroll cue bottom-left: `scroll ↓` rotated -90deg, bounce.

### RIGHT video
- `/public/videos/sec-2/hero-loop.mp4` (15s loop).
- `<video autoPlay muted loop playsInline preload="auto" poster="...">`.
- object-fit cover, full zone.
- Bottom 20% gradient overlay.

### Video prompt
```
Slow cinematic close-up of a woman's hands writing in a leather journal beside a steaming ceramic mug, soft morning window light, linen sleeves, dust particles drifting in light beam, gentle breathing camera movement, no faces visible, calm minimalist desk with eucalyptus sprig, warm cream and oat tones, 15 second seamless loop, 9:16 portrait, shot on Arri Alexa, shallow depth of field, no text, no logos
```

### Poster image prompt
```
Portrait of a serene woman in her early thirties standing by a tall window, soft cream curtain billowing, holding a porcelain cup with both hands, eyes closed gently, natural daylight, linen wrap dress in oat tone, minimalist white loft interior with a single sprig of pampas grass, editorial photography style, no text [+ §A.1]
```

### GSAP wiring
- `useHeroIntro()` — on mount: SplitText H1 into chars, `gsap.from(chars, { y: 100, opacity: 0, stagger: 0.02, duration: 1, ease: 'power4.out' })`. Eyebrow + scroll cue fade in after H1 (delay 0.6).
- Scroll cue: `gsap.to('.scroll-cue', { y: 12, repeat: -1, yoyo: true, duration: 1.4, ease: 'sine.inOut' })`.
- `useParallax()` on video element with multiplier 0.2 — ScrollTrigger pin? NO. Just `y` tween based on scroll progress (max 80px).

### Responsive
Desktop: 55/45, H1 full. Tablet: 55/45, H1 64px, scroll cue 9px. Mobile: stack, H1 44px, hide scroll cue.

---

## §3 HEY I AM CALI INTRO

### Structure
- Padding 120/80/64 top-bottom.
- 2-col 50/50. LEFT: image full-bleed left edge. RIGHT: text centered.

### LEFT image
- 3:4 portrait, width 50vw, height ~80vh, object-cover.
- `/public/images/sec-3/portrait-01.jpg`

### Image prompt
```
A woman in her early thirties seated on a vintage cream linen sofa, leaning forward toward camera, soft genuine smile, hand resting on chin, wearing an oversized oatmeal knit sweater, golden hour window light from left, minimal background with single trailing plant, warm film tones, candid editorial portrait, vertical 3:4 framing, magazine cover quality [+ §A.1]
```

### RIGHT text stack (gap 28px)
1. Eyebrow italic: `Hey, I am Cali`
2. H2: `Hey, I am Cali` — clamp(56, 6vw, 88px)
3. Paragraph: `I'm passionate about helping female creatives and dreamers bring their vision to life. I offer soulful, feminine, and timeless services that helps you create the life and business you love.`
4. CTA pill: `discovery call` — outlined 56px, hover invert.

### GSAP wiring
- `useFadeUp({ ref, stagger: 0.15 })` on the right-side text children.
- `useImageReveal({ ref })` on the image — scale 1.08→1 + opacity 0→1, 1.2s.

### Responsive
Desktop/Tablet: 50/50 image full-bleed left. Mobile: stack image (60vh) on top, text below, H2 40px, button full-width.

---

## §4 PRESS LOGOS MARQUEE

### Structure
- Full-width band, 200/160/140px height.
- Padding 48/32/24.
- Background `bg-[var(--color-bg-alt)]`.

### Above marquee
Eyebrow centered: `my clients featured in` — 11px tracked 0.25em.

### Marquee
- 5 SVG wordmarks duplicated (10 total in a single track).
- Logo height 40/32/28. Gap 96/64/48.
- Continuous left scroll. Pause on hover desktop.

### Wordmarks to generate
SVG, single color (currentColor), kept in `/public/svg/`:
1. `press-1.svg` — `JOURNAL` slab serif
2. `press-2.svg` — `GAZETTE` classic serif
3. `press-3.svg` — `EDITION` sans uppercase tracked
4. `press-4.svg` — `REVIEW` italic serif
5. `press-5.svg` — `TRIBUNE` display serif

### GSAP wiring
- `useMarquee({ ref, duration: 30, direction: -1 })`:
  ```ts
  gsap.to(track, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 });
  ```
- Hover pause via `Observer.create({ target, type: 'pointer', onHover: () => tl.pause(), onHoverEnd: () => tl.play() })` OR plain `onMouseEnter` handler.

### Responsive
Desktop 30s, tablet 25s, mobile 20s. Logos 40/32/28. Gap 96/64/48.

---

## §5 TRANSITION TAGLINE BAND

### Structure
- Full-width, single centered line, max-width 900px.
- Padding 80/56/40 top-bottom.

### Copy
`welcome to cali world, in the next couple of weeks we are going to transform your business and bring it to the next level`

### Style
Serif italic, clamp(20, 2vw, 28px), line-height 1.5, text-align center.

### GSAP wiring
- `useFadeUp({ ref, duration: 1 })` — text fades up once when in viewport.

### Responsive
Mobile: 18px, padding-x 24.

---

## §6 BUSINESS COACH INTRO

### Structure
- Padding 120/80/64.
- 2-col 60/40 (text LEFT, video RIGHT — mirror of §3).

### LEFT text stack (gap 24px)
1. Eyebrow italic: `Hey, I am Cali`
2. H3: `I am a business coach, leader, podcaster and your biggest cheerleader` — serif clamp(40, 4.5vw, 64px), max-w 560.
3. Paragraph 4–6 lines, body-lg.
4. CTA filled pill 56px: `I am ready`.

### RIGHT video
- 3:4 portrait inside column, 70vh / 60vh.
- `/public/videos/sec-6/coach-loop.mp4`

### Video prompt
```
A woman in a cream linen blazer walking slowly through a sunlit modern atrium, plants on either side, soft slow-motion 60fps, looking off-camera with a warm half-smile, hair in a low bun, gentle breeze moving her hair, golden hour light flares, 12 second loop, 9:16 portrait, cinematic editorial commercial, shallow depth of field, no text, no logos
```

### GSAP wiring
- `useFadeUp()` on text stack, stagger 0.12.
- `useImageReveal()` on video element (same scale-in treatment).

### Responsive
Desktop 60/40. Tablet 55/45, H3 48px. Mobile stack, video first 60vh, H3 32px.

---

## §7 MISSION & VALUES (NUMBERED 2-BLOCK)

### Structure
- Padding 160/100/72.
- Position: relative.
- 2-col 50/50 with 1px vertical divider center.

### Column 1: `1 / mission & goals`
- Numeral `1` serif italic clamp(140, 14vw, 220px), line-height 0.8, opacity 0.85.
- Eyebrow italic: `mission & goals`
- Paragraph 5–6 lines.
- Link: `more about me →`

### Column 2: `2 / values & believes`
- Same structure with numeral `2`, no link, 3–4 line paragraph.

### Background overlap images (desktop only)
- **A:** `/public/images/sec-7/overlap-a.jpg` — `absolute top:80 left:8vw w:200 h:280 z:-1`
  Prompt: `Open leather journal with handwritten notes and a fountain pen resting on a cream linen tablecloth, soft blurred background, top-down angle, warm window light, minimal styling, vertical 2:3 framing [+ §A.1]`
- **B:** `/public/images/sec-7/overlap-b.jpg` — `absolute bottom:80 right:8vw w:220 h:300 z:-1`
  Prompt: `A small bouquet of dried pampas grass and eucalyptus in a clay vase on a wooden side table, soft morning light from window, vertical 2:3 framing, minimal feminine still life [+ §A.1]`

### GSAP wiring
- Numerals: SplitText if numeric, OR simple `gsap.from(numeral, { y: 80, opacity: 0, rotate: -3, duration: 1.2, ease: 'power4.out' })` ScrollTriggered.
- Text stack: `useFadeUp()` stagger 0.15.
- Overlap images: light parallax `useParallax({ multiplier: 0.15 })` so they drift opposite scroll direction (creates depth).

### Responsive
Tablet: 50/50 no divider, images 160x220. Mobile: 1-col stacked, numerals inline, overlap images become inline 70vh blocks.

---

## §8 SERVICES / COURSES / MASTER CLASSES (3 ZIG-ZAG)

### Structure
- Padding 160/100/72.
- 3 row-blocks vertically, gap 120/80/48.
- Each block 2-col 50/50, alternating sides.

### Block 1 — `option one / services`
IMAGE LEFT, TEXT RIGHT.
- Image: `/public/images/sec-8/services.jpg` (3:4, 70/60/50vh).
- Prompt: `A woman in soft beige loungewear seated cross-legged on the floor with a laptop, surrounded by sketchbooks, swatches, and a ceramic coffee cup, soft morning light, warm wooden floor, minimal creative studio setting, 3:4 portrait [+ §A.1]`
- Text: eyebrow `option one` 11px tracked → H3 `services` 56/44/32 → body 2-line desc → `learn more →`.

### Block 2 — `option two / Courses`
TEXT LEFT, IMAGE RIGHT (mirrored).
- Image: `/public/images/sec-8/courses.jpg`
- Prompt: `Hands of a woman writing in a planner with a marble desk surface, stack of hardcover books in cream and beige, brass desk lamp, latte in a glass mug, warm afternoon light, top-down editorial product styling, 3:4 portrait [+ §A.1]`
- Text: eyebrow `option two` → H3 `Courses` → body `As an alternative, you can emphasize who do you work with what types of businesses or people.` → `learn more →`.

### Block 3 — `option three / Master Classes`
IMAGE LEFT, TEXT RIGHT.
- Image: `/public/images/sec-8/masterclass.jpg`
- Prompt: `A small intimate workshop scene from above: 4 women's hands working on a vision board with magazine clippings, scissors, washi tape, and dried flowers, on a large cream linen sheet, soft natural light, warm tones, editorial flatlay, 3:4 portrait [+ §A.1]`
- Text: eyebrow `option three` → H3 `Master Classes` → body `You can use this section to give a short overview of your business achievements.` → `learn more →`.

### GSAP wiring
- Each block animated independently with `useFadeUp()` on its text stack and `useImageReveal()` on its image.
- Stagger between blocks via separate ScrollTriggers (each block has its own trigger).

### Responsive
Desktop/Tablet: zig-zag 50/50. Mobile: each block image-on-top + text-below, no zig-zag.

---

## §9 CALI ACADEMY — LEARN WITH ME

### Structure
- Padding 160/100/72, position relative.
- Centered text col max-w 640, text-center.
- 2 flanking abs-positioned images (desktop/tablet).

### Center text stack (gap 24)
1. Eyebrow italic: `cali academy`
2. H2: `Learn With Me` — serif italic clamp(64, 7vw, 96px).
3. Body 5–6 lines max-w 540.
4. CTA outlined pill: `details`.

### Flanking images
- **A** `/public/images/sec-9/flank-a.jpg` — abs top:80 left:6vw w:240 h:320
  Prompt: `A woman's profile silhouette in soft window light, reading a hardcover book, hair tied back loosely, neutral linen shirt, soft side lighting from left, vertical 3:4, editorial portrait, contemplative mood [+ §A.1]`
- **B** `/public/images/sec-9/flank-b.jpg` — abs bottom:80 right:6vw w:320 h:420
  Prompt: `Overhead view of a woman seated at a circular wooden table writing in a notebook, dappled sunlight through cane chair, fresh figs and a coffee in a glass cup nearby, warm Mediterranean café aesthetic, 3:4 portrait [+ §A.1]`

### GSAP wiring
- Text: `useFadeUp()` stagger 0.15.
- Flank images: `useImageReveal()` + `useParallax({ multiplier: 0.1 })`.

### Responsive
Tablet: images 180x240 + 240x320 closer to edges. Mobile: images become inline, A above text 50vh, B below text 60vh.

---

## §10 CALI SHOP — MY FAVS (mirror of §9)

### Structure
Mirror §9 — same construction, opposite corners.

### Center text
1. Eyebrow: `cali shop`
2. H2: `My Favs`
3. Body 5–6 lines.
4. CTA: `details`.

### Flanking images
- **A** top-RIGHT — `/public/images/sec-10/flank-a.jpg`
  Prompt: `Carefully arranged flatlay of feminine essentials: a silk scarf in blush pink, gold hoop earrings, a leather journal, a bottle of amber perfume, and a sprig of olive leaves on a cream marble surface, soft overhead daylight, editorial product photography, 3:4 portrait [+ §A.1]`
- **B** bottom-LEFT — `/public/images/sec-10/flank-b.jpg`
  Prompt: `A woman holding a small ceramic vase she crafted, both hands cradling it, wearing a cream apron, soft pottery studio in background blurred, warm afternoon window light, 3:4 portrait, candid lifestyle [+ §A.1]`

### GSAP wiring
Same as §9.

### Responsive
Mirror of §9 rules.

---

## §11 STATS BLOCK

### Structure
- Padding 120/80/56.
- Background `bg-[var(--color-bg-alt)]`.
- 3-col 33/33/33, vertical dividers between.

### Columns
1. H2 `1500+` serif clamp(80, 8vw, 120) → subhead `amazing Students` 24px italic → body 2–3 lines → `learn more →`.
2. H2 `50+` → `Businesses Supported` → body → link.
3. H2 `∞` → `Success Stories` → body → link.

### GSAP wiring
- `useCountUp({ ref, target: 1500, suffix: '+' })` — counts from 0 to target over 2s ease-out when in viewport.
- For column 3 (∞), no count-up; just `useFadeUp()`.
- Text stacks below numerals: `useFadeUp()` stagger 0.1, delay 0.3.

### Responsive
Desktop/Tablet 3-col with dividers. Mobile 1-col stacked, horizontal divider lines between rows.

---

## §12 SIGNATURE PROGRAM — VIDEO + ROTATING BADGE

### Structure
- Padding 120/80/64.
- 2-col 50/50. LEFT video, RIGHT text + badge.

### LEFT video
- 3:4 portrait, 80/70/60vh.
- `/public/videos/sec-12/program-loop.mp4`
- Prompt: `Smooth slow zoom into a clay-colored journal on a marble surface, fountain pen rolling slightly, golden hour light, dust particles in beam, calming pace, 10 second seamless loop, 9:16 portrait, cinematic editorial, no text`

### RIGHT stack (gap 32)
1. **Rotating badge** (top):
   - Inline SVG 160/140/120px diameter.
   - Curved text via `<textPath href="#circle-path">learn more · new course for designers · grow your web design business · new ·</textPath>`
   - Center icon: small `↗` or star.
2. Eyebrow `waitlist open`.
3. H2 `Signature High Ticket Sales funnel system` — serif clamp(48, 5.5vw, 72), max-w 540.
4. Paragraph `Get the most powerful step by step program and don't miss an exclusive early bird discount. The program is launching soon!`
5. CTA filled pill `join waitlist`.

### GSAP wiring
- `useRotatingBadge({ ref, duration: 22 })`:
  ```ts
  gsap.to(badge, { rotation: 360, duration: 22, ease: 'none', repeat: -1, transformOrigin: 'center center' });
  ```
- Video + text: `useImageReveal()` + `useFadeUp()`.

### Responsive
Desktop 50/50 full-height video. Tablet 50/50 reduced. Mobile stack video 60vh first, badge + text below.

---

## §13 WELCOME TO CALI — RE-INTRO

### Structure
- Padding 80/64/48.
- Centered, max-w 800.

### Content
- H2 `Welcome to Cali` — serif italic clamp(56, 6vw, 80).
- Sub: `inspired creative and educator, with an eye for subtle sophistication and aspiration, creating magnetic projects for your business` — serif italic 20/18/16, line-height 1.5, color muted.

### GSAP wiring
- `useFadeUp()` on H2 + sub, stagger 0.2.

---

## §14 SUCCESS STORY COLLAGE

### Structure
- Padding 160/100/72, position relative.
- 3-element collage (desktop):
  - LEFT (40%): large portrait image.
  - CENTER OVERLAP: smaller image abs bottom-right of LEFT.
  - RIGHT (50%): video + text below.

### LEFT large image
- 3:4, h 80vh, w 90% of column.
- `/public/images/sec-14/main.jpg`
- Prompt: `Editorial portrait of a confident woman in her early thirties seated on a stone bench in a sunlit Mediterranean courtyard, wearing a flowing cream linen dress, hair down, soft natural side lighting, olive trees blurred in background, hand resting on knee, candid gaze off-camera, 3:4 portrait, magazine quality [+ §A.1]`

### CENTER OVERLAP image
- abs bottom:-60 right:-40 w:280 h:360 z:2.
- `/public/images/sec-14/overlap.jpg`
- Prompt: `Top-down view of a woman's hands holding a steaming cup of herbal tea over a notebook with handwritten goals, brass pen, eucalyptus sprig, on a soft cream linen tablecloth, warm afternoon light, 3:4 portrait, candid lifestyle [+ §A.1]`

### Small label
`Success Story` italic serif 14 muted, abs top-left of left column.

### RIGHT — video + text
- Video 4:5, h 50vh — `/public/videos/sec-14/story.mp4`
  Prompt: `Slow gentle pan across a woman laughing genuinely while talking off-camera in a sunlit room, slightly out of focus, blurred warm bokeh, soft linen curtains in background, candid documentary style, 8 second loop, 9:16 portrait, cinematic, no text`
- Text stack below video (gap 20): eyebrow `client's success story` → body 5–6 lines max-w 460 → `more stories →`.

### GSAP wiring
- Large image: `useImageReveal()` + `useParallax({ multiplier: 0.1 })` (slower).
- Overlap image: `useImageReveal()` + `useParallax({ multiplier: 0.25 })` (faster, creates depth differential).
- Video + text: `useImageReveal()` + `useFadeUp()`.

### Responsive
Tablet overlap 200x260, keep collage. Mobile vertical stack: main image full-w 60vh → overlap inline 50vh → video 50vh → text.

---

## §15 PRESENT YOURSELF

### Structure
- Padding 120/80/64.
- 2-col 60/40 (text LEFT, image RIGHT).

### LEFT text (gap 24)
1. Eyebrow italic: `Present yourself and your business`
2. Paragraph 7–8 lines max-w 540 line-height 1.75:
   `We're here to give creatives the tools they need to positively impact their marketplace, to help them take their talents and ideas and make a real difference in the world. We want to help creatives make their businesses a success, and we believe that if you do what you love, you'll never work a day in your life.`
3. `more stories →`

### RIGHT image
- 3:4, ~80vh — `/public/images/sec-15/portrait.jpg`
- Prompt: `Behind-the-scenes editorial shot of a woman setting up a tripod for self-portraits in a softly-lit minimalist white studio, plants in the background, wearing a beige knit and cream wide-leg trousers, candid focused expression, 3:4 portrait [+ §A.1]`

### GSAP wiring
- `useFadeUp()` on text, `useImageReveal()` on image.

### Responsive
Desktop/Tablet 60/40. Mobile stack image 60vh top, text below.

---

## §16 PODCAST — LEARN WITH ME (HORIZONTAL SCROLL CARDS)

### Structure
- Padding 120/80/64.
- Header block (left-aligned, max-w 600) + card rail below.

### Header (gap 20)
1. Square cover image 80x80 — `/public/images/sec-16/podcast-cover.jpg`
   Prompt: `Square minimalist podcast cover artwork: vintage cassette tape laying on a cream linen background with single olive sprig, soft natural light, warm editorial product photography, 1:1 square [+ §A.1]`
2. Eyebrow `podcast`.
3. H2 `Learn With Me` clamp(56, 6vw, 80).
4. Subtitle body-lg max-w 480: `Achieve more by setting up goals in way you can monitor and check in on your progress.`

### Cards rail
- 6 cards, looping (track doubled for seamless infinite scroll).
- Card width 320/280/240, gap 32.
- Each card: 4:5 cover image → eyebrow italic `its all about intention` → title (alternating).

### Card titles (alternate)
1. `Business vs life Balance`
2. `how to make 10 high ticket sales in a month`
3. `Business vs life Balance`
4. `how to make 10 high ticket sales in a month`
5. `Business vs life Balance`
6. `how to make 10 high ticket sales in a month`

### Card cover prompts
1. `/sec-16/card-1.jpg` — `Woman recording podcast with vintage microphone, warm low light, candid laughing, 4:5 [+§A.1]`
2. `/sec-16/card-2.jpg` — `Open notebook with handwritten lists and a coffee, top-down warm light, 4:5 [+§A.1]`
3. `/sec-16/card-3.jpg` — `Hands holding a smartphone with planner app, soft pastel desk, 4:5 [+§A.1]`
4. `/sec-16/card-4.jpg` — `Woman walking by ocean at golden hour, back to camera, linen dress, 4:5 [+§A.1]`
5. `/sec-16/card-5.jpg` — `Two coffee cups and a journal on a café table, hand reaching in, 4:5 [+§A.1]`
6. `/sec-16/card-6.jpg` — `Brass scales on a marble surface, dried lavender, 4:5 [+§A.1]`

### CTA below
Centered link `all episodes →` margin-top 48.

### GSAP wiring
- `usePodcastRail({ ref, duration: 40 })`:
  ```ts
  const tween = gsap.to(track, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
  Observer.create({
    target,
    type: 'pointer,touch',
    onPress: () => tween.pause(),
    onRelease: () => tween.play(),
    onDrag: (self) => { gsap.to(track, { x: `+=${self.deltaX}`, duration: 0.1 }); },
  });
  ```
- Header text: `useFadeUp()`.

### Responsive
Desktop auto-scrolling marquee 40s. Tablet native scroll with momentum. Mobile native scroll snap (`scroll-snap-type: x mandatory`).

---

## §17 CLIENT LOVE TESTIMONIAL

### Structure
- Padding 120/80/64.
- 2-col 50/50 (image LEFT, text RIGHT, vertically centered).

### LEFT image
- 3:4, h 80vh — `/public/images/sec-17/testimonial.jpg`
- Prompt: `Close-up portrait of a woman laughing genuinely with eyes closed, hand near face, wearing a cream cashmere sweater, soft window light from left, warm pastel background, candid moment, 3:4 portrait, magazine quality [+ §A.1]`

### RIGHT text (gap 24)
1. Eyebrow italic: `Client Love`
2. Quote 6–8 lines serif italic 22px line-height 1.6 max-w 500.
3. Author: `— Sarah M., business owner` italic 13px muted.

### GSAP wiring
- `useImageReveal()` + `useFadeUp()` stagger 0.12.

### Responsive
Mobile stack image top 60vh, text below.

---

## §18 PLAN LIKE A BOSS — MARQUEE BAND #1

### Structure
- Full-width band, padding 48 top/bottom.
- Background `bg-[var(--color-bg-alt-2)]`, overflow hidden.

### Marquee
- Single doubled track.
- Text: `/ Plan like a boss / Plan like a boss / Plan like a boss / Plan like a boss /`
- Font serif display clamp(56, 9vw, 120), line-height 1.
- `/` separator with 32px margin.

### GSAP wiring
- `useMarquee({ ref, duration: 25 })`.

### Responsive
Mobile 56px font, 18s loop.

---

## §19 DAILY PLANNER FEATURE

### Structure
- Padding 120/80/64.
- 2-col 50/50. LEFT image, RIGHT text.

### LEFT image
- 3:4, h ~80vh — `/public/images/sec-19/planner.jpg`
- Prompt: `Editorial flatlay of a cream leather daily planner, opened to a weekly spread with handwritten notes, gold pen, dried flower, ceramic coffee mug, small candle, on a soft beige linen surface, warm window light from upper-left, 3:4 portrait, premium product photography [+ §A.1]`

### RIGHT text (gap 24)
1. Eyebrow italic: `Plan like a boss!`
2. H2 `Daily Planner` clamp(56, 6vw, 80).
3. Paragraph `Achieve more by setting up goals in way you can monitor and check in on your progress. My daily planner will take only 10 minutes per day to dramatically transform your day to day performance.`
4. CTA filled pill `start planning`.

### GSAP wiring
- `useImageReveal()` + `useFadeUp()`.

### Responsive
Mobile stack image top, text below.

---

## §20 DAILY PLANNER — MARQUEE BAND #2

Mirror of §18. Text: `/ daily planner / daily planner / daily planner / daily planner /`. Different BG tone. 22s loop.

### GSAP wiring
- `useMarquee({ ref, duration: 22 })`.

---

## §21 DAILY PLANNER EXPANDED

### Structure
- Padding 160/100/72, position relative.
- Centered text col max-w 720, text-align left.
- 2 flanking abs images (desktop).

### Center text stack (gap 24)
1. Eyebrow italic: `its all about intention`
2. H2 `Daily Planner` clamp(56, 6vw, 80).
3. Paragraph 1 (4–5 lines).
4. Paragraph 2 (3–4 lines).
5. CTA outlined pill `start planning`.

### Flanking images
- **A** abs top:50% left:4vw w:200 h:280 z:-1 — `/public/images/sec-21/flank-a.jpg`
  Prompt: `Single dried rose laying on a cream open notebook page, soft shadow, top-down minimal, 2:3 [+ §A.1]`
- **B** abs top:50% right:4vw w:220 h:300 z:-1 — `/public/images/sec-21/flank-b.jpg`
  Prompt: `Hand of a woman writing in a planner with a brass pen, close-up of cuff of cream sweater, soft warm light, 2:3 [+ §A.1]`

### GSAP wiring
- `useFadeUp()` text.
- Flank images: `useParallax({ multiplier: 0.15 })`.

### Responsive
Mobile: hide flank images OR inline above/below text.

---

## §22 CALI BLOG PREVIEW

### Structure
- Padding 120/80/64.
- 2-col 40/60 (heading LEFT, list RIGHT).

### LEFT heading stack (gap 20)
1. Eyebrow italic `welcome`
2. H2 `cali blog` clamp(56, 6vw, 80)
3. Sub-H3 serif 24 italic `welcome to the blog you actually will love to read!`
4. Body 4–5 lines.
5. CTA `all blogposts →`

### RIGHT blog list
- 3 rows, each: title LEFT (serif 28, 2-line max, max-w 80%) | arrow + `read more` RIGHT.
- Border-bottom 1px between rows.
- Hover: row content translateX 12, arrow translateX 20, 250ms.

### Titles
1. `Businesses are being launched every day with a unique image and story to tell`
2. `How to build a lovely relationship with your customer and your fans and followers`
3. `People buy from the person they know and trust`

### GSAP wiring
- `useFadeUp()` heading.
- `useRowHover()` on each row:
  ```ts
  el.addEventListener('mouseenter', () => gsap.to(content, { x: 12, duration: 0.25, ease: 'power2.out' }));
  el.addEventListener('mouseleave', () => gsap.to(content, { x: 0, duration: 0.25 }));
  ```

### Responsive
Desktop/Tablet 40/60. Mobile stack.

---

## §23 FREEBIE — EMAIL CAPTURE

### Structure
- Padding 120/80/64.
- 2-col 50/50. LEFT image, RIGHT form.

### LEFT image
- 3:4, ~80vh — `/public/images/sec-23/freebie.jpg`
- Prompt: `A woman in soft beige loungewear sitting on a sunlit window bench reading a printed downloadable workbook, cream curtains, plants beside her, warm afternoon light, cozy minimalist interior, 3:4 portrait, candid lifestyle [+ §A.1]`

### RIGHT form stack (gap 24)
1. Eyebrow italic `freebie`
2. Small `Get it Now` uppercase tracked 11.
3. H2 `snag my freebie!` clamp(48, 5vw, 72).
4. Sub-H3 serif 28 `10 high-ticket sales in a month`.
5. Body 3–4 lines max-w 460.
6. Email input: full-width, border:none, border-bottom 1px text, bg transparent, padding 16 0, font 16, placeholder `Your email address`. SVG underline below it for DrawSVG focus animation.
7. Submit pill 56h `Get it Now`.
8. Hidden success: `Thank you! Your Freebie is under the link →`.
9. Hidden error: `Oops! Something went wrong while submitting the form.`
10. Fine print 11px muted: `By subscribing you agree to our Privacy Policy. You can unsubscribe at any time.`

### GSAP wiring
- `useFadeUp()` + `useImageReveal()`.
- `useUnderlineDraw()`:
  ```ts
  el.addEventListener('focus', () => gsap.fromTo(svgLine, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.6, ease: 'power3.out' }));
  el.addEventListener('blur',  () => gsap.to(svgLine, { drawSVG: '0%', duration: 0.4 }));
  ```
- Form submit: prevent default, show success/error state with timeline (no real backend yet — fake delay 800ms then show success).

### Responsive
Mobile stack image top, form below; email + button stack vertically.

---

## §24 FOOTER

### Structure
- BG `bg-[var(--color-bg-alt)]`.
- Padding 120 top / 64 bottom.

### Top — Logo
Centered SVG h 80/64/48, margin-bottom 80.

### Link columns row — 4 cols
1. `all Pages` → Home / about / Program / Podcast / blog / single blog post
2. `all Pages` → Success stories / shop / single product / Instagram links / contact
3. `Elements` → Multipurpose Elements / top sections / forms / components
4. `service pages` → coming soon / privacy policy / search results / faq / 404

### Sub-row `about`
Inline gap 32: getting started / Styleguide / Licensing.

### Social icons row
4 SVG line icons (IG, SP, LN, FB), 32px, gap 24.

### IG grid
Above grid: `follow me →`. 6 squares (1:1) 120/96/56px, gap 8.
- `/public/images/sec-24/ig-1.jpg` ... `ig-6.jpg`
- Prompts:
  1. `A bouquet of dried flowers in cream wrapping, 1:1 [+§A.1]`
  2. `Woman's hands holding open book, top down, 1:1 [+§A.1]`
  3. `Latte art in white cup on marble, 1:1 [+§A.1]`
  4. `Linen-draped table with candle and journal, 1:1 [+§A.1]`
  5. `Bare feet on cream rug beside an open notebook, 1:1 [+§A.1]`
  6. `Window light through curtain with a cup on sill, 1:1 [+§A.1]`

### Newsletter mini-block
Email + submit inline. Fine print + hidden success/error.

### Social text links
Eyebrow `follow me` + `Facebook · Twitter · Instagram` separated by `·` with 16px margin.

### Bottom bar (3-col)
LEFT small logo | CENTER `© Cali | Webflow website for coaches and service providers` | RIGHT `crafted by [studio]`. All 11px muted.

### Cookie consent strip
Fixed bottom full-width 64h. Padding 24x. BG dark var(--color-text), color var(--color-bg). LEFT text, RIGHT `Got It` light-on-dark pill. Dismiss → slide-down 300ms, set localStorage.

### Floating "Purchase Template" CTA
`fixed bottom:24 right:24 z:999`. Pill 48h. Mobile shrinks to 44x44 circular icon with `↗`.

### GSAP wiring
- IG grid: `useFadeUp()` with stagger 0.08 per tile.
- Cookie strip: `useCookieStrip()` — slide-up entry timeline on mount (if not accepted), slide-down dismiss.
- Floating CTA: `useFloatingCTA()` — fade in after first scroll > 200px.

### Responsive
Desktop 4-col. Tablet 2x2. Mobile accordion (each column header tappable, expands links).

---

# §D. QA CHECKLIST

## Tech
- [ ] Next.js 14 App Router project boots `npm run dev` cleanly.
- [ ] TypeScript strict mode on.
- [ ] All GSAP plugins registered once in `/lib/gsap.ts`.
- [ ] Every animated component uses `useGSAP` from `@gsap/react`.
- [ ] No Framer Motion, no Lenis.
- [ ] ScrollSmoother wraps the app (or fallback to native scroll if no Club GreenSock license).

## Layout
- [ ] All 24 sections rendered in order on `/`.
- [ ] Hero is 100vh on desktop.
- [ ] §3 image full-bleeds to left edge.
- [ ] §7 numerals are 140–220px serif italic.
- [ ] §8 has 3 staggered zig-zag blocks.
- [ ] §9 and §10 are mirror constructions.
- [ ] §11 has 3-col with vertical dividers.
- [ ] §12 rotating badge spins continuously.
- [ ] §14 has asymmetric collage with overlap.
- [ ] §16 podcast cards scroll horizontally.
- [ ] §18 and §20 are marquee bands.

## Imagery
- [ ] Every image slot has an image at the documented path.
- [ ] All images use Next.js `<Image>`.
- [ ] All images follow §A style suffix.
- [ ] All videos `muted autoPlay loop playsInline`.
- [ ] No real brand logos in §4.

## Responsive
- [ ] Tested at 1440, 1200, 992, 768, 414, 375, 320.
- [ ] Mobile nav opens full-screen overlay.
- [ ] All 2-col splits collapse on mobile.
- [ ] Marquees keep running on mobile.

## Motion
- [ ] Marquees seamless (doubled track, xPercent -50).
- [ ] Hero H1 SplitText reveal works.
- [ ] All fade-ups fire once on enter.
- [ ] Rotating badge continuous 22s.
- [ ] Count-up runs once when stats in view.
- [ ] Reduce-motion media query disables animations.

## Forms & UX
- [ ] Freebie form shows success state on submit.
- [ ] Footer newsletter shows success.
- [ ] Cart drawer opens/closes.
- [ ] Cookie consent dismissible + persists in localStorage.
- [ ] Floating CTA visible across all sections.

## Performance
- [ ] All images lazy except hero.
- [ ] Videos preload metadata only (hero is "auto").
- [ ] Lighthouse Performance ≥ 85, Accessibility ≥ 95.

---

# §E. CSS TOKENS — paste brand guide here

Drop into `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* COLORS — replace with brand guide values */
  --color-bg:          #FAF7F2;
  --color-bg-alt:      #F1ECE4;
  --color-bg-alt-2:    #E8DFD3;
  --color-text:        #2A2A28;
  --color-text-muted:  #6E6A63;
  --color-accent:      #B5896E;
  --color-divider:     #D9D2C7;
  --color-inverse:     #FAF7F2;

  /* FONTS — replace with brand guide values (use next/font for Google Fonts) */
  --font-display:      var(--font-serif-display);
  --font-body:         var(--font-sans-body);
  --font-eyebrow:      var(--font-sans-body);

  /* SPACING */
  --section-y-desktop: 120px;
  --section-y-tablet:  80px;
  --section-y-mobile:  64px;
  --gutter-desktop:    80px;
  --gutter-tablet:     48px;
  --gutter-mobile:     24px;

  /* EASING */
  --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
}

html, body { background: var(--color-bg); color: var(--color-text); }
body { font-family: var(--font-body); }
h1, h2, h3 { font-family: var(--font-display); }
.eyebrow { font-family: var(--font-eyebrow); letter-spacing: 0.2em; text-transform: uppercase; font-size: 12px; }
```

---

# §F. ANTI-PATTERNS — never do these

1. ❌ Centering everything — the design is left-aligned & asymmetric.
2. ❌ Default Tailwind/Bootstrap look — this is editorial.
3. ❌ Generic corporate stock images.
4. ❌ Harsh shadows, gradients, neon colors.
5. ❌ Skipping marquee bands — core rhythm.
6. ❌ Text overlay on hero video.
7. ❌ Inventing colors / fonts / final copy.
8. ❌ Skipping any mobile responsive block.
9. ❌ Animating `width`, `height`, `top`, `left` — use `transform` only (`x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`).
10. ❌ Body-level horizontal scroll — only the podcast cards row gets it.
11. ❌ Using `requestAnimationFrame` for animations — use GSAP.
12. ❌ Forgetting to cleanup GSAP (always use `useGSAP` from `@gsap/react`).
13. ❌ Mixing Framer Motion + GSAP. Pick GSAP only.
14. ❌ Hard-coded pixel font sizes without responsive clamps.

---

# §G. PROJECT STRUCTURE

```
/cali-clone/
├── app/
│   ├── layout.tsx               // root layout, fonts, SmoothScroll wrapper
│   ├── page.tsx                 // HOME — renders all 24 sections in order
│   ├── globals.css              // tokens, resets, base styles
│   ├── about/page.tsx           // stub: <h1>about</h1>
│   ├── services/page.tsx        // stub
│   ├── podcast/page.tsx         // stub
│   ├── blog/page.tsx            // stub
│   ├── success-stories/page.tsx // stub
│   ├── shop/page.tsx            // stub
│   ├── contact/page.tsx         // stub
│   └── instagram-links/page.tsx // stub
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── MobileNavOverlay.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── Footer.tsx
│   │   ├── CookieStrip.tsx
│   │   ├── FloatingCTA.tsx
│   │   └── SmoothScroll.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx                 // §2
│   │   ├── HeyImCaliIntroSection.tsx        // §3
│   │   ├── PressMarqueeSection.tsx          // §4
│   │   ├── TaglineBandSection.tsx           // §5
│   │   ├── BusinessCoachIntroSection.tsx    // §6
│   │   ├── MissionValuesSection.tsx         // §7
│   │   ├── ServicesGridSection.tsx          // §8
│   │   ├── CaliAcademySection.tsx           // §9
│   │   ├── CaliShopSection.tsx              // §10
│   │   ├── StatsSection.tsx                 // §11
│   │   ├── SignatureProgramSection.tsx      // §12
│   │   ├── WelcomeRecapSection.tsx          // §13
│   │   ├── SuccessStorySection.tsx          // §14
│   │   ├── PresentYourselfSection.tsx       // §15
│   │   ├── PodcastSection.tsx               // §16
│   │   ├── ClientLoveSection.tsx            // §17
│   │   ├── PlanLikeABossMarquee.tsx         // §18
│   │   ├── DailyPlannerFeature.tsx          // §19
│   │   ├── DailyPlannerMarquee.tsx          // §20
│   │   ├── DailyPlannerExpanded.tsx         // §21
│   │   ├── BlogPreviewSection.tsx           // §22
│   │   └── FreebieSection.tsx               // §23
│   └── ui/
│       ├── Button.tsx                       // pill button (filled / outlined variants)
│       ├── EyebrowText.tsx
│       ├── RotatingBadge.tsx                // SVG with textPath + GSAP spin
│       ├── PodcastCard.tsx
│       └── BlogRow.tsx
├── hooks/
│   ├── useGSAP.ts                           // re-export from @gsap/react
│   ├── useScrollSmoother.ts
│   ├── useScrollTo.ts
│   ├── useNavScroll.ts
│   ├── useMobileNav.ts
│   ├── useCartDrawer.ts
│   ├── useHeroIntro.ts
│   ├── useFadeUp.ts                         // universal text reveal
│   ├── useImageReveal.ts                    // universal image scale-in
│   ├── useParallax.ts                       // takes multiplier prop
│   ├── useMarquee.ts                        // takes duration prop
│   ├── useRotatingBadge.ts
│   ├── useCountUp.ts
│   ├── usePodcastRail.ts
│   ├── useRowHover.ts
│   ├── useUnderlineDraw.ts
│   ├── useCookieStrip.ts
│   ├── useFloatingCTA.ts
│   └── useCursor.ts
├── lib/
│   ├── gsap.ts                              // plugin registration
│   └── utils.ts
├── public/
│   ├── images/
│   │   ├── sec-3/ ... sec-24/               // generated images per §1-24
│   ├── videos/
│   │   ├── sec-2/ sec-6/ sec-12/ sec-14/    // generated MP4s
│   └── svg/
│       ├── logo.svg
│       ├── press-1.svg ... press-5.svg
│       ├── ig.svg / sp.svg / ln.svg / fb.svg
│       └── circle-text-path.svg             // base path for rotating badge
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

## Package.json dependencies (exact)

```json
{
  "dependencies": {
    "next": "14.2.0",
    "react": "18.3.0",
    "react-dom": "18.3.0",
    "gsap": "3.12.5",
    "@gsap/react": "2.1.0"
  },
  "devDependencies": {
    "typescript": "5.4.0",
    "@types/react": "18.3.0",
    "@types/node": "20.0.0",
    "tailwindcss": "3.4.0",
    "postcss": "8.4.0",
    "autoprefixer": "10.4.0"
  }
}
```

For GSAP premium plugins (ScrollSmoother, SplitText, DrawSVGPlugin, MotionPathPlugin) — confirm Club GreenSock license. If unavailable: ScrollSmoother → native scroll; SplitText → manual char-split component; DrawSVG → CSS stroke-dasharray fallback; MotionPath → not needed at runtime (only authoring static SVG path).

## `page.tsx` shape

```tsx
import HeroSection from '@/components/sections/HeroSection';
import HeyImCaliIntroSection from '@/components/sections/HeyImCaliIntroSection';
import PressMarqueeSection from '@/components/sections/PressMarqueeSection';
import TaglineBandSection from '@/components/sections/TaglineBandSection';
import BusinessCoachIntroSection from '@/components/sections/BusinessCoachIntroSection';
import MissionValuesSection from '@/components/sections/MissionValuesSection';
import ServicesGridSection from '@/components/sections/ServicesGridSection';
import CaliAcademySection from '@/components/sections/CaliAcademySection';
import CaliShopSection from '@/components/sections/CaliShopSection';
import StatsSection from '@/components/sections/StatsSection';
import SignatureProgramSection from '@/components/sections/SignatureProgramSection';
import WelcomeRecapSection from '@/components/sections/WelcomeRecapSection';
import SuccessStorySection from '@/components/sections/SuccessStorySection';
import PresentYourselfSection from '@/components/sections/PresentYourselfSection';
import PodcastSection from '@/components/sections/PodcastSection';
import ClientLoveSection from '@/components/sections/ClientLoveSection';
import PlanLikeABossMarquee from '@/components/sections/PlanLikeABossMarquee';
import DailyPlannerFeature from '@/components/sections/DailyPlannerFeature';
import DailyPlannerMarquee from '@/components/sections/DailyPlannerMarquee';
import DailyPlannerExpanded from '@/components/sections/DailyPlannerExpanded';
import BlogPreviewSection from '@/components/sections/BlogPreviewSection';
import FreebieSection from '@/components/sections/FreebieSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HeyImCaliIntroSection />
      <PressMarqueeSection />
      <TaglineBandSection />
      <BusinessCoachIntroSection />
      <MissionValuesSection />
      <ServicesGridSection />
      <CaliAcademySection />
      <CaliShopSection />
      <StatsSection />
      <SignatureProgramSection />
      <WelcomeRecapSection />
      <SuccessStorySection />
      <PresentYourselfSection />
      <PodcastSection />
      <ClientLoveSection />
      <PlanLikeABossMarquee />
      <DailyPlannerFeature />
      <DailyPlannerMarquee />
      <DailyPlannerExpanded />
      <BlogPreviewSection />
      <FreebieSection />
    </main>
  );
}
```

`Nav`, `Footer`, `CookieStrip`, `FloatingCTA`, `CartDrawer`, `MobileNavOverlay` mount inside `app/layout.tsx`, outside `<main>`.

---

# END OF MASTER PROMPT

## Build order (do exactly this sequence)

1. **Scaffold:** `npx create-next-app@latest cali-clone --typescript --tailwind --app --src-dir=false --import-alias="@/*"`
2. **Install GSAP:** `npm i gsap @gsap/react`
3. Create `/lib/gsap.ts` with plugin registration (§C).
4. Create `globals.css` with §E tokens (placeholder values until brand guide).
5. Update `tailwind.config.ts` with §B breakpoints.
6. Build hooks in `/hooks/` (§C table).
7. Build layout components (`Nav`, `Footer`, `SmoothScroll`, `CartDrawer`, `MobileNavOverlay`, `CookieStrip`, `FloatingCTA`).
8. Build sections §2 → §23 one at a time, in order. For each:
   - Component skeleton with Tailwind layout.
   - Generate the required images and drop in `/public/images/sec-N/`.
   - Wire the hook(s) listed in the GSAP map.
   - Test all 3 viewports.
9. Run §D QA checklist.
10. Stop. Wait for brand guide to swap tokens.

---

**Before starting, confirm:**
1. Brand guide is being supplied (colors, fonts, logo, final copy) — if not, use placeholder tokens in §E.
2. Imagery will be generated using the prompts inside each section + §A style suffix.
3. Build only the home page in this pass. Other routes are stubs.
