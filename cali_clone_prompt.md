# MASTER PROMPT — CALI WEBSITE STRUCTURAL CLONE (Unit-Level)

> **Reference URL:** https://cali-website-for-service-providers.webflow.io/
> **Goal:** Recreate the EXACT same structure, section-by-section, unit-by-unit, with scroll behavior, marquee animations, asymmetric grids, and editorial feminine layout. **Brand guidelines (colors, fonts, copy, images) will be supplied separately — do NOT pick your own.**
> **Output:** Single-page responsive site (HTML + CSS + minimal JS for animations). Build it smooth, no janky scroll, no broken responsive.

---

## 0. GLOBAL RULES (read first, apply everywhere)

1. **Layout philosophy** — Editorial magazine grid. Heavy use of asymmetric two-column splits, large image blocks adjacent to small text blocks, generous whitespace.
2. **Vertical rhythm** — Each section ≥ 100vh on desktop OR has clear breathing room (min 120px top/bottom padding). Sections never touch.
3. **Typography hierarchy** — H1 = oversized serif display (≈80–140px desktop), H2 = serif display (≈48–80px), body = small clean sans (14–16px), eyebrow/label = uppercase tracked sans (10–12px, letter-spacing 0.2em).
4. **Color discipline** — Wait for brand guideline. Until then use placeholders: cream/off-white BG, charcoal text, one accent.
5. **Image treatment** — Portrait crops dominate. Some images are full-bleed (edge-to-edge), some are contained inside a column. Match the reference EXACTLY per section.
6. **Animations** — Subtle. Fade-up on scroll for text. Parallax on hero video. Continuous horizontal marquee for logo strip and "Plan like a boss" / "Daily Planner" text bands. No bouncy easing, no spinning.
7. **Cursor** — Optional custom cursor (small circle) on desktop.
8. **Cart** — Functional cart drawer that slides from right (placeholder if no real store).
9. **Smoothness** — Use `Lenis` or `locomotive-scroll` for buttery-smooth scroll. `transform` + `opacity` only for animations (no layout-shifting properties).
10. **Responsive** — Desktop (≥1200px), Tablet (768–1199px), Mobile (≤767px). On mobile, asymmetric splits collapse to stacked single columns; marquees keep running; nav becomes hamburger.

---

## 1. NAVIGATION BAR (Sticky, top of page)

### Structure
- **Position:** Fixed top, full width, transparent over hero, gains solid BG (cream/white with subtle shadow) after 80px scroll.
- **Height:** 80px desktop, 64px mobile.
- **Grid:** 3-column flex — `[LEFT: logo] [CENTER: primary nav] [RIGHT: secondary CTAs]`.

### Left block
- Logo image (PNG, supplied by brand guide). Click → home.
- Logo height ≈ 36px.

### Center block (primary nav links, lowercase)
- `home` | `about` | `program` | `Podcast` | `Blog` | `Success Stories`
- Spacing: 32px between items.
- Font: small uppercase or lowercase sans, tracked.
- Hover: underline slides in from left (transform scaleX).

### Right block
- `Shop` link
- `Contact` link
- `IG links` link
- `Cart (0)` — opens slide-out cart drawer from right side.

### Cart drawer (slides in from right)
- Width: 420px desktop, 100vw mobile.
- Heading: "Your Cart"
- Empty state: "No items found."
- Subtotal row + "Continue to Checkout" button (filled, dark).
- "Pay with browser" text below button.
- Close (X) at top-right of drawer.
- Backdrop: dark 40% overlay, click to close.

### Mobile
- Hamburger icon right side → opens full-screen overlay menu with same links stacked, large serif text.

---

## 2. HERO SECTION

### Layout
- **Full viewport height (100vh).**
- **Two-zone composition:**
  - **LEFT zone (≈55% width):** Text block, vertically centered, left padding ≈ 8vw.
  - **RIGHT zone (≈45% width):** Auto-playing looping video, full-height, object-fit: cover.

### Left zone content (top to bottom)
1. **Eyebrow:** "Welcome to Cali" — small uppercase tracked, italic-ish serif accent allowed.
2. **H1 display:** "Website for service providers & coaches"
   - Massive serif, mixed-case, line-height 0.95, can wrap onto 3 lines.
   - Font-size: clamp(56px, 9vw, 140px).
3. **No CTA in hero left** (CTA appears in next section).

### Right zone
- Background video file (MP4, muted, autoplay, loop, playsinline).
- Subtle dark gradient overlay (0 → 20% black at bottom) for legibility if any text overlays it.
- No video controls visible.

