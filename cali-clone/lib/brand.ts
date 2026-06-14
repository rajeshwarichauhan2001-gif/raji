// Client-safe brand case-study content model.
// No "fs" import — this is imported by both the server page and the
// "use client" MastMasalaPage component. Edit DEFAULT_BRAND to change
// the page, or override it later via the admin dashboard (getDoc("brand", ...)).

const BASE = "https://rajeshwarichauhan.in/wp-content/uploads";

export type BrandStat = { raw: number; suffix: string; decimals: number; label: string };
export type CalRow = { type: string; date: string; concept: string; copy: string };
export type Metric = { value: string; label: string };
export type AnalyticsCard = {
  stat: string;        // badge + below-card summary, e.g. "+22%"
  label: string;       // card title, e.g. "Reach Growth"
  sub: string;         // below-card sub line
  dateRange: string;   // e.g. "Jan 1, 2025 – Dec 31, 2025"
  chartType: "line" | "bar";
  points: number[];    // chart values (any scale; auto-normalised)
  metricA: Metric;     // bottom-left metric inside the card
  metricB: Metric;     // bottom-right metric inside the card
  img?: string;        // legacy, no longer rendered
};
export type GalleryImage = { src: string; alt: string };
export type ApproachItem = { num: string; title: string; body: string };
export type DeliveredCard = { video: string; title: string; body: string };

export type BrandPalette = {
  primary: string;  // main accent (headings, CTA, active states) — e.g. brand red
  bg: string;       // page background (cream)
  bgSoft: string;   // soft panel background
  ink: string;      // dark text / dark sections
  accent: string;   // secondary accent (gold)
};

export type BrandData = {
  // Whole-page theme — drives CSS variables on the brand page.
  palette: BrandPalette;
  // Any CSS color OR gradient — used as the brand accent (e.g. social-tab media).
  // Solid: "#c0392b" · Gradient: "linear-gradient(135deg,#c0392b,#e74c3c)"
  brandColor: string;
  hero: {
    eyebrow: string;
    title: string;        // animated char-by-char title, e.g. "MAST MASALA"
    bgText: string;       // decorative background text
    tagline: string;
    tags: string[];
  };

  stats: BrandStat[];

  tabs: {
    contentLabel: string;
    socialLabel: string;
    servicingLabel: string;
  };

  workDone: {
    title: string;
    bullets: string[];
  };

  calendar: {
    title: string;
    rows: CalRow[];
  };

  analytics: AnalyticsCard[];

  mom: {
    title: string;
    bullets: string[];
  };

  gallery: {
    title: string;
    images: GalleryImage[];
  };

  story: {
    title: string;
    body: string;
    bigNum: string;
  };

  approach: {
    eyebrow: string;
    heading: string;       // may contain <em> markup
    items: ApproachItem[];
  };

  featured: {
    eyebrow: string;
    heading: string;       // may contain <em> markup
    video: string;
    glassLabel: string;
    glassText: string;
  };

  philosophy: {
    eyebrow: string;
    heading: string;       // may contain <em> markup
    video: string;
    paragraphs: string[];
  };

  delivered: {
    eyebrow: string;
    heading: string;       // may contain <em> markup
    cards: DeliveredCard[];
  };

  cta: {
    sub: string;
    label: string;
    href: string;
  };
};

