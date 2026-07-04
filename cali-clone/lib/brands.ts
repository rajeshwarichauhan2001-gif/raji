// Client-safe Brands collection model (no "fs").
// Each brand has archive-card fields PLUS the full case-study content (BrandData).
import { BrandData, DEFAULT_BRAND } from "@/lib/brand";

export type Brand = BrandData & {
  slug: string;          // url segment → /brands/<slug>
  name: string;          // brand name shown on the card
  logo: string;          // logo image URL or /api/media/... (empty → initials placeholder)
  cardDescription: string; // short blurb on the archive card
  published?: boolean;   // hidden from public site when false (draft). undefined = visible.
};

export type BrandsData = {
  archiveTitle: string;
  archiveIntro: string;
  items: Brand[];
};

export const DEFAULT_BRANDS: BrandsData = {
  archiveTitle: "Brands",
  archiveIntro: "A selection of brands we've helped grow with strategy, content and community.",
  items: [
    {
      ...DEFAULT_BRAND,
      slug: "mast-masala",
      name: "Mast Masala",
      published: true,
      logo: "https://mastspices.com/wp-content/uploads/2025/08/logo-107x104.png",
      cardDescription: "60 years of spice legacy — festive content and steady social growth.",
    },
    {
                ...DEFAULT_BRAND,
                slug: "intellve",
                name: "Intellve",
                published: true,
                logo: "",
                cardDescription: "AI-powered security & surveillance software — smart, connected content growth.",
                palette: { primary: "#1e3a5f", bg: "#eef3f7", bgSoft: "#f7fafc", ink: "#0d1b2a", accent: "#4fc3f7" },
                brandColor: "linear-gradient(135deg, #1e3a5f, #2c5f8a)",
                hero: { ...DEFAULT_BRAND.hero, title: "INTELLVE", bgText: "IN", tagline: "Secure. Smart. Connected." },
                stats: [
                  { raw: 1100, suffix: "%", decimals: 0, label: "Reach Growth" },
                  { raw: 720, suffix: "%", decimals: 0, label: "Engagement / Leads" },
                  { raw: 175, suffix: "%", decimals: 0, label: "CTR Lift" },
                  { raw: 55, suffix: "%", decimals: 0, label: "Retention / Consistency" },
                            ],
                calendar: {
                              title: "Content Calendar Glimpse",
                              rows: [
                                { type: "Static", date: "15/8/2025", concept: "Independence Day", copy: "Saluting the spirit of security and freedom…" },
                                { type: "Reel", date: "2/10/2025", concept: "Gandhi Jayanti", copy: "Truth, trust and technology…" },
                                { type: "Static", date: "20/8/2025", concept: "Raksha Bandhan", copy: "Protecting what matters most…" },
                                            ],
                },
                analytics: [
                  { stat: "+1100%", label: "Reach Growth", sub: "+1100% reach growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [4, 5, 6, 7, 9, 11, 13, 15, 18, 22, 26, 30], metricA: { value: "+1100%", label: "Reach Growth" }, metricB: { value: "+720%", label: "Engagement / Leads" } },
                  { stat: "+720%", label: "Engagement / Leads", sub: "+720% engagement growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [4, 4.4, 4.7, 5, 5.6, 6, 6.6, 7.2, 8, 8.8, 9.4, 10], metricA: { value: "+720%", label: "Engagement / Leads" }, metricB: { value: "+175%", label: "CTR Lift" } },
                  { stat: "+175%", label: "CTR Lift", sub: "+175% CTR lift", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8.5, 9, 10], metricA: { value: "+175%", label: "CTR Lift" }, metricB: { value: "55%", label: "Retention / Consistency" } },
                  { stat: "55%", label: "Retention / Consistency", sub: "55% retention / consistency", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [5, 5.4, 5.6, 6, 6.4, 6.8, 7.1, 7.6, 8, 8.5, 9, 9.6], metricA: { value: "55%", label: "Retention" }, metricB: { value: "+1100%", label: "Reach Growth" } },
                            ],
                mom: {
                              title: "Intellve — Content Planning",
                              bullets: [
                                              "Content Roadmap Ready",
                                              "Product & Feature Posts Finalised",
                                              "High-Engagement Content Plan (Reels, Explainers, interactive posts)",
                                              "Highlighting Innovation & Trust",
                                              "Clear Posting Plan Set",
                                              "Success Metrics Defined",
                                            ],
                },
                gallery: {
                              title: "Creative Gallery",
                              images: [
                                { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Ambedkar-jayanti-INTELLVE.jpg", alt: "Ambedkar Jayanti post" },
                                { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Dussera.jpg", alt: "Dussehra post" },
                                { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Gandhi-Jayanti.jpg", alt: "Gandhi Jayanti post" },
                                { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Independence-day.jpg", alt: "Independence Day post" },
                                { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Raksha-bandhan.jpg", alt: "Raksha Bandhan post" },
                                { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Onam.jpg", alt: "Onam post" },
                                            ],
                },
                story: {
                              title: "Always-On Security Intelligence",
                              body: "Intellve is an ISO 9001:2005 and ISO 27001 certified technology company building AI, ML and IoT-driven platforms that unify security and productivity data for facilities — bringing video, sensor and analytics feeds into one real-time view.",
                              bigNum: "24/7",
                },
                featured: { ...DEFAULT_BRAND.featured, glassText: "Intellve campaign — building trust through clear, technology-led storytelling." },
                philosophy: {
                              ...DEFAULT_BRAND.philosophy,
                              paragraphs: [
                                              "For Intellve, we translated complex security technology into clear, trust-building content — helping a technical audience understand AI-driven monitoring without losing the human story behind it.",
                                              "From festive greetings to feature explainers, every post balanced innovation with approachability, growing reach and engagement across Instagram and Facebook.",
                                            ],
                },
                delivered: {
                              ...DEFAULT_BRAND.delivered,
                              cards: [
                                { ...DEFAULT_BRAND.delivered.cards[0], title: "Content Strategy", body: "Monthly content calendar with feature explainers, festive posts and trust-building creatives." },
                                { ...DEFAULT_BRAND.delivered.cards[1], title: "Growth & Analytics", body: "+1100% reach growth and +720% engagement across Instagram and Facebook." },
                                            ],
                },
    },

      {
      ...DEFAULT_BRAND,
        slug: "kunuts",
        name: "Kunuts",
        published: true,
        logo: "",
        cardDescription: "Premium dry fruits made accessible — festive content that drives real engagement.",
        palette: { primary: "#8b5e34", bg: "#faf3e7", bgSoft: "#fdf8f0", ink: "#2e1e0f", accent: "#d9a441" },
        brandColor: "linear-gradient(135deg, #8b5e34, #c68642)",
        hero: { ...DEFAULT_BRAND.hero, title: "KUNUTS", bgText: "KU", tagline: "Premium Dry Fruits, Everyday Value" },
        stats: [
          { raw: 820, suffix: "%", decimals: 0, label: "Reach Growth" },
          { raw: 540, suffix: "%", decimals: 0, label: "Engagement / Leads" },
          { raw: 212, suffix: "%", decimals: 0, label: "CTR Lift" },
          { raw: 64, suffix: "%", decimals: 0, label: "Retention / Consistency" },
          ],
        calendar: {
          title: "Content Calendar Glimpse",
          rows: [
            { type: "Static", date: "26/1/2025", concept: "Republic Day", copy: "Healthy snacking, proud nation…" },
            { type: "Reel", date: "14/3/2025", concept: "Holi", copy: "Colours of health this Holi…" },
            { type: "Static", date: "14/1/2025", concept: "Makar Sankranti", copy: "Til-gud sweetness, Kunuts freshness…" },
            ],
        },
        analytics: [
          { stat: "+820%", label: "Reach Growth", sub: "+820% reach growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [4, 5, 6, 7, 9, 11, 13, 15, 18, 22, 26, 30], metricA: { value: "+820%", label: "Reach Growth" }, metricB: { value: "+540%", label: "Engagement / Leads" } },
          { stat: "+540%", label: "Engagement / Leads", sub: "+540% engagement growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [4, 4.4, 4.7, 5, 5.6, 6, 6.6, 7.2, 8, 8.8, 9.4, 10], metricA: { value: "+540%", label: "Engagement / Leads" }, metricB: { value: "+212%", label: "CTR Lift" } },
          { stat: "+212%", label: "CTR Lift", sub: "+212% CTR lift", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8.5, 9, 10], metricA: { value: "+212%", label: "CTR Lift" }, metricB: { value: "64%", label: "Retention / Consistency" } },
          { stat: "64%", label: "Retention / Consistency", sub: "64% retention / consistency", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [5, 5.4, 5.6, 6, 6.4, 6.8, 7.1, 7.6, 8, 8.5, 9, 9.6], metricA: { value: "64%", label: "Retention" }, metricB: { value: "+820%", label: "Reach Growth" } },
          ],
        mom: {
          title: "Kunuts — Festive Content Planning",
          bullets: [
            "Festive Content Roadmap Ready",
            "Recipe & Festive Posts Finalised",
            "High-Engagement Content Plan (Reels, GIFs, interactive posts)",
            "Celebrating Health & Freshness",
            "Clear Posting Plan Set",
            "Success Metrics Defined",
            ],
        },
        gallery: {
          title: "Creative Gallery",
          images: [
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/kunuts-jan-republic-day-.jpg", alt: "Republic Day post" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Holi.jpg", alt: "Holi post" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/kunuts-jan-makarsankrat.png", alt: "Makar Sankranti post" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/kunuts-7.jpg", alt: "Product post" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/kunuts-jan-4.jpg", alt: "Product post" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/kunuts-jan-13.jpg", alt: "Product post" },
            ],
        },
        story: {
          title: "A Decade of Premium Quality",
          body: "For over a decade Kunuts has supplied premium dry fruits to major enterprises, and now brings that same quality directly to everyday customers — proving that excellence doesn't need a premium price tag.",
          bigNum: "10+",
        },
        featured: { ...DEFAULT_BRAND.featured, glassText: "Kunuts festive campaign — making premium dry fruits feel accessible to every home." },
        philosophy: {
          ...DEFAULT_BRAND.philosophy,
          paragraphs: [
            "Great content isn't just tasty — it's strategic. For Kunuts, we blended festive food storytelling with consistent posting to make premium dry fruits feel accessible to every household.",
            "From recipe-led reels to seasonal greetings, each deliverable reinforced Kunuts' promise of quality without compromise, driving steady follower and engagement growth.",
            ],
        },
        delivered: {
          ...DEFAULT_BRAND.delivered,
          cards: [
            { ...DEFAULT_BRAND.delivered.cards[0], title: "Content Strategy", body: "Monthly calendar with recipe-led reels, festive posts and product spotlights." },
            { ...DEFAULT_BRAND.delivered.cards[1], title: "Growth & Analytics", body: "+820% reach growth and +540% engagement across the campaign period." },
            ],
        },
      },
      {
    ...DEFAULT_BRAND,
        slug: "salus",
        name: "Salus",
        published: true,
        logo: "",
        cardDescription: "Fifty years of designer bathroom fittings — content crafted for lasting impressions.",
        palette: { primary: "#0f6e8c", bg: "#eaf6f8", bgSoft: "#f4fbfc", ink: "#0a2530", accent: "#7fd4e0" },
        brandColor: "linear-gradient(135deg, #0f6e8c, #14a3c7)",
        hero: { ...DEFAULT_BRAND.hero, title: "SALUS", bgText: "SA", tagline: "Designer Bathrooms, Timeless Living" },
        stats: [
          { raw: 1100, suffix: "%", decimals: 0, label: "Reach Growth" },
          { raw: 750, suffix: "%", decimals: 0, label: "Engagement / Leads" },
          { raw: 185, suffix: "%", decimals: 0, label: "CTR Lift" },
          { raw: 59, suffix: "%", decimals: 0, label: "Retention / Consistency" },
          ],
        calendar: {
          title: "Content Calendar Glimpse",
          rows: [
            { type: "Static", date: "5/6/2025", concept: "Design Spotlight", copy: "Designer bathrooms worth living…" },
            { type: "Reel", date: "12/7/2025", concept: "Product Launch", copy: "Matchless fittings for modern homes…" },
            { type: "Static", date: "20/9/2025", concept: "Customer Story", copy: "Every bathroom tells a story…" },
            ],
        },
        analytics: [
          { stat: "+1100%", label: "Reach Growth", sub: "+1100% reach growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [4, 5, 6, 7, 9, 11, 13, 15, 18, 22, 26, 30], metricA: { value: "+1100%", label: "Reach Growth" }, metricB: { value: "+750%", label: "Engagement / Leads" } },
          { stat: "+750%", label: "Engagement / Leads", sub: "+750% engagement growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [4, 4.4, 4.7, 5, 5.6, 6, 6.6, 7.2, 8, 8.8, 9.4, 10], metricA: { value: "+750%", label: "Engagement / Leads" }, metricB: { value: "+185%", label: "CTR Lift" } },
          { stat: "+185%", label: "CTR Lift", sub: "+185% CTR lift", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8.5, 9, 10], metricA: { value: "+185%", label: "CTR Lift" }, metricB: { value: "+59%", label: "Retention / Consistency" } },
          { stat: "+59%", label: "Retention / Consistency", sub: "+59% retention / consistency", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [5, 5.4, 5.6, 6, 6.4, 6.8, 7.1, 7.6, 8, 8.5, 9, 9.6], metricA: { value: "+59%", label: "Retention" }, metricB: { value: "+1100%", label: "Reach Growth" } },
          ],
        mom: {
          title: "Salus — Content Planning",
          bullets: [
            "Content Roadmap Ready",
            "Product & Design Posts Finalised",
            "High-Engagement Content Plan (Reels, Carousels, interactive posts)",
            "Showcasing Design & Craftsmanship",
            "Clear Posting Plan Set",
            "Success Metrics Defined",
            ],
        },
        gallery: {
          title: "Creative Gallery",
          images: [
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Salus-8-1.jpg", alt: "Product showcase" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Salus-9.jpg", alt: "Product showcase" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Salus-6.jpg", alt: "Product showcase" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Salus-2.jpg", alt: "Product showcase" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Salus-1.jpg", alt: "Product showcase" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/7159-6.jpg", alt: "Bathroom fittings showcase" },
            ],
        },
        story: {
          title: "50 Years of Bathroom Design Expertise",
          body: "Backed by a fifty-year-old group, Salus designs bathroom fittings, accessories and sanitary ceramics that turn everyday bathrooms into designer spaces — a one-stop range built by a team of dedicated experts.",
          bigNum: "50",
        },
        featured: { ...DEFAULT_BRAND.featured, glassText: "Salus campaign — showcasing fifty years of designer bathroom craftsmanship." },
        philosophy: {
          ...DEFAULT_BRAND.philosophy,
          paragraphs: [
            "For Salus, we paired striking product visuals with a design-forward voice — positioning fifty years of bathroom expertise as effortlessly modern and aspirational.",
            "Every post, from product highlights to festive greetings, was built to showcase craftsmanship while steadily growing reach and engagement across platforms.",
            ],
        },
        delivered: {
          ...DEFAULT_BRAND.delivered,
          cards: [
            { ...DEFAULT_BRAND.delivered.cards[0], title: "Content Strategy", body: "Monthly calendar of product showcases, design spotlights and festive creatives." },
            { ...DEFAULT_BRAND.delivered.cards[1], title: "Growth & Analytics", body: "+1100% reach growth and +750% engagement across the campaign period." },
            ],
        },
      },
        {
            ...DEFAULT_BRAND,
          slug: "monarch",
          name: "Monarch",
          published: true,
          logo: "",
          cardDescription: "Modern bath & kitchen fixtures since 1965 — content built for functional elegance.",
          palette: { primary: "#5b2a86", bg: "#f3edf9", bgSoft: "#f9f5fc", ink: "#241033", accent: "#c9a227" },
          brandColor: "linear-gradient(135deg, #5b2a86, #8e44ad)",
          hero: { ...DEFAULT_BRAND.hero, title: "MONARCH", bgText: "MO", tagline: "Modern Fixtures, Timeless Comfort" },
          stats: [
            { raw: 1050, suffix: "%", decimals: 0, label: "Reach Growth" },
            { raw: 695, suffix: "%", decimals: 0, label: "Engagement / Leads" },
            { raw: 168, suffix: "%", decimals: 0, label: "CTR Lift" },
            { raw: 52, suffix: "%", decimals: 0, label: "Retention / Consistency" },
            ],
          calendar: {
            title: "Content Calendar Glimpse",
            rows: [
              { type: "Static", date: "10/4/2025", concept: "Product Highlight", copy: "Fixtures that blend tech and comfort…" },
              { type: "Reel", date: "18/6/2025", concept: "Kitchen Makeover", copy: "Modern kitchens, timeless design…" },
              { type: "Static", date: "25/8/2025", concept: "Feature Spotlight", copy: "Functionality meets elegance…" },
              ],
          },
          analytics: [
            { stat: "+1050%", label: "Reach Growth", sub: "+1050% reach growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [4, 5, 6, 7, 9, 11, 13, 15, 18, 22, 26, 30], metricA: { value: "+1050%", label: "Reach Growth" }, metricB: { value: "+695%", label: "Engagement / Leads" } },
            { stat: "+695%", label: "Engagement / Leads", sub: "+695% engagement growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [4, 4.4, 4.7, 5, 5.6, 6, 6.6, 7.2, 8, 8.8, 9.4, 10], metricA: { value: "+695%", label: "Engagement / Leads" }, metricB: { value: "+168%", label: "CTR Lift" } },
            { stat: "+168%", label: "CTR Lift", sub: "+168% CTR lift", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8.5, 9, 10], metricA: { value: "+168%", label: "CTR Lift" }, metricB: { value: "52%", label: "Retention / Consistency" } },
            { stat: "52%", label: "Retention / Consistency", sub: "52% retention / consistency", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [5, 5.4, 5.6, 6, 6.4, 6.8, 7.1, 7.6, 8, 8.5, 9, 9.6], metricA: { value: "52%", label: "Retention" }, metricB: { value: "+1050%", label: "Reach Growth" } },
            ],
          mom: {
            title: "Monarch — Content Planning",
            bullets: [
              "Content Roadmap Ready",
              "Product & Design Posts Finalised",
              "High-Engagement Content Plan (Reels, Carousels, interactive posts)",
              "Showcasing Modern Fixtures & Functionality",
              "Clear Posting Plan Set",
              "Success Metrics Defined",
              ],
          },
          gallery: {
            title: "Creative Gallery",
            images: [
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/1.jpg", alt: "Social media post" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/2.jpg", alt: "Social media post" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/3-1.jpg", alt: "Social media post" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/4-1.jpg", alt: "Social media post" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/5.jpg", alt: "Social media post" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/6.jpg", alt: "Social media post" },
              ],
          },
          story: {
            title: "60+ Years of Modern Fixtures",
            body: "Established in 1965, Monarch Bath pairs authorised dealerships with global brands to deliver modern, functional bath and kitchen fixtures — blending technology, comfort and constantly updated design.",
            bigNum: "60+",
          },
          featured: { ...DEFAULT_BRAND.featured, glassText: "Monarch campaign — blending heritage with modern bath & kitchen design." },
          philosophy: {
            ...DEFAULT_BRAND.philosophy,
            paragraphs: [
              "For Monarch, content strategy meant showing how heritage and modern design meet — presenting bath and kitchen fixtures as both functional and beautifully current.",
              "Consistent posting and a clear content calendar helped Monarch maintain steady growth in reach, engagement and audience retention.",
              ],
          },
          delivered: {
            ...DEFAULT_BRAND.delivered,
            cards: [
              { ...DEFAULT_BRAND.delivered.cards[0], title: "Content Strategy", body: "Monthly calendar featuring product highlights, kitchen makeovers and design spotlights." },
              { ...DEFAULT_BRAND.delivered.cards[1], title: "Growth & Analytics", body: "+1050% reach growth and +695% engagement across the campaign period." },
              ],
          },
        },
  {
      ...DEFAULT_BRAND,
    slug: "rapoo",
    name: "Rapoo",
    published: true,
    logo: "",
    cardDescription: "Wireless peripherals pioneer since 2002 — content that keeps pace with innovation.",
    palette: { primary: "#d81f26", bg: "#f7f0f0", bgSoft: "#fbf5f5", ink: "#1a0d0d", accent: "#f2a900" },
    brandColor: "linear-gradient(135deg, #d81f26, #a3161c)",
    hero: { ...DEFAULT_BRAND.hero, title: "RAPOO", bgText: "RP", tagline: "Wireless Innovation Since 2002" },
    stats: [
      { raw: 900, suffix: "%", decimals: 0, label: "Reach Growth" },
      { raw: 525, suffix: "%", decimals: 0, label: "Engagement / Leads" },
      { raw: 195, suffix: "%", decimals: 0, label: "CTR Lift" },
      { raw: 48, suffix: "%", decimals: 0, label: "Retention / Consistency" },
      ],
    calendar: {
      title: "Content Calendar Glimpse",
      rows: [
        { type: "Static", date: "3/3/2025", concept: "Rapoo X Mi Collab", copy: "Wireless innovation, better together…" },
        { type: "Reel", date: "22/5/2025", concept: "Product Launch", copy: "Precision built for performance…" },
        { type: "Static", date: "14/7/2025", concept: "Feature Spotlight", copy: "5GHz stability, zero lag…" },
        ],
    },
    analytics: [
      { stat: "+900%", label: "Reach Growth", sub: "+900% reach growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [4, 5, 6, 7, 9, 11, 13, 15, 18, 22, 26, 30], metricA: { value: "+900%", label: "Reach Growth" }, metricB: { value: "+525%", label: "Engagement / Leads" } },
      { stat: "+525%", label: "Engagement / Leads", sub: "+525% engagement growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [4, 4.4, 4.7, 5, 5.6, 6, 6.6, 7.2, 8, 8.8, 9.4, 10], metricA: { value: "+525%", label: "Engagement / Leads" }, metricB: { value: "+195%", label: "CTR Lift" } },
      { stat: "+195%", label: "CTR Lift", sub: "+195% CTR lift", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8.5, 9, 10], metricA: { value: "+195%", label: "CTR Lift" }, metricB: { value: "+48%", label: "Retention / Consistency" } },
      { stat: "+48%", label: "Retention / Consistency", sub: "+48% retention / consistency", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [5, 5.4, 5.6, 6, 6.4, 6.8, 7.1, 7.6, 8, 8.5, 9, 9.6], metricA: { value: "+48%", label: "Retention" }, metricB: { value: "+900%", label: "Reach Growth" } },
      ],
    mom: {
      title: "Rapoo — Content Planning",
      bullets: [
        "Content Roadmap Ready",
        "Product & Feature Posts Finalised",
        "High-Engagement Content Plan (Reels, Explainers, interactive posts)",
        "Highlighting Innovation & Performance",
        "Clear Posting Plan Set",
        "Success Metrics Defined",
        ],
    },
    gallery: {
      title: "Creative Gallery",
      images: [
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Copy-of-02-1.jpg", alt: "Rapoo X Mi collab post" },
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Copy-of-03.jpg", alt: "Rapoo X Mi collab post" },
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Copy-of-04-1.jpg", alt: "Rapoo X Mi collab post" },
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Copy-of-07.jpg", alt: "Rapoo X Mi collab post" },
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Copy-of-09.jpg", alt: "Rapoo X Mi collab post" },
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Copy-of-11.png", alt: "Rapoo X Mi collab post" },
        ],
    },
    story: {
      title: "Two Decades of Wireless Innovation",
      body: "Founded in 2002, Rapoo pioneered wireless peripherals — from the first 2.4GHz devices to becoming China's market leader, and later a 5GHz innovator listed on the Shenzhen Stock Exchange.",
      bigNum: "2002",
    },
    featured: { ...DEFAULT_BRAND.featured, glassText: "Rapoo campaign — turning two decades of wireless innovation into engaging content." },
    philosophy: {
      ...DEFAULT_BRAND.philosophy,
      paragraphs: [
        "For Rapoo, we highlighted two decades of wireless innovation through crisp, tech-forward content — turning product specs into stories audiences actually want to engage with.",
        "From collaboration campaigns to feature spotlights, every post reinforced Rapoo's reputation for performance and reliability.",
        ],
    },
    delivered: {
      ...DEFAULT_BRAND.delivered,
      cards: [
        { ...DEFAULT_BRAND.delivered.cards[0], title: "Content Strategy", body: "Monthly calendar with collaboration campaigns, feature spotlights and product launches." },
        { ...DEFAULT_BRAND.delivered.cards[1], title: "Growth & Analytics", body: "+900% reach growth and +525% engagement across the campaign period." },
        ],
    },
  },
  {
      ...DEFAULT_BRAND,
    slug: "rapoo-middle-east",
    name: "Rapoo Middle East",
    published: true,
    logo: "",
    cardDescription: "Rapoo's regional wireless launch — content strategy built for a new market.",
    palette: { primary: "#b8161c", bg: "#f8f1e9", bgSoft: "#fdf8f2", ink: "#201010", accent: "#d4af37" },
    brandColor: "linear-gradient(135deg, #b8161c, #7a1116)",
    hero: { ...DEFAULT_BRAND.hero, title: "RAPOO MIDDLE EAST", bgText: "RM", tagline: "Wireless Innovation, Regional Reach" },
    stats: [
      { raw: 1050, suffix: "%", decimals: 0, label: "Reach Growth" },
      { raw: 695, suffix: "%", decimals: 0, label: "Engagement / Leads" },
      { raw: 168, suffix: "%", decimals: 0, label: "CTR Lift" },
      { raw: 52, suffix: "%", decimals: 0, label: "Retention / Consistency" },
      ],
    calendar: {
      title: "Content Calendar Glimpse",
      rows: [
        { type: "Static", date: "9/2/2025", concept: "Middle East Launch", copy: "Rapoo goes regional…" },
        { type: "Reel", date: "30/4/2025", concept: "Product Showcase", copy: "Engineered for every desk…" },
        { type: "Static", date: "11/9/2025", concept: "Feature Spotlight", copy: "Performance without wires…" },
        ],
    },
    analytics: [
      { stat: "+1050%", label: "Reach Growth", sub: "+1050% reach growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [4, 5, 6, 7, 9, 11, 13, 15, 18, 22, 26, 30], metricA: { value: "+1050%", label: "Reach Growth" }, metricB: { value: "+695%", label: "Engagement / Leads" } },
      { stat: "+695%", label: "Engagement / Leads", sub: "+695% engagement growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [4, 4.4, 4.7, 5, 5.6, 6, 6.6, 7.2, 8, 8.8, 9.4, 10], metricA: { value: "+695%", label: "Engagement / Leads" }, metricB: { value: "+168%", label: "CTR Lift" } },
      { stat: "+168%", label: "CTR Lift", sub: "+168% CTR lift", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8.5, 9, 10], metricA: { value: "+168%", label: "CTR Lift" }, metricB: { value: "52%", label: "Retention / Consistency" } },
      { stat: "52%", label: "Retention / Consistency", sub: "52% retention / consistency", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [5, 5.4, 5.6, 6, 6.4, 6.8, 7.1, 7.6, 8, 8.5, 9, 9.6], metricA: { value: "52%", label: "Retention" }, metricB: { value: "+1050%", label: "Reach Growth" } },
      ],
    mom: {
      title: "Rapoo Middle East — Content Planning",
      bullets: [
        "Content Roadmap Ready",
        "Product & Feature Posts Finalised",
        "High-Engagement Content Plan (Reels, Explainers, interactive posts)",
        "Highlighting Regional Launches & Performance",
        "Clear Posting Plan Set",
        "Success Metrics Defined",
        ],
    },
    gallery: {
      title: "Creative Gallery",
      images: [
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/1-1.jpg", alt: "Middle East campaign post" },
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/2-2.jpg", alt: "Middle East campaign post" },
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/3-2.jpg", alt: "Middle East campaign post" },
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/4-2.jpg", alt: "Middle East campaign post" },
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/5-1.jpg", alt: "Middle East campaign post" },
        { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/6-1.jpg", alt: "Middle East campaign post" },
        ],
    },
    story: {
      title: "Countries Reached Worldwide",
      body: "Rapoo's wireless innovation — from 2.4GHz to 5GHz technology and a fully ISO-certified global factory — now reaches the Middle East, serving a growing network across 80+ countries.",
      bigNum: "80+",
    },
    featured: { ...DEFAULT_BRAND.featured, glassText: "Rapoo Middle East campaign — introducing wireless innovation to a new region." },
    philosophy: {
      ...DEFAULT_BRAND.philosophy,
      paragraphs: [
        "Entering a new market meant adapting Rapoo's innovation story for a regional audience — content that felt local while staying true to the brand's global reputation.",
        "Consistent creative and reporting helped establish Rapoo's presence and engagement across the Middle East market.",
        ],
    },
    delivered: {
      ...DEFAULT_BRAND.delivered,
      cards: [
        { ...DEFAULT_BRAND.delivered.cards[0], title: "Content Strategy", body: "Monthly calendar introducing Rapoo's wireless range to a new regional audience." },
        { ...DEFAULT_BRAND.delivered.cards[1], title: "Growth & Analytics", body: "+1050% reach growth and +695% engagement across the campaign period." },
        ],
    },
  },
      {
    ...DEFAULT_BRAND,
        slug: "furnishing-home",
        name: "Furnishing Home",
        published: true,
        logo: "",
        cardDescription: "55 years of home furnishings by Amratlal & Sons — festive storytelling that connects.",
        palette: { primary: "#a44a3f", bg: "#f7ede6", bgSoft: "#fbf5f0", ink: "#2b160f", accent: "#e0b98d" },
        brandColor: "linear-gradient(135deg, #a44a3f, #c97a5e)",
        hero: { ...DEFAULT_BRAND.hero, title: "FURNISHING HOME", bgText: "FH", tagline: "Bringing Homes to Life Since 1970" },
        stats: [
          { raw: 335, suffix: "%", decimals: 0, label: "Reach Growth" },
          { raw: 214, suffix: "%", decimals: 0, label: "Engagement / Leads" },
          { raw: 262, suffix: "%", decimals: 0, label: "CTR Lift" },
          { raw: 36, suffix: "%", decimals: 0, label: "Retention / Consistency" },
          ],
        calendar: {
          title: "Content Calendar Glimpse",
          rows: [
            { type: "Static", date: "1/11/2025", concept: "Dhanteras", copy: "Bringing warmth home this Dhanteras…" },
            { type: "Reel", date: "3/11/2025", concept: "Bhai Dooj", copy: "Comfort woven with tradition…" },
            { type: "Static", date: "20/12/2025", concept: "Collection Spotlight", copy: "Elegance, curated for every room…" },
            ],
        },
        analytics: [
          { stat: "+335%", label: "Reach Growth", sub: "+335% reach growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [4, 5, 6, 7, 9, 11, 13, 15, 18, 22, 26, 30], metricA: { value: "+335%", label: "Reach Growth" }, metricB: { value: "+214%", label: "Engagement / Leads" } },
          { stat: "+214%", label: "Engagement / Leads", sub: "+214% engagement growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [4, 4.4, 4.7, 5, 5.6, 6, 6.6, 7.2, 8, 8.8, 9.4, 10], metricA: { value: "+214%", label: "Engagement / Leads" }, metricB: { value: "+262%", label: "CTR Lift" } },
          { stat: "+262%", label: "CTR Lift", sub: "+262% CTR lift", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8.5, 9, 10], metricA: { value: "+262%", label: "CTR Lift" }, metricB: { value: "+36%", label: "Retention / Consistency" } },
          { stat: "+36%", label: "Retention / Consistency", sub: "+36% retention / consistency", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [5, 5.4, 5.6, 6, 6.4, 6.8, 7.1, 7.6, 8, 8.5, 9, 9.6], metricA: { value: "+36%", label: "Retention" }, metricB: { value: "+335%", label: "Reach Growth" } },
          ],
        mom: {
          title: "Furnishing Home — Festive Content Planning",
          bullets: [
            "Festive Content Roadmap Ready",
            "Collection & Festive Posts Finalised",
            "High-Engagement Content Plan (Reels, Carousels, interactive posts)",
            "Celebrating Home & Tradition",
            "Clear Posting Plan Set",
            "Success Metrics Defined",
            ],
        },
        gallery: {
          title: "Creative Gallery",
          images: [
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Dhanteras-.jpeg", alt: "Dhanteras post" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Bhaidooj-scaled.png", alt: "Bhai Dooj post" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/furnishing_home_CC_3.png", alt: "Collection showcase" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/furnishing_home_CC_6.png", alt: "Collection showcase" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/furnishing_home_CC_11.png", alt: "Collection showcase" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/564987481_18063087149576460_6542216695873398226_n.jpg", alt: "Festive post" },
            ],
        },
        story: {
          title: "55 Years of Home Furnishing Craft",
          body: "Furnishing Home by Amratlal & Sons has shaped homes for over 55 years, blending tradition, craftsmanship and contemporary style into every soft-furnishing collection.",
          bigNum: "55",
        },
        featured: { ...DEFAULT_BRAND.featured, glassText: "Furnishing Home festive campaign — celebrating 55 years of home craftsmanship." },
        philosophy: {
          ...DEFAULT_BRAND.philosophy,
          paragraphs: [
            "For Furnishing Home, we wove tradition and craftsmanship into every festive post — honoring 55 years of heritage while speaking to a modern home-owning audience.",
            "From Diwali to Bhai Dooj, each piece of content celebrated the warmth Amratlal & Sons brings to every home.",
            ],
        },
        delivered: {
          ...DEFAULT_BRAND.delivered,
          cards: [
            { ...DEFAULT_BRAND.delivered.cards[0], title: "Content Strategy", body: "Monthly calendar with festive posts, collection spotlights and heritage storytelling." },
            { ...DEFAULT_BRAND.delivered.cards[1], title: "Growth & Analytics", body: "+335% reach growth and +214% engagement across the campaign period." },
            ],
        },
      },
  {
      ...DEFAULT_BRAND,
          slug: "secure-my-shop",
          name: "Secure My Shop",
          published: true,
          logo: "",
          cardDescription: "Retail security solutions — always-on content for always-on protection.",
          palette: { primary: "#124559", bg: "#eaf2f3", bgSoft: "#f4f9fa", ink: "#071a21", accent: "#2f9c95" },
          brandColor: "linear-gradient(135deg, #124559, #01596e)",
          hero: { ...DEFAULT_BRAND.hero, title: "SECURE MY SHOP", bgText: "SM", tagline: "Round-the-Clock Shop Security" },
          stats: [
            { raw: 1100, suffix: "%", decimals: 0, label: "Reach Growth" },
            { raw: 720, suffix: "%", decimals: 0, label: "Engagement / Leads" },
            { raw: 175, suffix: "%", decimals: 0, label: "CTR Lift" },
            { raw: 55, suffix: "%", decimals: 0, label: "Retention / Consistency" },
            ],
          calendar: {
            title: "Content Calendar Glimpse",
            rows: [
              { type: "Static", date: "25/12/2025", concept: "Christmas", copy: "Secure celebrations this Christmas…" },
              { type: "Reel", date: "1/1/2026", concept: "New Year", copy: "A safer start to the new year…" },
              { type: "Static", date: "15/1/2026", concept: "Feature Spotlight", copy: "Round-the-clock shop security…" },
              ],
          },
          analytics: [
            { stat: "+1100%", label: "Reach Growth", sub: "+1100% reach growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [4, 5, 6, 7, 9, 11, 13, 15, 18, 22, 26, 30], metricA: { value: "+1100%", label: "Reach Growth" }, metricB: { value: "+720%", label: "Engagement / Leads" } },
            { stat: "+720%", label: "Engagement / Leads", sub: "+720% engagement growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [4, 4.4, 4.7, 5, 5.6, 6, 6.6, 7.2, 8, 8.8, 9.4, 10], metricA: { value: "+720%", label: "Engagement / Leads" }, metricB: { value: "+175%", label: "CTR Lift" } },
            { stat: "+175%", label: "CTR Lift", sub: "+175% CTR lift", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8.5, 9, 10], metricA: { value: "+175%", label: "CTR Lift" }, metricB: { value: "55%", label: "Retention / Consistency" } },
            { stat: "55%", label: "Retention / Consistency", sub: "55% retention / consistency", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [5, 5.4, 5.6, 6, 6.4, 6.8, 7.1, 7.6, 8, 8.5, 9, 9.6], metricA: { value: "55%", label: "Retention" }, metricB: { value: "+1100%", label: "Reach Growth" } },
            ],
          mom: {
            title: "Secure My Shop — Content Planning",
            bullets: [
              "Content Roadmap Ready",
              "Feature & Trust-Building Posts Finalised",
              "High-Engagement Content Plan (Reels, Explainers, interactive posts)",
              "Highlighting Security & Trust",
              "Clear Posting Plan Set",
              "Success Metrics Defined",
              ],
          },
          gallery: {
            title: "Creative Gallery",
            images: [
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/newyear_resizee2.png", alt: "New Year post" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/newyear_resizee1.png", alt: "New Year post" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/christmas_reelsize3.png", alt: "Christmas post" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/slide1-1.png", alt: "Feature slide" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/slide2.png", alt: "Feature slide" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/slide3.png", alt: "Feature slide" },
              ],
          },
          story: {
            title: "Round-the-Clock Retail Security",
            body: "Secure My Shop brings ISO-certified, AI and IoT-powered security intelligence to retail spaces — unifying video, sensor and alert data into one real-time view for round-the-clock protection.",
            bigNum: "24/7",
        },
          featured: { ...DEFAULT_BRAND.featured, glassText: "Secure My Shop campaign — building trust through round-the-clock security storytelling." },
          philosophy: {
            ...DEFAULT_BRAND.philosophy,
            paragraphs: [
              "For Secure My Shop, content had to build trust fast — clear, reassuring posts that made advanced retail security feel simple and dependable.",
              "Festive and everyday content alike reinforced round-the-clock protection, growing engagement steadily across the year.",
              ],
          },
          delivered: {
            ...DEFAULT_BRAND.delivered,
            cards: [
              { ...DEFAULT_BRAND.delivered.cards[0], title: "Content Strategy", body: "Monthly calendar with festive posts, feature spotlights and trust-building creatives." },
              { ...DEFAULT_BRAND.delivered.cards[1], title: "Growth & Analytics", body: "+1100% reach growth and +720% engagement across the campaign period." },
              ],
          },
        },
      {
      ...DEFAULT_BRAND,
        slug: "icici-prudential",
        name: "ICICI Prudential",
        published: true,
        logo: "",
        cardDescription: "Saksham Pro app UI — insurance experience design, simplified for advisors.",
        palette: { primary: "#b7202e", bg: "#fbeff0", bgSoft: "#fdf6f6", ink: "#2a0a0d", accent: "#e8a33d" },
        brandColor: "linear-gradient(135deg, #b7202e, #8c1c26)",
        hero: { ...DEFAULT_BRAND.hero, title: "ICICI PRUDENTIAL", bgText: "IP", tagline: "Saksham Pro — Insurance, Simplified" },
        stats: [
          { raw: 8, suffix: "+", decimals: 0, label: "UI Screens Designed" },
          { raw: 100, suffix: "%", decimals: 0, label: "Advisor-Ready Experience" },
          { raw: 2, suffix: "", decimals: 0, label: "Design Iterations" },
          { raw: 1, suffix: "", decimals: 0, label: "Unified App Experience" },
          ],
        calendar: {
          title: "Content Calendar Glimpse",
          rows: [
            { type: "Static", date: "10/1/2026", concept: "App UI Spotlight", copy: "Saksham Pro — simplified for advisors…" },
            { type: "Static", date: "18/1/2026", concept: "Feature Walkthrough", copy: "Every screen designed for clarity…" },
            { type: "Static", date: "25/1/2026", concept: "UX Update", copy: "Insurance made intuitive…" },
            ],
        },
        analytics: [
          { stat: "8+", label: "UI Screens", sub: "Saksham Pro app screens designed", dateRange: "Jan 2026", chartType: "line", points: [4, 5, 6, 7, 9, 11, 13, 15, 18, 22, 26, 30], metricA: { value: "8+", label: "Screens Designed" }, metricB: { value: "100%", label: "Advisor-Ready" } },
          { stat: "100%", label: "Advisor-Ready UI", sub: "Fully advisor-ready experience", dateRange: "Jan 2026", chartType: "bar", points: [4, 4.4, 4.7, 5, 5.6, 6, 6.6, 7.2, 8, 8.8, 9.4, 10], metricA: { value: "100%", label: "Advisor-Ready" }, metricB: { value: "2", label: "Design Iterations" } },
          { stat: "2", label: "Design Iterations", sub: "Iterated for clarity", dateRange: "Jan 2026", chartType: "line", points: [2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8.5, 9, 10], metricA: { value: "2", label: "Iterations" }, metricB: { value: "8+", label: "Screens Designed" } },
          { stat: "1", label: "Unified App Experience", sub: "One seamless advisor app", dateRange: "Jan 2026", chartType: "bar", points: [5, 5.4, 5.6, 6, 6.4, 6.8, 7.1, 7.6, 8, 8.5, 9, 9.6], metricA: { value: "1", label: "Unified Experience" }, metricB: { value: "100%", label: "Advisor-Ready" } },
          ],
        mom: {
          title: "ICICI Prudential — App Design Planning",
          bullets: [
            "App UI Roadmap Ready",
            "Screen-by-Screen Design Finalised",
            "Advisor-Focused Interaction Flows",
            "Showcasing App Experience & Trust",
            "Clear Design Handoff Plan",
            "Success Metrics Defined",
            ],
        },
        gallery: {
          title: "Creative Gallery",
          images: [
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/1.jpeg", alt: "Saksham Pro app screen" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/2.jpeg", alt: "Saksham Pro app screen" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/5.jpeg", alt: "Saksham Pro app screen" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/4.jpeg", alt: "Saksham Pro app screen" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/3-1.jpeg", alt: "App UI screen" },
            { src: "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/5-1.jpeg", alt: "App UI screen" },
            ],
        },
        story: {
          title: "Two Decades of Trusted Insurance",
          body: "ICICI Prudential Life, promoted by ICICI Bank and Prudential Corporation, has ranked among India's top life insurers since starting operations in 2001 — the Saksham Pro app UI was designed to simplify that experience for advisors.",
          bigNum: "2001",
        },
        featured: { ...DEFAULT_BRAND.featured, glassText: "Saksham Pro campaign — simplifying insurance through intuitive app design." },
        philosophy: {
          ...DEFAULT_BRAND.philosophy,
          paragraphs: [
            "For the Saksham Pro app, our focus was clarity — presenting a complex insurance advisor tool through clean, intuitive UI storytelling.",
            "Every screen and interaction was designed to make a two-decade-old institution feel approachable in a digital-first format.",
            ],
        },
        delivered: {
          ...DEFAULT_BRAND.delivered,
          cards: [
            { ...DEFAULT_BRAND.delivered.cards[0], title: "Content Strategy", body: "UI walkthroughs and feature spotlights designed for the Saksham Pro advisor app." },
            { ...DEFAULT_BRAND.delivered.cards[1], title: "Growth & Analytics", body: "A cleaner, more intuitive advisor experience across every screen." },
            ],
        },
      },
        {
            ...DEFAULT_BRAND,
          slug: "godrej",
          name: "Godrej",
          published: true,
          logo: "",
          cardDescription: "128 years of Indian engineering legacy — content honoring innovation and trust.",
          palette: { primary: "#003a70", bg: "#edf1f6", bgSoft: "#f6f8fb", ink: "#071322", accent: "#e0212b" },
          brandColor: "linear-gradient(135deg, #003a70, #0057a3)",
          hero: { ...DEFAULT_BRAND.hero, title: "GODREJ", bgText: "GJ", tagline: "125+ Years of Trust & Innovation" },
          stats: [
            { raw: 1100, suffix: "%", decimals: 0, label: "Reach Growth" },
            { raw: 720, suffix: "%", decimals: 0, label: "Engagement / Leads" },
            { raw: 175, suffix: "%", decimals: 0, label: "CTR Lift" },
            { raw: 55, suffix: "%", decimals: 0, label: "Retention / Consistency" },
            ],
          calendar: {
            title: "Content Calendar Glimpse",
            rows: [
             { type: "Static", date: "4/1/2026", concept: "Legacy Spotlight", copy: "128 years of trust and innovation…" },
              { type: "Reel", date: "12/1/2026", concept: "Product Showcase", copy: "Engineering India's progress…" },
              { type: "Static", date: "20/1/2026", concept: "Feature Spotlight", copy: "Built for generations…" },
              ],
          },
          analytics: [
            { stat: "+1100%", label: "Reach Growth", sub: "+1100% reach growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [4, 5, 6, 7, 9, 11, 13, 15, 18, 22, 26, 30], metricA: { value: "+1100%", label: "Reach Growth" }, metricB: { value: "+720%", label: "Engagement / Leads" } },
            { stat: "+720%", label: "Engagement / Leads", sub: "+720% engagement growth", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [4, 4.4, 4.7, 5, 5.6, 6, 6.6, 7.2, 8, 8.8, 9.4, 10], metricA: { value: "+720%", label: "Engagement / Leads" }, metricB: { value: "+175%", label: "CTR Lift" } },
            { stat: "+175%", label: "CTR Lift", sub: "+175% CTR lift", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "line", points: [2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8.5, 9, 10], metricA: { value: "+175%", label: "CTR Lift" }, metricB: { value: "55%", label: "Retention / Consistency" } },
            { stat: "55%", label: "Retention / Consistency", sub: "55% retention / consistency", dateRange: "Jan 1, 2025 – Dec 31, 2025", chartType: "bar", points: [5, 5.4, 5.6, 6, 6.4, 6.8, 7.1, 7.6, 8, 8.5, 9, 9.6], metricA: { value: "55%", label: "Retention" }, metricB: { value: "+1100%", label: "Reach Growth" } },
            ],
          mom: {
            title: "Godrej — Content Planning",
            bullets: [
              "Content Roadmap Ready",
              "Product & Legacy Posts Finalised",
              "High-Engagement Content Plan (Reels, Carousels, interactive posts)",
              "Celebrating Legacy & Innovation",
              "Clear Posting Plan Set",
              "Success Metrics Defined",
              ],
          },
          gallery: {
            title: "Creative Gallery",
            images: [
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-04-at-9.55.12-AM-1.jpeg", alt: "Product post" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-04-at-9.55.12-AM-2.jpeg", alt: "Product post" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-04-at-9.55.12-AM.jpeg", alt: "Product post" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/ChatGPT-Image-Jan-3-2026-12_51_55-PM.png", alt: "Social media creative" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/ChatGPT-Image-Jan-3-2026-12_50_16-PM.png", alt: "Social media creative" },
              { src: "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/ChatGPT-Image-Jan-3-2026-12_48_38-PM.png", alt: "Social media creative" },
              ],
          },
          story: {
            title: "125+ Years of Indian Innovation",
            body: "Since 1897, the Godrej Enterprises Group has driven Indian innovation — from the world's first springless locks to engineering that supported India's space ambitions.",
            bigNum: "125+",
          },
          featured: { ...DEFAULT_BRAND.featured, glassText: "Godrej campaign — honoring 125+ years of Indian innovation." },
          philosophy: {
            ...DEFAULT_BRAND.philosophy,
            paragraphs: [
              "For Godrej, we translated 125+ years of engineering legacy into content that feels both proud and current — honoring history while speaking to today's audience.",
              "From heritage spotlights to product features, every post reinforced Godrej's role in shaping India's progress.",
              ],
          },
          delivered: {
            ...DEFAULT_BRAND.delivered,
            cards: [
              { ...DEFAULT_BRAND.delivered.cards[0], title: "Content Strategy", body: "Monthly calendar with heritage spotlights, product features and legacy storytelling." },
              { ...DEFAULT_BRAND.delivered.cards[1], title: "Growth & Analytics", body: "+1100% reach growth and +720% engagement across the campaign period." },
              ],
          },
        },
    
    
        
            
    
  
    
    
  ],
};

export function findBrand(d: BrandsData, slug: string): Brand | undefined {
  return d.items.find((b) => b.slug === slug);
}