### Scroll cue
- Small "scroll" text or thin vertical line animating downward at bottom-center.

### Mobile
- Stack vertically: video on top (60vh), text below (40vh) with reduced H1 size (clamp 40px–64px).

---

## 3. "HEY, I AM CALI" INTRO SECTION

### Layout
- **Two-column split, 50/50.**
- **LEFT:** Large portrait image (full-bleed to left edge, top to bottom of section).
- **RIGHT:** Text block, vertically centered, padded.

### Right column content (top to bottom)
1. **Eyebrow:** "Hey, I am Cali" — uppercase tracked sans.
2. **H2 serif display:** "Hey, I am Cali" (yes, repeated as the main heading — script/italic feel).
3. **Paragraph (body copy):** 3–4 lines describing her work — soulful/feminine tone placeholder.
4. **CTA button:** "discovery call"
   - Style: outlined or filled pill, uppercase tracked, small.
   - On hover: invert colors (dark↔light).

### Mobile
- Image on top (full-width, 60vh), text below (auto height with 40px padding).

---

## 4. "MY CLIENTS FEATURED IN" — LOGO MARQUEE

### Structure
- Full-width band, BG = cream/off-white or contrasting tone.
- Height: ≈ 160px.
- **Eyebrow text above marquee:** "my clients featured in" — small uppercase tracked, centered.
- **Marquee:** Horizontal infinite scroll of brand logos (CNN, Vogue, Elle, Forbes — repeating). Speed: ~30s per loop. Pauses on hover.
- Logos in grayscale, height ≈ 40px, gap ≈ 100px.
- Use CSS `@keyframes` with `transform: translateX(-50%)` on a doubled list.

---

## 5. "WELCOME TO CALI WORLD" — TRANSITION BAND

### Structure
- Single full-width band, short height (≈ 120px), background neutral.
- Centered single line of text: "welcome to cali world, in the next couple of weeks we are going to transform your business and bring it to the next level"
- Font: medium serif italic OR small uppercase tracked depending on brand.
- Max-width 900px, centered.

---

## 6. "I AM A BUSINESS COACH" — TWO-COLUMN INTRO #2

### Layout
- **Two-column, 60/40 split (text LEFT, video RIGHT)** — opposite of section 3 for visual rhythm.
- LEFT padding: 8vw.

### Left column
1. Eyebrow: "Hey, I am Cali"
2. H3: "I am a business coach, leader, podcaster and your biggest cheerleader" — large serif, 3-line wrap.
3. Body paragraph: 4–6 lines.
4. CTA button: "I am ready" — filled dark pill.

### Right column
- Looping MP4 video, portrait orientation, contained inside column with small border-radius (or none — depends on brand).
- Height: ≈ 70vh.

### Mobile: stack, video first, text second.

---

## 7. "MISSION & VALUES" — NUMBERED TWO-BLOCK SECTION

### Layout
- **Two-column grid, 50/50.**
- Each column has:
  - Large number ("1" and "2") as oversized serif display (≈ 180px, very light weight or outline).
  - Sub-eyebrow: "mission & goals" / "values & believes" — uppercase tracked.
  - Paragraph (4–6 lines).
  - "more about me" link (only under column 1).
- Vertical divider line between the two columns (1px, muted).
- Background includes two supporting images positioned absolutely — one top-left, one bottom-right — creating diagonal balance.

### Image positioning
- Image 1: small portrait, top-left of section, overlapping into column 1.
- Image 2: small portrait, bottom-right, overlapping into column 2.
- Both have z-index above background but below text.

### Mobile
- Single column, numbers shrink to 100px, images become inline above their respective text blocks.

---

## 8. "SERVICES / COURSES / MASTER CLASSES" — 3-OPTION ASYMMETRIC GRID

### Layout
- **3 horizontal blocks, each split into image + text.**
- Each block is staggered vertically (offset top values) to create editorial zig-zag.

### Block 1 — "option one / services"
- LEFT: Image (portrait, mid-size).
- RIGHT: H3 "services" + label "option one" + 2-line description + "learn more" link.

### Block 2 — "option two / Courses"
- LEFT: H3 "Courses" + label "option two" + description + "learn more" link.
- RIGHT: Image (different aspect, slightly smaller).
- (Reverse layout from block 1.)

### Block 3 — "option three / Master Classes"
- LEFT: Image.
- RIGHT: H3 "Master Classes" + label "option three" + description + "learn more" link.

### Spacing
- Each block ≈ 60vh.
- Vertical gap between blocks: 120px.
- Apply subtle fade-up on scroll for each block.

---