export const DEFAULT_BRAND: BrandData = {
  palette: {
    primary: "#e2231a",
    bg: "#f6efd9",
    bgSoft: "#fbf6e3",
    ink: "#1a1208",
    accent: "#f0d181",
  },
  brandColor: "linear-gradient(135deg, #e2231a, #c0392b)",
  hero: {
    eyebrow: "CLIENT ARCHIVE",
    title: "MAST MASALA",
    bgText: "MM",
    tagline: "Dash Ka Swaad",
    tags: ["Content Writing", "Social Media", "Client Servicing"],
  },

  stats: [
    { raw: 22,   suffix: "%", decimals: 0, label: "Reach Growth" },
    { raw: 29.4, suffix: "M", decimals: 1, label: "Impressions" },
    { raw: 21,   suffix: "%", decimals: 0, label: "Engagement Rate" },
    { raw: 4305, suffix: "",  decimals: 0, label: "Total Followers" },
  ],

  tabs: {
    contentLabel: "Content Writing",
    socialLabel: "Social Media",
    servicingLabel: "Client Servicing",
  },

  workDone: {
    title: "Work Done",
    bullets: [
      "Weekly reporting + action plan",
      "Execution with creatives + revisions",
      "Monthly growth strategy updates",
      "Improved turnaround + consistency",
    ],
  },

  calendar: {
    title: "Content Calendar Glimpse",
    rows: [
      { type: "Reel",   date: "1/10/2024", concept: "Diwali",                  copy: "Diwali ki roshni khushiyan ka pal…" },
      { type: "Static", date: "3/11/2024", concept: "Bhai Dooj",               copy: "Bhai ko ho khushi ke paas…" },
      { type: "Reel",   date: "6/11/2024", concept: "Rajasthani Garam Masala", copy: "Har dish ko de zeeta sting…" },
    ],
  },

  analytics: [
    {
      stat: "+22%", label: "Reach Growth", sub: "29.4M Impressions",
      dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line",
      points: [4, 5, 6, 7, 9, 11, 13, 15, 18, 22, 26, 30],
      metricA: { value: "29.4M", label: "Impressions" },
      metricB: { value: "4,305", label: "Followers" },
    },
    {
      stat: "+2.1%", label: "Engagement", sub: "2.1% Engagement Rate",
      dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar",
      points: [4, 4.4, 4.7, 5, 5.6, 6, 6.6, 7.2, 8, 8.8, 9.4, 10],
      metricA: { value: "1.2K", label: "Engagements" },
      metricB: { value: "2.1%", label: "Engagement rate" },
    },
    {
      stat: "+20%", label: "CTR", sub: "214 Link Clicks",
      dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line",
      points: [2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8.5, 9, 10],
      metricA: { value: "214", label: "Link Clicks" },
      metricB: { value: "+20%", label: "CTR Lift" },
    },
    {
      stat: "+18%", label: "Retention", sub: "Avg. watch time up",
      dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar",
      points: [5, 5.4, 5.6, 6, 6.4, 6.8, 7.1, 7.6, 8, 8.5, 9, 9.6],
      metricA: { value: "+18%", label: "Watch Time" },
      metricB: { value: "1:42", label: "Avg. Duration" },
    },
  ],

  mom: {
    title: "Mast Masala — Festive Content Planning",
    bullets: [
      "Festive Content Roadmap Ready",
      "Recipe & Festive Posts Finalised",
      "High-Engagement Content Plan (Reels, GIFs, interactive posts)",
      "Celebrating Culture & Traditions",
      "Clear Posting Plan Set",
      "Success Metrics Defined",
    ],
  },

  gallery: {
    title: "Creative Gallery",
    images: [
      { src: `${BASE}/2025/12/Mast-Masala_Gandhi-Jayanti.jpg`, alt: "Gandhi Jayanti post" },
      { src: `${BASE}/2025/12/mast-masala-dashera_-2.jpg`,     alt: "Dussehra post" },
      { src: `${BASE}/2025/12/Mast-Masala-Dhanteras_1.jpg`,    alt: "Dhanteras post" },
      { src: `${BASE}/2025/12/Mast-Masala-Oct-22-post.jpg`,    alt: "October post" },
      { src: `${BASE}/2025/12/Mast-Masala-Oct-21-post.jpg`,    alt: "October post 2" },
      { src: `${BASE}/2025/12/happy-makar-sankrant.jpg`,       alt: "Makar Sankranti post" },
    ],
  },

  story: {
    title: "60 Years of Legacy",
    body: "Mast Masala has a legacy of over 60 years in the field of spices. Founded by Mr. Kailash Ramanlal Jhaveri, following the legacy of his late father Shri Ramanlal J. Jhaveri from Chorwad, Junagadh, Gujarat. JSPL delivers fresh, pure, and authentic quality products through research, innovation, and technological advancements.",
    bigNum: "60",
  },

  approach: {
    eyebrow: "HOW WE WORK",
    heading: "Crafted for <em>Growth</em>",
    items: [
      { num: "01", title: "Deep Brand Audit",     body: "We begin by understanding the brand’s voice, audience, and existing content performance before we strategise." },
      { num: "02", title: "Content Architecture", body: "Every post is mapped to a goal — awareness, engagement, or conversion — and slotted into a structured monthly calendar." },
      { num: "03", title: "Execute & Iterate",    body: "We launch, track performance metrics weekly, and refine based on what the data tells us — no guesswork, only growth." },
    ],
  },

  featured: {
    eyebrow: "CAMPAIGN REEL",
    heading: "Campaigns That <em>Convert</em>",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4",
    glassLabel: "Featured Work",
    glassText: "Mast Masala festive campaign — building brand recall through storytelling-led content.",
  },

  philosophy: {
    eyebrow: "OUR PHILOSOPHY",
    heading: "Strategy <em>×</em> Results",
    video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4",
    paragraphs: [
      "Great content isn’t just creative — it’s calculated. For Mast Masala, we merged authentic cultural storytelling with data-driven posting strategies to achieve measurable growth across Instagram and Facebook.",
      "From festive reels to daily engagement posts, every deliverable was aligned with the brand’s 60-year legacy while connecting with a modern, digital-first audience.",
    ],
  },

  delivered: {
    eyebrow: "DELIVERABLES",
    heading: "What We <em>Delivered</em>",
    cards: [
      {
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
        title: "Content Strategy",
        body: "Monthly calendar, 30+ posts, 6+ reels with cultural hooks and festive themes.",
      },
      {
        video: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7188672-6e92-402c-9e45-f1e0f454bdc4.mp4",
        title: "Growth & Analytics",
        body: "+22% reach, 29.4M impressions, and +21% engagement rate in festive quarter.",
      },
    ],
  },

  cta: {
    sub: "Want results like these?",
    label: "Book a discovery call with Raji →",
    href: "/contact",
  },
};