## 9. "CALI ACADEMY — LEARN WITH ME" — FEATURE BLOCK

### Layout
- **Full-width section with overlapping image collage.**
- Centered text column (max-width 700px).
- Two portrait images flanking text: one absolutely positioned top-left (smaller), one bottom-right (larger).

### Content (centered text)
1. Eyebrow: "cali academy"
2. H2 serif: "Learn With Me"
3. Body paragraph: 5–6 lines.
4. CTA: "details" button.

### Mobile
- Images move above and below text in normal flow.

---

## 10. "CALI SHOP — MY FAVS" — MIRROR OF SECTION 9

### Layout
- Same construction as Cali Academy but mirrored (images on opposite sides).
- Eyebrow: "cali shop"
- H2: "My Favs"
- Body paragraph.
- CTA: "details"

---

## 11. "STUDENTS / BUSINESSES / SUCCESS STORIES" — 3-COLUMN STAT BLOCK

### Layout
- **Three equal columns, 33/33/33.**
- Background: solid neutral or subtle texture.
- Each column:
  1. Large H2 number + label, e.g. "1500+ amazing Students"
  2. Body paragraph (2–3 lines).
  3. "learn more" link.
- Thin vertical dividers between columns.
- Padding 120px top/bottom.

### Mobile
- Stacks vertically. Dividers become horizontal.

---

## 12. "SIGNATURE HIGH TICKET SALES FUNNEL" — FEATURED PROGRAM BLOCK

### Layout
- **Two-column 50/50 with rotating/scrolling badge accent.**
- LEFT: Full-height looping MP4 video.
- RIGHT: Text block:
  1. Rotating circular badge (SVG, "learn more · new course for designers · grow your web design business · new" curved around a circle) — slowly rotates 360°.
  2. Eyebrow: "waitlist open"
  3. H2 serif: "Signature High Ticket Sales funnel system"
  4. Body paragraph.
  5. CTA: "join waitlist"

### Rotating badge spec
- 140px diameter SVG circle.
- Text path follows circle.
- CSS `@keyframes rotate` 20s linear infinite.

---

## 13. "WELCOME TO CALI" — RE-INTRO / TAGLINE BLOCK

### Layout
- Short centered text block (max-width 800px), padded ~ 80px top/bottom.
- H2 serif: "Welcome to Cali"
- One-line italic tagline: "inspired creative and educator, with an eye for subtle sophistication and aspiration, creating magnetic projects for your business"

---

## 14. "SUCCESS STORY" — CLIENT STORY SECTION (with video)

### Layout
- **Asymmetric 3-element composition:**
  - LEFT: Vertical portrait image.
  - CENTER: Smaller secondary image overlapping bottom-right of left image.
  - RIGHT: Looping MP4 video block + text block below it.

### Right text block
- Eyebrow: "client's success story"
- Body paragraph (5–6 lines).
- CTA: "more stories"

### "Success Story" label
- Appears twice in this area — once as a small uppercase tracked label above the image collage on the left, again as a heading nearby. Match reference exactly.

---

## 15. "PRESENT YOURSELF AND YOUR BUSINESS" — TEXT-HEAVY BLOCK

### Layout
- Two-column 60/40: text LEFT, single image RIGHT.
- LEFT:
  - Eyebrow: "Present yourself and your business"
  - Long body paragraph (6–8 lines).
  - CTA: "more stories"
- RIGHT: Vertical portrait image, full column height.

---

## 16. "PODCAST — LEARN WITH ME" — HORIZONTAL SCROLLING CARDS

### Layout
- Full-width section.
- Top: small label image (podcast cover thumbnail) + eyebrow "podcast" + H2 "Learn With Me" + 1-line subtitle.
- Below: **horizontal scroll row of podcast episode cards.**

### Each card
- 320px wide.
- Top: cover image (square or 4:5).
- Below image: small label "its all about intention" (eyebrow).
- Episode title: "Business vs life Balance" / "how to make 10 high ticket sales in a month" (alternating).
- Cards repeat (loop visually, scrollable horizontally).

### Scroll behavior
- Native horizontal scroll on mobile.
- On desktop: drag-to-scroll OR continuous slow auto-scroll (marquee-style) — match reference (it auto-scrolls).
- Gap between cards: 24px.

### Bottom of section
- Centered CTA: "all episodes" link.

---

## 17. "CLIENT LOVE" — TESTIMONIAL BLOCK

### Layout
- **Asymmetric two-column.**
- LEFT: Large portrait image.
- RIGHT: Testimonial text:
  - Eyebrow: "Client Love"
  - Long quote/body paragraph (6–8 lines).
  - Author label: "business owner" (small italic).

---

## 18. "PLAN LIKE A BOSS" — RUNNING TEXT MARQUEE BAND

### Structure
- Full-width band.
- Single line of repeating text: "/ Plan like a boss / Plan like a boss / Plan like a boss /" (separator is forward slash with space).
- Massive serif font (≈ 80–120px).
- Continuous horizontal scroll, ~25s loop.
- Use doubled HTML for seamless loop.
- BG: contrasting tone (e.g., dark text on cream).

---

## 19. "DAILY PLANNER" — PRODUCT FEATURE BLOCK

### Layout
- **Two-column 50/50.**
- LEFT: Large portrait product/lifestyle image.
- RIGHT: Text:
  - Eyebrow: "Plan like a boss!"
  - H2 serif: "Daily Planner"
  - Body paragraph (5–6 lines).
  - CTA: "start planning" filled pill.

---

## 20. "DAILY PLANNER" — SECOND MARQUEE BAND

### Structure
- Identical mechanics to section 18.
- Text: "/ daily planner / daily planner / daily planner /"
- Different background tone for visual variation.

---

## 21. "DAILY PLANNER EXPANDED" — LONG-FORM DESCRIPTION

### Layout
- **Centered single-column text block** (max-width 720px).
- Eyebrow: "its all about intention"
- H2: "Daily Planner"
- Paragraph 1 (4–5 lines).
- Paragraph 2 (3–4 lines).
- CTA: "start planning" button.
- Below text: two flanking portrait images (left and right of the text column, absolutely positioned, partially behind text).

---

## 22. "CALI BLOG" — BLOG PREVIEW SECTION

### Layout
- **Two-column section.**
- LEFT (40%): Heading block:
  - Eyebrow: "welcome"
  - H2 serif: "cali blog"
  - Subheading H3: "welcome to the blog you actually will love to read!"
  - Body paragraph.
  - CTA: "all blogposts"
- RIGHT (60%): **Vertical list of 3 blog post links.**
  - Each row: blog title (medium serif, 2-line max) + "read more" arrow.
  - Thin horizontal divider between each row.
  - Hover: row slides slightly right, arrow moves further right.

---

## 23. "SNAG MY FREEBIE — 10 HIGH-TICKET SALES" — EMAIL CAPTURE / LEAD MAGNET

### Layout
- **Two-column 50/50.**
- LEFT: Large portrait image.
- RIGHT: Form block:
  - Eyebrow: "freebie"
  - Small label: "Get it Now"
  - H2: "snag my freebie!"
  - Sub-H3: "10 high-ticket sales in a month"
  - Body paragraph (3–4 lines).
  - **Email input field** (full-width, underline-only style — no boxed border).
  - Submit button: "Get it Now" filled dark pill.
  - Success message hidden by default: "Thank you! Your Freebie is under the link"
  - Error message hidden by default: "Oops! Something went wrong while submitting the form."
  - Fine print: "By subscribing you agree to our Privacy Policy. You can unsubscribe at any time."

---

## 24. FOOTER

### Layout
- Multi-row dark-on-light footer.
- **Top row:** Logo (large, centered or left-aligned).
- **Middle row — 4-column grid:**

  **Col 1: all Pages**
  - Home / about / Program / Podcast / blog / single blog post

  **Col 2: all Pages (continued)**
  - Success stories / shop / single product / Instagram links / contact

  **Col 3: Elements**
  - Multipurpose Elements / top sections / forms / components

  **Col 4: service pages**
  - coming soon / privacy policy / search results / faq / 404

- **Sub-row: about**
  - getting started / Styleguide / Licensing

- **Social icons row:** Instagram, Spotify, LinkedIn, Facebook (SVGs supplied via brand guide).

- **Image grid row:** 6 small thumbnail images (Instagram feed style) in a horizontal row, each ~120px square.
  - Above: "follow me" link.

- **Newsletter mini-block:**
  - "By subscribing you agree to our Privacy Policy. You can unsubscribe at any time."
  - Success / error messages (hidden).

- **Social text links row:** "follow me" + Facebook / Twitter / Instagram (text links).

- **Bottom bar:**
  - Small logo left.
  - Copyright center: "© Cali | Webflow website for coaches and service providers"
  - "crafted by [your studio]" right.

- **Cookie consent strip (fixed bottom or one-time):**
  - Text: "By using this website you agree to our Privacy and Cookie Policy"
  - "Got It" button.

- **Top-right floating button (sticky throughout site):**
  - "Purchase Template" button (filled, small, sticks to bottom-right corner of viewport).

---

## 25. SCROLL & MOTION BEHAVIOR (apply globally)

1. **Smooth scroll:** Implement Lenis (`lenis.js`) with `duration: 1.2`, `easing: easeOutExpo`.
2. **Fade-up on enter viewport:** All text blocks fade from `opacity:0 + translateY(40px)` to `opacity:1 + translateY(0)` over 800ms when 20% in view. Use IntersectionObserver.
3. **Image reveal:** Images use a subtle scale (`scale: 1.05 → 1`) over 1000ms on enter.
4. **Marquees:** CSS-only infinite scroll using `@keyframes` on a doubled child container.
5. **Rotating badge (section 12):** `transform: rotate(360deg)` over 20s linear infinite.
6. **Parallax:** Hero video gets light parallax (translateY based on scroll, max 50px).
7. **Cart drawer:** transition `transform: translateX(100%) → 0` over 400ms ease-out.
8. **Cursor (optional):** Small (12px) circle following cursor, scales to 36px on hoverable elements.

---

## 26. RESPONSIVE BREAKPOINTS

- **Desktop:** ≥ 1200px — full asymmetric layouts as described.
- **Tablet:** 768–1199px — keep most two-column splits but reduce padding; allow some sections to stack.
- **Mobile:** ≤ 767px — every two-column split becomes single column stacked. Hero text shrinks. Marquees keep running but font sizes drop ~40%. Footer columns stack into accordion or single column.

---

## 27. TECH STACK (recommended)

- HTML5 semantic structure (`<header>`, `<section>`, `<article>`, `<footer>`).
- CSS with custom properties for theme tokens (colors, fonts, spacing) → easy to plug brand guide into.
- Vanilla JS for: smooth scroll, IntersectionObserver animations, marquee duplication, cart drawer, nav scroll state.
- No framework required, but React/Next.js acceptable if preferred. If React: one component per numbered section above.

---

## 28. BRAND GUIDE PLACEHOLDERS (replace once supplied)

Define these CSS custom properties at `:root`. **Wait for brand guide values from user. Do NOT invent colors or fonts.**

```css
:root {
  --color-bg:        /* cream / off-white from brand guide */;
  --color-text:      /* charcoal / deep neutral */;
  --color-accent:    /* primary accent */;
  --color-muted:     /* dividers, fine print */;
  --color-inverse:   /* button text on dark */;

  --font-display:    /* serif display font */;
  --font-body:       /* sans body font */;
  --font-eyebrow:    /* tracked uppercase sans */;

  --space-section-y: 120px;
  --space-gutter:    8vw;

  --easing:          cubic-bezier(0.16, 1, 0.3, 1);
}
```

All section copy, all imagery, and all logos to be replaced with assets from the brand guide.

---

## 29. DELIVERY CHECKLIST (verify before handoff)

- [ ] All 24 sections present in correct order.
- [ ] Hero video autoplays muted on load.
- [ ] Logo marquee infinite loop smooth.
- [ ] All 3 marquee text bands ("Plan like a boss", "Daily Planner", logo strip) animate continuously without seam.
- [ ] Rotating circular badge in section 12 rotates.
- [ ] Podcast cards horizontally scrollable.
- [ ] Blog list rows have hover slide effect.
- [ ] Cart drawer opens/closes smoothly from right.
- [ ] Mobile nav hamburger opens full-screen overlay.
- [ ] Smooth scroll active site-wide (Lenis).
- [ ] All images use lazy loading except hero.
- [ ] All videos: `muted autoplay loop playsinline`.
- [ ] Forms have success + error states wired (even if mock).
- [ ] Cookie consent strip appears once, dismissible.
- [ ] "Purchase Template" floating CTA visible on all sections.
- [ ] Lighthouse: Performance ≥ 85, Accessibility ≥ 95.

---

## 30. WHAT NOT TO DO

- Do NOT use generic Bootstrap/Tailwind-default look. This is editorial, custom, feminine.
- Do NOT center-align everything — the reference relies on left-alignment + asymmetric grids.
- Do NOT use rounded cards everywhere — images are mostly sharp-edged rectangles or very subtle radius.
- Do NOT add gradients unless brand guide specifies.
- Do NOT add hero overlay text on video (text sits beside the video, not over it).
- Do NOT skip the marquee bands — they are core to the rhythm of the page.
- Do NOT invent copy where the reference uses lorem ipsum — leave the lorem and let the user replace it.

---

**END OF PROMPT. Await brand guideline file (colors, fonts, logo, copy, imagery) before starting build.**
