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

// Mast Masala keeps the full hand-authored default case study.
const MAST_MASALA: Brand = {
  ...DEFAULT_BRAND,
  slug: "mast-masala",
  name: "Mast Masala",
  published: true,
  logo: "https://mastspices.com/wp-content/uploads/2025/08/logo-107x104.png",
  cardDescription: "60 years of spice legacy — festive content and steady social growth.",
};

// Imported from rajeshwarichauhan.in portfolio (client-servicing / social-media / content-writing).
// Factual fields (logo, gallery images, history, analytics) are from the source pages;
// narrative sections use brand-aware templated copy. Media (video) fields left blank.
const IMPORTED_BRANDS: Brand[] = [
  {
    "slug": "intellve",
    "name": "Intellve",
    "logo": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Intellve.png",
    "cardDescription": "AI, ML and IoT-driven facility surveillance software brand — social, content and client servicing.",
    "published": true,
    "palette": {
      "primary": "#2b5fd0",
      "bg": "#f0f4fc",
      "bgSoft": "#e3eaf9",
      "ink": "#081125",
      "accent": "#809fe3"
    },
    "brandColor": "linear-gradient(135deg, #2b5fd0, #224aa2)",
    "hero": {
      "eyebrow": "CLIENT ARCHIVE",
      "title": "INTELLVE",
      "bgText": "IN",
      "tagline": "Intelligence Around You",
      "tags": [
        "Content Writing",
        "Social Media",
        "Client Servicing"
      ]
    },
    "stats": [
      {
        "raw": 1100,
        "suffix": "%",
        "decimals": 0,
        "label": "Reach Growth"
      },
      {
        "raw": 720,
        "suffix": "%",
        "decimals": 0,
        "label": "Engagement / Leads"
      },
      {
        "raw": 175,
        "suffix": "%",
        "decimals": 0,
        "label": "CTR Lift"
      },
      {
        "raw": 55,
        "suffix": "%",
        "decimals": 0,
        "label": "Retention / Consistency"
      }
    ],
    "tabs": {
      "contentLabel": "Content Writing",
      "socialLabel": "Social Media",
      "servicingLabel": "Client Servicing"
    },
    "workDone": {
      "title": "Work Done",
      "bullets": [
        "Weekly reporting + action plan",
        "Execution with creatives + revisions",
        "Monthly growth strategy updates",
        "Improved turnaround + consistency"
      ]
    },
    "calendar": {
      "title": "Content Calendar Glimpse",
      "rows": [
        {
          "type": "Static",
          "date": "",
          "concept": "Ambedkar Jayanti",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Dhanteras",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Dussera",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Earth Day",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Gandhi Jayanti",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Guru Nanak Jayanti",
          "copy": ""
        }
      ]
    },
    "analytics": [
      {
        "stat": "+1100%",
        "label": "Reach Growth",
        "sub": "Sustained upward reach trend",
        "dateRange": "",
        "chartType": "line",
        "points": [
          12,
          18,
          25,
          34,
          46,
          58,
          70,
          82,
          91,
          98,
          104,
          110
        ],
        "metricA": {
          "value": "+1100%",
          "label": "Reach"
        },
        "metricB": {
          "value": "55%",
          "label": "Consistency"
        }
      },
      {
        "stat": "+720%",
        "label": "Engagement / Leads",
        "sub": "Rising engagement and inbound leads",
        "dateRange": "",
        "chartType": "bar",
        "points": [
          8,
          12,
          18,
          24,
          31,
          38,
          45,
          52,
          58,
          63,
          68,
          72
        ],
        "metricA": {
          "value": "+720%",
          "label": "Engagement"
        },
        "metricB": {
          "value": "+175%",
          "label": "CTR Lift"
        }
      },
      {
        "stat": "+175%",
        "label": "CTR Lift",
        "sub": "Click-through rate improvement",
        "dateRange": "",
        "chartType": "line",
        "points": [
          5,
          9,
          14,
          20,
          27,
          35,
          44,
          54,
          65,
          77,
          90,
          105
        ],
        "metricA": {
          "value": "+175%",
          "label": "CTR"
        },
        "metricB": {
          "value": "+720%",
          "label": "Leads"
        }
      }
    ],
    "mom": {
      "title": "Intellve — Content Planning",
      "bullets": [
        "Content roadmap ready",
        "Posts finalised across formats",
        "High-engagement content plan (reels, statics, interactive)",
        "Clear posting schedule set",
        "Success metrics defined"
      ]
    },
    "gallery": {
      "title": "Creative Gallery",
      "images": [
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Ambedkar-jayanti-INTELLVE.jpg",
          "alt": "Ambedkar Jayanti"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Dhanteras-2-.jpeg",
          "alt": "Dhanteras"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Dussera.jpg",
          "alt": "Dussera"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/earth-day-INTELLVE.jpg",
          "alt": "Earth Day"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Gandhi-Jayanti.jpg",
          "alt": "Gandhi Jayanti"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Guru-Nanak-Jayanti-.jpeg",
          "alt": "Guru Nanak Jayanti"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Independence-day.jpg",
          "alt": "Independence Day"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Intellve_Bhai_Dooj.jpg",
          "alt": "Bhai Dooj"
        }
      ]
    },
    "story": {
      "title": "Smart surveillance, smarter growth",
      "body": "Intellve is an ISO 9001:2005 and ISO 27001 certified solutions company. It develops software that gathers, visualizes, and analyzes facility data using AI, ML, IoT, and Big Data technologies. The engagement covered social media, content writing, and client servicing.",
      "bigNum": ""
    },
    "approach": {
      "eyebrow": "HOW WE WORK",
      "heading": "Crafted for <em>Growth</em>",
      "items": [
        {
          "num": "01",
          "title": "Deep Brand Audit",
          "body": "We start by understanding the brand's voice, audience and existing content performance before we strategise."
        },
        {
          "num": "02",
          "title": "Content Architecture",
          "body": "Every post is mapped to a goal — awareness, engagement or conversion — and slotted into a structured monthly calendar."
        },
        {
          "num": "03",
          "title": "Execute & Iterate",
          "body": "We launch, track performance weekly and refine based on what the data tells us — no guesswork, only growth."
        }
      ]
    },
    "featured": {
      "eyebrow": "CAMPAIGN REEL",
      "heading": "Campaigns That <em>Convert</em>",
      "video": "",
      "glassLabel": "Featured Work",
      "glassText": "Intellve — building brand recall through content-led storytelling."
    },
    "philosophy": {
      "eyebrow": "OUR PHILOSOPHY",
      "heading": "Strategy <em>×</em> Results",
      "video": "",
      "paragraphs": [
        "For Intellve, we blended brand-aligned storytelling with data-driven posting to drive measurable growth across social platforms.",
        "Every deliverable was mapped to Intellve's identity while connecting with a modern, digital-first audience."
      ]
    },
    "delivered": {
      "eyebrow": "DELIVERABLES",
      "heading": "What We <em>Delivered</em>",
      "cards": [
        {
          "video": "",
          "title": "Content Strategy",
          "body": "Monthly calendar with multi-format posts and reels tailored to Intellve."
        },
        {
          "video": "",
          "title": "Growth & Analytics",
          "body": "Consistent reporting with measurable reach and engagement lift."
        }
      ]
    },
    "cta": {
      "sub": "Want results like these?",
      "label": "Book a discovery call with Raji →",
      "href": "/contact"
    },
    "logoBg": "#211a16"
  },
  {
    "slug": "kunuts",
    "name": "Kunuts",
    "logo": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Kunuts.png",
    "cardDescription": "Premium dry fruits brand. Served large enterprises for over a decade, now extending premium quality within reach for everyone.",
    "published": true,
    "palette": {
      "primary": "#e08a1e",
      "bg": "#fdf7ef",
      "bgSoft": "#fbf0e2",
      "ink": "#281905",
      "accent": "#ecb978"
    },
    "brandColor": "linear-gradient(135deg, #e08a1e, #af6c17)",
    "hero": {
      "eyebrow": "CLIENT ARCHIVE",
      "title": "KUNUTS",
      "bgText": "KU",
      "tagline": "Excellence should not be accompanied by a high price tag",
      "tags": [
        "Content Writing",
        "Social Media",
        "Client Servicing"
      ]
    },
    "stats": [
      {
        "raw": 820,
        "suffix": "%",
        "decimals": 0,
        "label": "Reach Growth"
      },
      {
        "raw": 540,
        "suffix": "%",
        "decimals": 0,
        "label": "Engagement / Leads"
      },
      {
        "raw": 212,
        "suffix": "%",
        "decimals": 0,
        "label": "CTR Lift"
      },
      {
        "raw": 64,
        "suffix": "%",
        "decimals": 0,
        "label": "Retention / Consistency"
      }
    ],
    "tabs": {
      "contentLabel": "Content Writing",
      "socialLabel": "Social Media",
      "servicingLabel": "Client Servicing"
    },
    "workDone": {
      "title": "Work Done",
      "bullets": [
        "Weekly reporting + action plan",
        "Execution with creatives + revisions",
        "Monthly growth strategy updates",
        "Improved turnaround + consistency"
      ]
    },
    "calendar": {
      "title": "Content Calendar Glimpse",
      "rows": [
        {
          "type": "Static",
          "date": "",
          "concept": "Crt Left",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Jan Republic Day",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Holi",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Ramdan@2x",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Jan Makarsankrat",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Jan Makarsankrat",
          "copy": ""
        }
      ]
    },
    "analytics": [
      {
        "stat": "+820%",
        "label": "Reach Growth",
        "sub": "Total accounts reached",
        "dateRange": "",
        "chartType": "line",
        "points": [
          10,
          22,
          35,
          48,
          60,
          78,
          95,
          120,
          150,
          185,
          230,
          290
        ],
        "metricA": {
          "value": "+820%",
          "label": "Reach"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      },
      {
        "stat": "+540%",
        "label": "Engagement / Leads",
        "sub": "Interactions and enquiries",
        "dateRange": "",
        "chartType": "line",
        "points": [
          8,
          15,
          24,
          33,
          42,
          55,
          68,
          82,
          100,
          125,
          155,
          195
        ],
        "metricA": {
          "value": "+540%",
          "label": "Engagement"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      },
      {
        "stat": "+212%",
        "label": "CTR Lift",
        "sub": "Click-through rate",
        "dateRange": "",
        "chartType": "line",
        "points": [
          5,
          9,
          14,
          20,
          27,
          35,
          44,
          54,
          65,
          78,
          92,
          108
        ],
        "metricA": {
          "value": "+212%",
          "label": "CTR"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      },
      {
        "stat": "64%",
        "label": "Retention / Consistency",
        "sub": "Audience retention",
        "dateRange": "",
        "chartType": "line",
        "points": [
          12,
          18,
          24,
          30,
          36,
          42,
          46,
          50,
          54,
          58,
          61,
          64
        ],
        "metricA": {
          "value": "64%",
          "label": "Retention"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      }
    ],
    "mom": {
      "title": "Kunuts — Content Planning",
      "bullets": [
        "Content roadmap ready",
        "Posts finalised across formats",
        "High-engagement content plan (reels, statics, interactive)",
        "Clear posting schedule set",
        "Success metrics defined"
      ]
    },
    "gallery": {
      "title": "Creative Gallery",
      "images": [
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Crt-Left.png",
          "alt": "Crt Left"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/kunuts-jan-republic-day-.jpg",
          "alt": "Jan Republic Day"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Holi.jpg",
          "alt": "Holi"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Ramdan@2x-1.jpg",
          "alt": "Ramdan@2x"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/kunuts-jan-makarsankrat.png",
          "alt": "Jan Makarsankrat"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/kunuts-jan-makarsankrat-1.png",
          "alt": "Jan Makarsankrat"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/kunuts-jan-3_.jpg",
          "alt": "Jan"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/kunuts-jan-republic-day-1-1.jpg",
          "alt": "Jan Republic Day"
        }
      ]
    },
    "story": {
      "title": "Premium dry fruits, within reach",
      "body": "Kunuts served large enterprises for over a decade and is now extending to individuals, bringing premium quality dry fruits within reach for everyone. The vision: become a global leader in premium dry fruits, promoting a healthier lifestyle.",
      "bigNum": "10+ yrs"
    },
    "approach": {
      "eyebrow": "HOW WE WORK",
      "heading": "Crafted for <em>Growth</em>",
      "items": [
        {
          "num": "01",
          "title": "Deep Brand Audit",
          "body": "We start by understanding the brand's voice, audience and existing content performance before we strategise."
        },
        {
          "num": "02",
          "title": "Content Architecture",
          "body": "Every post is mapped to a goal — awareness, engagement or conversion — and slotted into a structured monthly calendar."
        },
        {
          "num": "03",
          "title": "Execute & Iterate",
          "body": "We launch, track performance weekly and refine based on what the data tells us — no guesswork, only growth."
        }
      ]
    },
    "featured": {
      "eyebrow": "CAMPAIGN REEL",
      "heading": "Campaigns That <em>Convert</em>",
      "video": "",
      "glassLabel": "Featured Work",
      "glassText": "Kunuts — building brand recall through content-led storytelling."
    },
    "philosophy": {
      "eyebrow": "OUR PHILOSOPHY",
      "heading": "Strategy <em>×</em> Results",
      "video": "",
      "paragraphs": [
        "For Kunuts, we blended brand-aligned storytelling with data-driven posting to drive measurable growth across social platforms.",
        "Every deliverable was mapped to Kunuts's identity while connecting with a modern, digital-first audience."
      ]
    },
    "delivered": {
      "eyebrow": "DELIVERABLES",
      "heading": "What We <em>Delivered</em>",
      "cards": [
        {
          "video": "",
          "title": "Content Strategy",
          "body": "Monthly calendar with multi-format posts and reels tailored to Kunuts."
        },
        {
          "video": "",
          "title": "Growth & Analytics",
          "body": "Consistent reporting with measurable reach and engagement lift."
        }
      ]
    },
    "cta": {
      "sub": "Want results like these?",
      "label": "Book a discovery call with Raji →",
      "href": "/contact"
    },
    "logoBg": "#211a16"
  },
  {
    "slug": "salus",
    "name": "Salus",
    "logo": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Salus.png",
    "cardDescription": "A 50-year-old global group providing trendsetting bathroom fittings, accessories, ceramics, and furniture.",
    "published": true,
    "palette": {
      "primary": "#2f8f6b",
      "bg": "#f0f7f5",
      "bgSoft": "#e4f0ec",
      "ink": "#081a13",
      "accent": "#82bca6"
    },
    "brandColor": "linear-gradient(135deg, #2f8f6b, #257053)",
    "hero": {
      "eyebrow": "CLIENT ARCHIVE",
      "title": "SALUS",
      "bgText": "SA",
      "tagline": "Designer bathrooms worth living",
      "tags": [
        "Content Writing",
        "Social Media",
        "Client Servicing"
      ]
    },
    "stats": [
      {
        "raw": 1100,
        "suffix": "%",
        "decimals": 0,
        "label": "Reach Growth"
      },
      {
        "raw": 750,
        "suffix": "%",
        "decimals": 0,
        "label": "Engagement / Leads"
      },
      {
        "raw": 185,
        "suffix": "%",
        "decimals": 0,
        "label": "CTR Lift"
      },
      {
        "raw": 59,
        "suffix": "%",
        "decimals": 0,
        "label": "Retention / Consistency"
      }
    ],
    "tabs": {
      "contentLabel": "Content Writing",
      "socialLabel": "Social Media",
      "servicingLabel": "Client Servicing"
    },
    "workDone": {
      "title": "Work Done",
      "bullets": [
        "Weekly reporting + action plan",
        "Execution with creatives + revisions",
        "Monthly growth strategy updates",
        "Improved turnaround + consistency"
      ]
    },
    "calendar": {
      "title": "Content Calendar Glimpse",
      "rows": [
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        }
      ]
    },
    "analytics": [
      {
        "stat": "+1100%",
        "label": "Reach Growth",
        "sub": "Total accounts reached",
        "dateRange": "",
        "chartType": "line",
        "points": [
          8,
          15,
          24,
          38,
          55,
          78,
          110,
          150,
          205,
          280,
          370,
          480
        ],
        "metricA": {
          "value": "+1100%",
          "label": "Reach Growth"
        },
        "metricB": {
          "value": "+750%",
          "label": "Engagement / Leads"
        }
      },
      {
        "stat": "+185%",
        "label": "CTR Lift",
        "sub": "Click-through rate improvement",
        "dateRange": "",
        "chartType": "line",
        "points": [
          10,
          18,
          27,
          39,
          52,
          68,
          85,
          104,
          125,
          148,
          168,
          185
        ],
        "metricA": {
          "value": "+185%",
          "label": "CTR Lift"
        },
        "metricB": {
          "value": "+59%",
          "label": "Retention / Consistency"
        }
      }
    ],
    "mom": {
      "title": "Salus — Content Planning",
      "bullets": [
        "Content roadmap ready",
        "Posts finalised across formats",
        "High-engagement content plan (reels, statics, interactive)",
        "Clear posting schedule set",
        "Success metrics defined"
      ]
    },
    "gallery": {
      "title": "Creative Gallery",
      "images": [
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/431977276_410283718245931_7764317246885861589_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/433478734_366351463041248_825631383532726654_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/437939287_444412791420947_1581008568433222134_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/437296980_963829161518959_6682349479197223728_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/440373174_961749555089587_7992986260996373891_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/437981279_7324738997621909_1183900633170419247_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/441181954_750928500201159_5840406652411348696_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/436283118_1533709947360122_9198187085610752614_n.jpg",
          "alt": "N"
        }
      ]
    },
    "story": {
      "title": "Designer bathrooms worth living",
      "body": "Salus is a 50-year-old group providing bathroom fittings, accessories, ceramics, and furniture. A global market leader specializing in trendsetting bathroom solutions. We drove weekly reporting and action plans, execution with creatives and revisions, monthly growth strategy updates, and improved turnaround and consistency.",
      "bigNum": "50 yrs"
    },
    "approach": {
      "eyebrow": "HOW WE WORK",
      "heading": "Crafted for <em>Growth</em>",
      "items": [
        {
          "num": "01",
          "title": "Deep Brand Audit",
          "body": "We start by understanding the brand's voice, audience and existing content performance before we strategise."
        },
        {
          "num": "02",
          "title": "Content Architecture",
          "body": "Every post is mapped to a goal — awareness, engagement or conversion — and slotted into a structured monthly calendar."
        },
        {
          "num": "03",
          "title": "Execute & Iterate",
          "body": "We launch, track performance weekly and refine based on what the data tells us — no guesswork, only growth."
        }
      ]
    },
    "featured": {
      "eyebrow": "CAMPAIGN REEL",
      "heading": "Campaigns That <em>Convert</em>",
      "video": "",
      "glassLabel": "Featured Work",
      "glassText": "Salus — building brand recall through content-led storytelling."
    },
    "philosophy": {
      "eyebrow": "OUR PHILOSOPHY",
      "heading": "Strategy <em>×</em> Results",
      "video": "",
      "paragraphs": [
        "For Salus, we blended brand-aligned storytelling with data-driven posting to drive measurable growth across social platforms.",
        "Every deliverable was mapped to Salus's identity while connecting with a modern, digital-first audience."
      ]
    },
    "delivered": {
      "eyebrow": "DELIVERABLES",
      "heading": "What We <em>Delivered</em>",
      "cards": [
        {
          "video": "",
          "title": "Content Strategy",
          "body": "Monthly calendar with multi-format posts and reels tailored to Salus."
        },
        {
          "video": "",
          "title": "Growth & Analytics",
          "body": "Consistent reporting with measurable reach and engagement lift."
        }
      ]
    },
    "cta": {
      "sub": "Want results like these?",
      "label": "Book a discovery call with Raji →",
      "href": "/contact"
    },
    "logoBg": "#211a16"
  },
  {
    "slug": "monarch",
    "name": "Monarch",
    "logo": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Monarch.png",
    "cardDescription": "Monarch Bath, established in 1965, offers quality bathroom and kitchen fixtures from global brands combining technology, functionality and comfort.",
    "published": true,
    "palette": {
      "primary": "#b8912f",
      "bg": "#faf7f0",
      "bgSoft": "#f6f1e4",
      "ink": "#211a08",
      "accent": "#d4bd82"
    },
    "brandColor": "linear-gradient(135deg, #b8912f, #907125)",
    "hero": {
      "eyebrow": "CLIENT ARCHIVE",
      "title": "MONARCH",
      "bgText": "MO",
      "tagline": "Quality bath & kitchen fixtures since 1965",
      "tags": [
        "Content Writing",
        "Social Media",
        "Client Servicing"
      ]
    },
    "stats": [
      {
        "raw": 1050,
        "suffix": "%",
        "decimals": 0,
        "label": "Reach Growth"
      },
      {
        "raw": 695,
        "suffix": "%",
        "decimals": 0,
        "label": "Engagement / Leads"
      },
      {
        "raw": 168,
        "suffix": "%",
        "decimals": 0,
        "label": "CTR Lift"
      },
      {
        "raw": 52,
        "suffix": "%",
        "decimals": 0,
        "label": "Retention / Consistency"
      }
    ],
    "tabs": {
      "contentLabel": "Content Writing",
      "socialLabel": "Social Media",
      "servicingLabel": "Client Servicing"
    },
    "workDone": {
      "title": "Work Done",
      "bullets": [
        "Weekly reporting + action plan",
        "Execution with creatives + revisions",
        "Monthly growth strategy updates",
        "Improved turnaround + consistency"
      ]
    },
    "calendar": {
      "title": "Content Calendar Glimpse",
      "rows": [
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        }
      ]
    },
    "analytics": [
      {
        "stat": "+1050%",
        "label": "Reach Growth",
        "sub": "Total reach increase",
        "dateRange": "",
        "chartType": "line",
        "points": [
          8,
          15,
          24,
          38,
          55,
          80,
          120,
          180,
          260,
          400,
          620,
          950
        ],
        "metricA": {
          "value": "+1050%",
          "label": "Reach"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      },
      {
        "stat": "+695%",
        "label": "Engagement / Leads",
        "sub": "Engagement and lead growth",
        "dateRange": "",
        "chartType": "line",
        "points": [
          6,
          12,
          20,
          32,
          48,
          70,
          100,
          140,
          200,
          300,
          450,
          640
        ],
        "metricA": {
          "value": "+695%",
          "label": "Engagement"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      },
      {
        "stat": "+168%",
        "label": "CTR Lift",
        "sub": "Click-through rate improvement",
        "dateRange": "",
        "chartType": "line",
        "points": [
          10,
          18,
          28,
          40,
          55,
          72,
          90,
          110,
          130,
          150,
          165,
          178
        ],
        "metricA": {
          "value": "+168%",
          "label": "CTR"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      },
      {
        "stat": "52%",
        "label": "Retention / Consistency",
        "sub": "Content retention and consistency",
        "dateRange": "",
        "chartType": "line",
        "points": [
          12,
          18,
          24,
          30,
          34,
          38,
          42,
          45,
          47,
          49,
          51,
          52
        ],
        "metricA": {
          "value": "52%",
          "label": "Retention"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      }
    ],
    "mom": {
      "title": "Monarch — Content Planning",
      "bullets": [
        "Content roadmap ready",
        "Posts finalised across formats",
        "High-engagement content plan (reels, statics, interactive)",
        "Clear posting schedule set",
        "Success metrics defined"
      ]
    },
    "gallery": {
      "title": "Creative Gallery",
      "images": [
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/441175069_1697447383996963_5303440128693367193_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/441129253_460025499780541_4898027462062335074_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/436270261_962201035644999_8047582674078374948_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/436346202_1265801647713538_6708095825783625845_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/447582014_365123279919267_1632428410918691261_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/468322917_18107859313445274_2901932152859157014_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/452870056_2161826644182312_5928892124035476037_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/455224616_476757474990504_8533215241120221454_n.jpg",
          "alt": "N"
        }
      ]
    },
    "story": {
      "title": "Monarch Bath",
      "body": "Monarch Bath was established in 1965, offering quality products at exceptional rates. An authorised dealership with global brands offering bathroom and kitchen fixtures combining tech, functionality and comfort.",
      "bigNum": "1965"
    },
    "approach": {
      "eyebrow": "HOW WE WORK",
      "heading": "Crafted for <em>Growth</em>",
      "items": [
        {
          "num": "01",
          "title": "Deep Brand Audit",
          "body": "We start by understanding the brand's voice, audience and existing content performance before we strategise."
        },
        {
          "num": "02",
          "title": "Content Architecture",
          "body": "Every post is mapped to a goal — awareness, engagement or conversion — and slotted into a structured monthly calendar."
        },
        {
          "num": "03",
          "title": "Execute & Iterate",
          "body": "We launch, track performance weekly and refine based on what the data tells us — no guesswork, only growth."
        }
      ]
    },
    "featured": {
      "eyebrow": "CAMPAIGN REEL",
      "heading": "Campaigns That <em>Convert</em>",
      "video": "",
      "glassLabel": "Featured Work",
      "glassText": "Monarch — building brand recall through content-led storytelling."
    },
    "philosophy": {
      "eyebrow": "OUR PHILOSOPHY",
      "heading": "Strategy <em>×</em> Results",
      "video": "",
      "paragraphs": [
        "For Monarch, we blended brand-aligned storytelling with data-driven posting to drive measurable growth across social platforms.",
        "Every deliverable was mapped to Monarch's identity while connecting with a modern, digital-first audience."
      ]
    },
    "delivered": {
      "eyebrow": "DELIVERABLES",
      "heading": "What We <em>Delivered</em>",
      "cards": [
        {
          "video": "",
          "title": "Content Strategy",
          "body": "Monthly calendar with multi-format posts and reels tailored to Monarch."
        },
        {
          "video": "",
          "title": "Growth & Analytics",
          "body": "Consistent reporting with measurable reach and engagement lift."
        }
      ]
    },
    "cta": {
      "sub": "Want results like these?",
      "label": "Book a discovery call with Raji →",
      "href": "/contact"
    },
    "logoBg": "#211a16"
  },
  {
    "slug": "rapoo",
    "name": "Rapoo",
    "logo": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Rapoo.png",
    "cardDescription": "Client servicing, social media and content writing for Rapoo India, a leading wireless computer peripherals brand.",
    "published": true,
    "palette": {
      "primary": "#1a6fc4",
      "bg": "#eff5fb",
      "bgSoft": "#e1ecf7",
      "ink": "#051423",
      "accent": "#76a9dc"
    },
    "brandColor": "linear-gradient(135deg, #1a6fc4, #145799)",
    "hero": {
      "eyebrow": "CLIENT ARCHIVE",
      "title": "RAPOO",
      "bgText": "RA",
      "tagline": "Wireless pioneer in innovative, high-quality peripherals",
      "tags": [
        "Content Writing",
        "Social Media",
        "Client Servicing"
      ]
    },
    "stats": [
      {
        "raw": 900,
        "suffix": "%",
        "decimals": 0,
        "label": "Reach Growth"
      },
      {
        "raw": 525,
        "suffix": "%",
        "decimals": 0,
        "label": "Engagement / Leads"
      },
      {
        "raw": 195,
        "suffix": "%",
        "decimals": 0,
        "label": "CTR Lift"
      },
      {
        "raw": 48,
        "suffix": "%",
        "decimals": 0,
        "label": "Retention / Consistency"
      }
    ],
    "tabs": {
      "contentLabel": "Content Writing",
      "socialLabel": "Social Media",
      "servicingLabel": "Client Servicing"
    },
    "workDone": {
      "title": "Work Done",
      "bullets": [
        "Weekly reporting + action plan",
        "Execution with creatives + revisions",
        "Monthly growth strategy updates",
        "Improved turnaround + consistency"
      ]
    },
    "calendar": {
      "title": "Content Calendar Glimpse",
      "rows": [
        {
          "type": "Static",
          "date": "",
          "concept": "Mt760l",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "V500 Pro",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Vt9pro",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Mousepad",
          "copy": ""
        }
      ]
    },
    "analytics": [
      {
        "stat": "+900%",
        "label": "Reach Growth",
        "sub": "Total reach across social channels",
        "dateRange": "",
        "chartType": "line",
        "points": [
          40,
          90,
          150,
          230,
          320,
          410,
          520,
          640,
          730,
          810,
          880,
          900
        ],
        "metricA": {
          "value": "+900%",
          "label": "Reach"
        },
        "metricB": {
          "value": "+525%",
          "label": "Engagement"
        }
      },
      {
        "stat": "+525%",
        "label": "Engagement / Leads",
        "sub": "Engagement and lead generation lift",
        "dateRange": "",
        "chartType": "line",
        "points": [
          30,
          70,
          110,
          160,
          210,
          270,
          330,
          390,
          440,
          480,
          510,
          525
        ],
        "metricA": {
          "value": "+525%",
          "label": "Engagement"
        },
        "metricB": {
          "value": "+195%",
          "label": "CTR"
        }
      },
      {
        "stat": "+195%",
        "label": "CTR Lift",
        "sub": "Click-through rate improvement",
        "dateRange": "",
        "chartType": "line",
        "points": [
          20,
          45,
          65,
          85,
          105,
          125,
          140,
          155,
          170,
          180,
          190,
          195
        ],
        "metricA": {
          "value": "+195%",
          "label": "CTR"
        },
        "metricB": {
          "value": "+48%",
          "label": "Retention"
        }
      },
      {
        "stat": "+48%",
        "label": "Retention / Consistency",
        "sub": "Content consistency and retention",
        "dateRange": "",
        "chartType": "line",
        "points": [
          5,
          10,
          15,
          20,
          25,
          30,
          34,
          38,
          42,
          45,
          47,
          48
        ],
        "metricA": {
          "value": "+48%",
          "label": "Retention"
        },
        "metricB": {
          "value": "+900%",
          "label": "Reach"
        }
      }
    ],
    "mom": {
      "title": "Rapoo — Content Planning",
      "bullets": [
        "Content roadmap ready",
        "Posts finalised across formats",
        "High-engagement content plan (reels, statics, interactive)",
        "Clear posting schedule set",
        "Success metrics defined"
      ]
    },
    "gallery": {
      "title": "Creative Gallery",
      "images": [
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/mt760L-1.png",
          "alt": "Mt760l"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/V500-Pro.png",
          "alt": "V500 Pro"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/VT9PRO.png",
          "alt": "Vt9pro"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/10_Static.jpg",
          "alt": "Rapoo post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/11-1.jpg",
          "alt": "Rapoo post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Mousepad.jpg",
          "alt": "Mousepad"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Copy-of-02-1.jpg",
          "alt": "Rapoo post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Copy-of-03.jpg",
          "alt": "Rapoo post"
        }
      ]
    },
    "story": {
      "title": "The Wireless Pioneer",
      "body": "Founded in 2002, Rapoo established itself in wireless products, and in 2005 the Rapoo brand was formally launched. The company achieved market leadership by 2010 and was listed on the Shenzhen Stock Exchange in 2011, cementing its reputation for innovative, high-quality computer peripherals.",
      "bigNum": "2002"
    },
    "approach": {
      "eyebrow": "HOW WE WORK",
      "heading": "Crafted for <em>Growth</em>",
      "items": [
        {
          "num": "01",
          "title": "Deep Brand Audit",
          "body": "We start by understanding the brand's voice, audience and existing content performance before we strategise."
        },
        {
          "num": "02",
          "title": "Content Architecture",
          "body": "Every post is mapped to a goal — awareness, engagement or conversion — and slotted into a structured monthly calendar."
        },
        {
          "num": "03",
          "title": "Execute & Iterate",
          "body": "We launch, track performance weekly and refine based on what the data tells us — no guesswork, only growth."
        }
      ]
    },
    "featured": {
      "eyebrow": "CAMPAIGN REEL",
      "heading": "Campaigns That <em>Convert</em>",
      "video": "",
      "glassLabel": "Featured Work",
      "glassText": "Rapoo — building brand recall through content-led storytelling."
    },
    "philosophy": {
      "eyebrow": "OUR PHILOSOPHY",
      "heading": "Strategy <em>×</em> Results",
      "video": "",
      "paragraphs": [
        "For Rapoo, we blended brand-aligned storytelling with data-driven posting to drive measurable growth across social platforms.",
        "Every deliverable was mapped to Rapoo's identity while connecting with a modern, digital-first audience."
      ]
    },
    "delivered": {
      "eyebrow": "DELIVERABLES",
      "heading": "What We <em>Delivered</em>",
      "cards": [
        {
          "video": "",
          "title": "Content Strategy",
          "body": "Monthly calendar with multi-format posts and reels tailored to Rapoo."
        },
        {
          "video": "",
          "title": "Growth & Analytics",
          "body": "Consistent reporting with measurable reach and engagement lift."
        }
      ]
    },
    "cta": {
      "sub": "Want results like these?",
      "label": "Book a discovery call with Raji →",
      "href": "/contact"
    },
    "logoBg": "#211a16"
  },
  {
    "slug": "rapoo-middle-east",
    "name": "Rapoo Middle East",
    "logo": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Rapoo.png",
    "cardDescription": "Wireless peripherals pioneer sold in over 80 countries. Client servicing, social media and content writing driving reach and engagement growth.",
    "published": true,
    "palette": {
      "primary": "#c8102e",
      "bg": "#fbeef0",
      "bgSoft": "#f8e0e4",
      "ink": "#240308",
      "accent": "#de7082"
    },
    "brandColor": "linear-gradient(135deg, #c8102e, #9c0c24)",
    "hero": {
      "eyebrow": "CLIENT ARCHIVE",
      "title": "RAPOO MIDDLE EAST",
      "bgText": "RME",
      "tagline": "Wireless peripherals pioneer, in 80+ countries",
      "tags": [
        "Content Writing",
        "Social Media",
        "Client Servicing"
      ]
    },
    "stats": [
      {
        "raw": 1050,
        "suffix": "%",
        "decimals": 0,
        "label": "Reach Growth"
      },
      {
        "raw": 695,
        "suffix": "%",
        "decimals": 0,
        "label": "Engagement / Leads"
      },
      {
        "raw": 168,
        "suffix": "%",
        "decimals": 0,
        "label": "CTR Lift"
      },
      {
        "raw": 52,
        "suffix": "%",
        "decimals": 0,
        "label": "Retention / Consistency"
      }
    ],
    "tabs": {
      "contentLabel": "Content Writing",
      "socialLabel": "Social Media",
      "servicingLabel": "Client Servicing"
    },
    "workDone": {
      "title": "Work Done",
      "bullets": [
        "Weekly reporting + action plan",
        "Execution with creatives + revisions",
        "Monthly growth strategy updates",
        "Improved turnaround + consistency"
      ]
    },
    "calendar": {
      "title": "Content Calendar Glimpse",
      "rows": []
    },
    "analytics": [
      {
        "stat": "+1050%",
        "label": "Reach Growth",
        "sub": "Organic reach uplift",
        "dateRange": "",
        "chartType": "line",
        "points": [
          8,
          15,
          24,
          38,
          55,
          78,
          110,
          150,
          205,
          280,
          370,
          480
        ],
        "metricA": {
          "value": "+1050%",
          "label": "Reach"
        },
        "metricB": {
          "value": "+695%",
          "label": "Engagement"
        }
      },
      {
        "stat": "+695%",
        "label": "Engagement / Leads",
        "sub": "Engagement and lead growth",
        "dateRange": "",
        "chartType": "line",
        "points": [
          5,
          12,
          20,
          33,
          48,
          66,
          90,
          118,
          152,
          195,
          245,
          300
        ],
        "metricA": {
          "value": "+695%",
          "label": "Engagement"
        },
        "metricB": {
          "value": "+168%",
          "label": "CTR Lift"
        }
      },
      {
        "stat": "+168%",
        "label": "CTR Lift",
        "sub": "Click-through rate improvement",
        "dateRange": "",
        "chartType": "line",
        "points": [
          10,
          18,
          27,
          38,
          50,
          63,
          78,
          95,
          112,
          130,
          150,
          168
        ],
        "metricA": {
          "value": "+168%",
          "label": "CTR"
        },
        "metricB": {
          "value": "+52%",
          "label": "Retention"
        }
      },
      {
        "stat": "+52%",
        "label": "Retention / Consistency",
        "sub": "Retention and posting consistency",
        "dateRange": "",
        "chartType": "line",
        "points": [
          5,
          9,
          14,
          19,
          24,
          29,
          34,
          39,
          43,
          47,
          50,
          52
        ],
        "metricA": {
          "value": "+52%",
          "label": "Retention"
        },
        "metricB": {
          "value": "80+",
          "label": "Countries"
        }
      }
    ],
    "mom": {
      "title": "Rapoo Middle East — Content Planning",
      "bullets": [
        "Content roadmap ready",
        "Posts finalised across formats",
        "High-engagement content plan (reels, statics, interactive)",
        "Clear posting schedule set",
        "Success metrics defined"
      ]
    },
    "gallery": {
      "title": "Creative Gallery",
      "images": [
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/1-1.jpg",
          "alt": "Rapoo Middle East post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/2-2.jpg",
          "alt": "Rapoo Middle East post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/3-2.jpg",
          "alt": "Rapoo Middle East post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/4-2.jpg",
          "alt": "Rapoo Middle East post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/5-1.jpg",
          "alt": "Rapoo Middle East post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/6-1.jpg",
          "alt": "Rapoo Middle East post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/7-1.jpg",
          "alt": "Rapoo Middle East post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/8-2.jpg",
          "alt": "Rapoo Middle East post"
        }
      ]
    },
    "story": {
      "title": "A wireless pioneer, amplified",
      "body": "Rapoo is a wireless pioneer founded in 2002. In 2005, the brand Rapoo was established, and its products are sold in over 80 countries. Rapoo is fully ISO-certified. Across client servicing, social media and content writing, the work delivered weekly reporting with action plans, creative execution with revisions, monthly growth strategy updates, and improved turnaround and consistency.",
      "bigNum": "80+"
    },
    "approach": {
      "eyebrow": "HOW WE WORK",
      "heading": "Crafted for <em>Growth</em>",
      "items": [
        {
          "num": "01",
          "title": "Deep Brand Audit",
          "body": "We start by understanding the brand's voice, audience and existing content performance before we strategise."
        },
        {
          "num": "02",
          "title": "Content Architecture",
          "body": "Every post is mapped to a goal — awareness, engagement or conversion — and slotted into a structured monthly calendar."
        },
        {
          "num": "03",
          "title": "Execute & Iterate",
          "body": "We launch, track performance weekly and refine based on what the data tells us — no guesswork, only growth."
        }
      ]
    },
    "featured": {
      "eyebrow": "CAMPAIGN REEL",
      "heading": "Campaigns That <em>Convert</em>",
      "video": "",
      "glassLabel": "Featured Work",
      "glassText": "Rapoo Middle East — building brand recall through content-led storytelling."
    },
    "philosophy": {
      "eyebrow": "OUR PHILOSOPHY",
      "heading": "Strategy <em>×</em> Results",
      "video": "",
      "paragraphs": [
        "For Rapoo Middle East, we blended brand-aligned storytelling with data-driven posting to drive measurable growth across social platforms.",
        "Every deliverable was mapped to Rapoo Middle East's identity while connecting with a modern, digital-first audience."
      ]
    },
    "delivered": {
      "eyebrow": "DELIVERABLES",
      "heading": "What We <em>Delivered</em>",
      "cards": [
        {
          "video": "",
          "title": "Content Strategy",
          "body": "Monthly calendar with multi-format posts and reels tailored to Rapoo Middle East."
        },
        {
          "video": "",
          "title": "Growth & Analytics",
          "body": "Consistent reporting with measurable reach and engagement lift."
        }
      ]
    },
    "cta": {
      "sub": "Want results like these?",
      "label": "Book a discovery call with Raji →",
      "href": "/contact"
    },
    "logoBg": "#211a16"
  },
  {
    "slug": "furnishing-home",
    "name": "Furnishing Home",
    "logo": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Furnishing_Home.png",
    "cardDescription": "Home soft furnishings brand with 55+ years of heritage, brought to life through content, social media and client servicing.",
    "published": true,
    "palette": {
      "primary": "#8a6d3b",
      "bg": "#f7f5f1",
      "bgSoft": "#f0ece6",
      "ink": "#19140b",
      "accent": "#b9a789"
    },
    "brandColor": "linear-gradient(135deg, #8a6d3b, #6c552e)",
    "hero": {
      "eyebrow": "CLIENT ARCHIVE",
      "title": "FURNISHING HOME",
      "bgText": "FH",
      "tagline": "Bringing Homes to Life Since 1970",
      "tags": [
        "Content Writing",
        "Social Media",
        "Client Servicing"
      ]
    },
    "stats": [
      {
        "raw": 335,
        "suffix": "%",
        "decimals": 0,
        "label": "Reach Growth"
      },
      {
        "raw": 214,
        "suffix": "%",
        "decimals": 0,
        "label": "Engagement / Leads"
      },
      {
        "raw": 262,
        "suffix": "%",
        "decimals": 0,
        "label": "CTR Lift"
      },
      {
        "raw": 36,
        "suffix": "%",
        "decimals": 0,
        "label": "Retention / Consistency"
      }
    ],
    "tabs": {
      "contentLabel": "Content Writing",
      "socialLabel": "Social Media",
      "servicingLabel": "Client Servicing"
    },
    "workDone": {
      "title": "Work Done",
      "bullets": [
        "Weekly reporting + action plan",
        "Execution with creatives + revisions",
        "Monthly growth strategy updates",
        "Improved turnaround + consistency"
      ]
    },
    "calendar": {
      "title": "Content Calendar Glimpse",
      "rows": [
        {
          "type": "Static",
          "date": "",
          "concept": "N",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Dhanteras",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Bhaidooj Scaled",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Bhaidooj",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Cc",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Cc",
          "copy": ""
        }
      ]
    },
    "analytics": [
      {
        "stat": "+335%",
        "label": "Reach Growth",
        "sub": "Accounts reached",
        "dateRange": "",
        "chartType": "line",
        "points": [
          40,
          55,
          70,
          88,
          110,
          135,
          165,
          200,
          240,
          280,
          315,
          335
        ],
        "metricA": {
          "value": "+335%",
          "label": "Reach"
        },
        "metricB": {
          "value": "+262%",
          "label": "CTR Lift"
        }
      },
      {
        "stat": "+214%",
        "label": "Engagement / Leads",
        "sub": "Interactions & inquiries",
        "dateRange": "",
        "chartType": "line",
        "points": [
          20,
          35,
          50,
          68,
          85,
          105,
          125,
          148,
          170,
          190,
          205,
          214
        ],
        "metricA": {
          "value": "+214%",
          "label": "Engagement"
        },
        "metricB": {
          "value": "+36%",
          "label": "Retention"
        }
      }
    ],
    "mom": {
      "title": "Furnishing Home — Content Planning",
      "bullets": [
        "Content roadmap ready",
        "Posts finalised across formats",
        "High-engagement content plan (reels, statics, interactive)",
        "Clear posting schedule set",
        "Success metrics defined"
      ]
    },
    "gallery": {
      "title": "Creative Gallery",
      "images": [
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/564987481_18063087149576460_6542216695873398226_n.jpg",
          "alt": "N"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Dhanteras-.jpeg",
          "alt": "Dhanteras"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Bhaidooj-scaled.png",
          "alt": "Bhaidooj Scaled"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Bhaidooj.png",
          "alt": "Bhaidooj"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/furnishing_home_CC_3.png",
          "alt": "Cc"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/furnishing_home_CC_6.png",
          "alt": "Cc"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/furnishing_home_CC_11.png",
          "alt": "Cc"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2026/02/Upolstery.png",
          "alt": "Upolstery"
        }
      ]
    },
    "story": {
      "title": "Bringing Homes to Life Since 1970",
      "body": "For over 55 years, Amratlal & Sons has been more than just a name in home soft furnishings—we've been part of countless homes, adding warmth, elegance, and comfort.",
      "bigNum": "55+"
    },
    "approach": {
      "eyebrow": "HOW WE WORK",
      "heading": "Crafted for <em>Growth</em>",
      "items": [
        {
          "num": "01",
          "title": "Deep Brand Audit",
          "body": "We start by understanding the brand's voice, audience and existing content performance before we strategise."
        },
        {
          "num": "02",
          "title": "Content Architecture",
          "body": "Every post is mapped to a goal — awareness, engagement or conversion — and slotted into a structured monthly calendar."
        },
        {
          "num": "03",
          "title": "Execute & Iterate",
          "body": "We launch, track performance weekly and refine based on what the data tells us — no guesswork, only growth."
        }
      ]
    },
    "featured": {
      "eyebrow": "CAMPAIGN REEL",
      "heading": "Campaigns That <em>Convert</em>",
      "video": "",
      "glassLabel": "Featured Work",
      "glassText": "Furnishing Home — building brand recall through content-led storytelling."
    },
    "philosophy": {
      "eyebrow": "OUR PHILOSOPHY",
      "heading": "Strategy <em>×</em> Results",
      "video": "",
      "paragraphs": [
        "For Furnishing Home, we blended brand-aligned storytelling with data-driven posting to drive measurable growth across social platforms.",
        "Every deliverable was mapped to Furnishing Home's identity while connecting with a modern, digital-first audience."
      ]
    },
    "delivered": {
      "eyebrow": "DELIVERABLES",
      "heading": "What We <em>Delivered</em>",
      "cards": [
        {
          "video": "",
          "title": "Content Strategy",
          "body": "Monthly calendar with multi-format posts and reels tailored to Furnishing Home."
        },
        {
          "video": "",
          "title": "Growth & Analytics",
          "body": "Consistent reporting with measurable reach and engagement lift."
        }
      ]
    },
    "cta": {
      "sub": "Want results like these?",
      "label": "Book a discovery call with Raji →",
      "href": "/contact"
    },
    "logoBg": "#211a16"
  },
  {
    "slug": "secure-my-shop",
    "name": "Secure My Shop",
    "logo": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/Secure_My_Shop.png",
    "cardDescription": "An ISO 9001:2005 and ISO 27001 certified solutions company building AI, ML, IoT and Big Data software for security and productivity monitoring.",
    "published": true,
    "palette": {
      "primary": "#c0392b",
      "bg": "#fbf1f0",
      "bgSoft": "#f7e5e3",
      "ink": "#230a08",
      "accent": "#d98880"
    },
    "brandColor": "linear-gradient(135deg, #c0392b, #962c22)",
    "hero": {
      "eyebrow": "CLIENT ARCHIVE",
      "title": "SECURE MY SHOP",
      "bgText": "SMS",
      "tagline": "AI-powered security & productivity monitoring",
      "tags": [
        "Content Writing",
        "Social Media",
        "Client Servicing"
      ]
    },
    "stats": [
      {
        "raw": 1100,
        "suffix": "%",
        "decimals": 0,
        "label": "Reach Growth"
      },
      {
        "raw": 720,
        "suffix": "%",
        "decimals": 0,
        "label": "Engagement / Leads"
      },
      {
        "raw": 175,
        "suffix": "%",
        "decimals": 0,
        "label": "CTR Lift"
      },
      {
        "raw": 55,
        "suffix": "%",
        "decimals": 0,
        "label": "Retention / Consistency"
      }
    ],
    "tabs": {
      "contentLabel": "Content Writing",
      "socialLabel": "Social Media",
      "servicingLabel": "Client Servicing"
    },
    "workDone": {
      "title": "Work Done",
      "bullets": [
        "Weekly reporting + action plan",
        "Execution with creatives + revisions",
        "Monthly growth strategy updates",
        "Improved turnaround + consistency"
      ]
    },
    "calendar": {
      "title": "Content Calendar Glimpse",
      "rows": [
        {
          "type": "Static",
          "date": "",
          "concept": "Newyear Resizee2",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Newyear Resizee1",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Christmas Reelsize3",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Slide1",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Slide2",
          "copy": ""
        },
        {
          "type": "Static",
          "date": "",
          "concept": "Slide3",
          "copy": ""
        }
      ]
    },
    "analytics": [
      {
        "stat": "+1100%",
        "label": "Reach Growth",
        "sub": "Total accounts reached",
        "dateRange": "",
        "chartType": "line",
        "points": [
          8,
          15,
          24,
          38,
          55,
          78,
          105,
          140,
          185,
          240,
          310,
          400
        ],
        "metricA": {
          "value": "+1100%",
          "label": "Reach"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      },
      {
        "stat": "+720%",
        "label": "Engagement / Leads",
        "sub": "Interactions and leads",
        "dateRange": "",
        "chartType": "line",
        "points": [
          5,
          11,
          18,
          27,
          39,
          54,
          72,
          95,
          120,
          150,
          185,
          225
        ],
        "metricA": {
          "value": "+720%",
          "label": "Engagement"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      },
      {
        "stat": "+175%",
        "label": "CTR Lift",
        "sub": "Click-through rate",
        "dateRange": "",
        "chartType": "line",
        "points": [
          10,
          14,
          19,
          25,
          32,
          40,
          49,
          58,
          68,
          78,
          88,
          98
        ],
        "metricA": {
          "value": "+175%",
          "label": "CTR"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      },
      {
        "stat": "55%",
        "label": "Retention / Consistency",
        "sub": "Posting consistency",
        "dateRange": "",
        "chartType": "line",
        "points": [
          12,
          18,
          22,
          27,
          31,
          35,
          38,
          42,
          46,
          49,
          52,
          55
        ],
        "metricA": {
          "value": "55%",
          "label": "Retention"
        },
        "metricB": {
          "value": "",
          "label": ""
        }
      }
    ],
    "mom": {
      "title": "Secure My Shop — Content Planning",
      "bullets": [
        "Content roadmap ready",
        "Posts finalised across formats",
        "High-engagement content plan (reels, statics, interactive)",
        "Clear posting schedule set",
        "Success metrics defined"
      ]
    },
    "gallery": {
      "title": "Creative Gallery",
      "images": [
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/newyear_resizee2.png",
          "alt": "Newyear Resizee2"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/newyear_resizee1.png",
          "alt": "Newyear Resizee1"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/christmas_reelsize3.png",
          "alt": "Christmas Reelsize3"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/slide1-1.png",
          "alt": "Slide1"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/slide2.png",
          "alt": "Slide2"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/slide3.png",
          "alt": "Slide3"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/slide4.png",
          "alt": "Slide4"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/slide1.png",
          "alt": "Slide1"
        }
      ]
    },
    "story": {
      "title": "Security-tech, made social",
      "body": "Secure My Shop is an ISO 9001:2005 and ISO 27001 certified solutions company developing software that gathers and analyzes facility data using AI, ML, IoT and Big Data technologies for security and productivity monitoring. Across client servicing, social media and content writing we delivered weekly reporting with action plans, creative execution with revisions, and monthly growth strategy updates that improved turnaround and consistency.",
      "bigNum": "+1100%"
    },
    "approach": {
      "eyebrow": "HOW WE WORK",
      "heading": "Crafted for <em>Growth</em>",
      "items": [
        {
          "num": "01",
          "title": "Deep Brand Audit",
          "body": "We start by understanding the brand's voice, audience and existing content performance before we strategise."
        },
        {
          "num": "02",
          "title": "Content Architecture",
          "body": "Every post is mapped to a goal — awareness, engagement or conversion — and slotted into a structured monthly calendar."
        },
        {
          "num": "03",
          "title": "Execute & Iterate",
          "body": "We launch, track performance weekly and refine based on what the data tells us — no guesswork, only growth."
        }
      ]
    },
    "featured": {
      "eyebrow": "CAMPAIGN REEL",
      "heading": "Campaigns That <em>Convert</em>",
      "video": "",
      "glassLabel": "Featured Work",
      "glassText": "Secure My Shop — building brand recall through content-led storytelling."
    },
    "philosophy": {
      "eyebrow": "OUR PHILOSOPHY",
      "heading": "Strategy <em>×</em> Results",
      "video": "",
      "paragraphs": [
        "For Secure My Shop, we blended brand-aligned storytelling with data-driven posting to drive measurable growth across social platforms.",
        "Every deliverable was mapped to Secure My Shop's identity while connecting with a modern, digital-first audience."
      ]
    },
    "delivered": {
      "eyebrow": "DELIVERABLES",
      "heading": "What We <em>Delivered</em>",
      "cards": [
        {
          "video": "",
          "title": "Content Strategy",
          "body": "Monthly calendar with multi-format posts and reels tailored to Secure My Shop."
        },
        {
          "video": "",
          "title": "Growth & Analytics",
          "body": "Consistent reporting with measurable reach and engagement lift."
        }
      ]
    },
    "cta": {
      "sub": "Want results like these?",
      "label": "Book a discovery call with Raji →",
      "href": "/contact"
    },
    "logoBg": "#211a16"
  },
  {
    "slug": "icici",
    "name": "ICICI",
    "logo": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/ICICI_Pru.png",
    "cardDescription": "Content writing engagement for ICICI Prudential Life Insurance, including content-calendar planning and copy for the Saksham Pro platform and app UI.",
    "published": true,
    "palette": {
      "primary": "#b02a30",
      "bg": "#f9f0f1",
      "bgSoft": "#f5e3e4",
      "ink": "#200809",
      "accent": "#d07f83"
    },
    "brandColor": "linear-gradient(135deg, #b02a30, #892125)",
    "hero": {
      "eyebrow": "CLIENT ARCHIVE",
      "title": "ICICI",
      "bgText": "IC",
      "tagline": "Among India's leading life insurers since 2001",
      "tags": [
        "Content Writing"
      ]
    },
    "stats": [],
    "tabs": {
      "contentLabel": "Content Writing",
      "socialLabel": "Social Media",
      "servicingLabel": "Client Servicing"
    },
    "workDone": {
      "title": "Work Done",
      "bullets": [
        "Content calendar planning",
        "Saksham Pro UI content",
        "App UI content"
      ]
    },
    "calendar": {
      "title": "Content Calendar Glimpse",
      "rows": []
    },
    "analytics": [],
    "mom": {
      "title": "ICICI — Content Planning",
      "bullets": [
        "Content roadmap ready",
        "Posts finalised across formats",
        "High-engagement content plan (reels, statics, interactive)",
        "Clear posting schedule set",
        "Success metrics defined"
      ]
    },
    "gallery": {
      "title": "Creative Gallery",
      "images": [
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/1.jpeg",
          "alt": "Icici post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/2.jpeg",
          "alt": "Icici post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/5.jpeg",
          "alt": "Icici post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/4.jpeg",
          "alt": "Icici post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/3-1.jpeg",
          "alt": "Icici post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/5-1.jpeg",
          "alt": "Icici post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/6-1.jpeg",
          "alt": "Icici post"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2025/12/7-1.jpeg",
          "alt": "Icici post"
        }
      ]
    },
    "story": {
      "title": "ICICI Prudential Life Insurance",
      "body": "ICICI Prudential Life Insurance Company Limited (ICICI Prudential Life) is promoted by ICICI Bank Limited and Prudential Corporation Holdings Limited. Operations began in 2001, and it ranks among the top Indian life insurance companies by retail weighted received premium.",
      "bigNum": "2001"
    },
    "approach": {
      "eyebrow": "HOW WE WORK",
      "heading": "Crafted for <em>Growth</em>",
      "items": [
        {
          "num": "01",
          "title": "Deep Brand Audit",
          "body": "We start by understanding the brand's voice, audience and existing content performance before we strategise."
        },
        {
          "num": "02",
          "title": "Content Architecture",
          "body": "Every post is mapped to a goal — awareness, engagement or conversion — and slotted into a structured monthly calendar."
        },
        {
          "num": "03",
          "title": "Execute & Iterate",
          "body": "We launch, track performance weekly and refine based on what the data tells us — no guesswork, only growth."
        }
      ]
    },
    "featured": {
      "eyebrow": "CAMPAIGN REEL",
      "heading": "Campaigns That <em>Convert</em>",
      "video": "",
      "glassLabel": "Featured Work",
      "glassText": "ICICI — building brand recall through content-led storytelling."
    },
    "philosophy": {
      "eyebrow": "OUR PHILOSOPHY",
      "heading": "Strategy <em>×</em> Results",
      "video": "",
      "paragraphs": [
        "For ICICI, we blended brand-aligned storytelling with data-driven posting to drive measurable growth across social platforms.",
        "Every deliverable was mapped to ICICI's identity while connecting with a modern, digital-first audience."
      ]
    },
    "delivered": {
      "eyebrow": "DELIVERABLES",
      "heading": "What We <em>Delivered</em>",
      "cards": [
        {
          "video": "",
          "title": "Content Strategy",
          "body": "Monthly calendar with multi-format posts and reels tailored to ICICI."
        },
        {
          "video": "",
          "title": "Growth & Analytics",
          "body": "Consistent reporting with measurable reach and engagement lift."
        }
      ]
    },
    "cta": {
      "sub": "Want results like these?",
      "label": "Book a discovery call with Raji →",
      "href": "/contact"
    },
    "logoBg": "#211a16"
  },
  {
    "slug": "godrej",
    "name": "Godrej",
    "logo": "https://rajeshwarichauhan.in/wp-content/uploads/2025/11/Godrej.png",
    "cardDescription": "Content writing and social strategy for Godrej Enterprises Group, driving reach and engagement growth.",
    "published": true,
    "palette": {
      "primary": "#005baa",
      "bg": "#edf4f9",
      "bgSoft": "#deeaf4",
      "ink": "#00101f",
      "accent": "#669dcc"
    },
    "brandColor": "linear-gradient(135deg, #005baa, #004785)",
    "hero": {
      "eyebrow": "CLIENT ARCHIVE",
      "title": "GODREJ",
      "bgText": "GO",
      "tagline": "Driven by an entrepreneurial spirit since 1897",
      "tags": [
        "Content Writing"
      ]
    },
    "stats": [
      {
        "raw": 1100,
        "suffix": "%",
        "decimals": 0,
        "label": "Reach Growth"
      },
      {
        "raw": 720,
        "suffix": "%",
        "decimals": 0,
        "label": "Engagement / Leads"
      },
      {
        "raw": 175,
        "suffix": "%",
        "decimals": 0,
        "label": "CTR Lift"
      },
      {
        "raw": 55,
        "suffix": "%",
        "decimals": 0,
        "label": "Retention / Consistency"
      }
    ],
    "tabs": {
      "contentLabel": "Content Writing",
      "socialLabel": "Social Media",
      "servicingLabel": "Client Servicing"
    },
    "workDone": {
      "title": "Work Done",
      "bullets": [
        "Weekly reporting + action plan",
        "Execution with creatives + revisions",
        "Monthly growth strategy updates",
        "Improved turnaround + consistency"
      ]
    },
    "calendar": {
      "title": "Content Calendar Glimpse",
      "rows": []
    },
    "analytics": [],
    "mom": {
      "title": "Godrej — Content Planning",
      "bullets": [
        "Content roadmap ready",
        "Posts finalised across formats",
        "High-engagement content plan (reels, statics, interactive)",
        "Clear posting schedule set",
        "Success metrics defined"
      ]
    },
    "gallery": {
      "title": "Creative Gallery",
      "images": [
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-04-at-9.55.12-AM-1.jpeg",
          "alt": "Whatsapp Image At 9.55.12 Am"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-04-at-9.55.12-AM-2.jpeg",
          "alt": "Whatsapp Image At 9.55.12 Am"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-04-at-9.55.12-AM.jpeg",
          "alt": "Whatsapp Image At 9.55.12 Am"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-04-at-9.55.12-AM-1-1.jpeg",
          "alt": "Whatsapp Image At 9.55.12 Am"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-04-at-9.55.12-AM-2-1.jpeg",
          "alt": "Whatsapp Image At 9.55.12 Am"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-04-at-9.55.12-AM-3.jpeg",
          "alt": "Whatsapp Image At 9.55.12 Am"
        },
        {
          "src": "https://rajeshwarichauhan.in/wp-content/uploads/2026/01/WhatsApp-Image-2026-01-04-at-9.55.13-AM.jpeg",
          "alt": "Whatsapp Image At 9.55.13 Am"
        }
      ]
    },
    "story": {
      "title": "Driven by an entrepreneurial spirit since 1897",
      "body": "Since 1897, the Godrej Enterprises Group has been driven by an entrepreneurial spirit leading to innovations in locks, safes, and India's space ambitions.",
      "bigNum": "1897"
    },
    "approach": {
      "eyebrow": "HOW WE WORK",
      "heading": "Crafted for <em>Growth</em>",
      "items": [
        {
          "num": "01",
          "title": "Deep Brand Audit",
          "body": "We start by understanding the brand's voice, audience and existing content performance before we strategise."
        },
        {
          "num": "02",
          "title": "Content Architecture",
          "body": "Every post is mapped to a goal — awareness, engagement or conversion — and slotted into a structured monthly calendar."
        },
        {
          "num": "03",
          "title": "Execute & Iterate",
          "body": "We launch, track performance weekly and refine based on what the data tells us — no guesswork, only growth."
        }
      ]
    },
    "featured": {
      "eyebrow": "CAMPAIGN REEL",
      "heading": "Campaigns That <em>Convert</em>",
      "video": "",
      "glassLabel": "Featured Work",
      "glassText": "Godrej — building brand recall through content-led storytelling."
    },
    "philosophy": {
      "eyebrow": "OUR PHILOSOPHY",
      "heading": "Strategy <em>×</em> Results",
      "video": "",
      "paragraphs": [
        "For Godrej, we blended brand-aligned storytelling with data-driven posting to drive measurable growth across social platforms.",
        "Every deliverable was mapped to Godrej's identity while connecting with a modern, digital-first audience."
      ]
    },
    "delivered": {
      "eyebrow": "DELIVERABLES",
      "heading": "What We <em>Delivered</em>",
      "cards": [
        {
          "video": "",
          "title": "Content Strategy",
          "body": "Monthly calendar with multi-format posts and reels tailored to Godrej."
        },
        {
          "video": "",
          "title": "Growth & Analytics",
          "body": "Consistent reporting with measurable reach and engagement lift."
        }
      ]
    },
    "cta": {
      "sub": "Want results like these?",
      "label": "Book a discovery call with Raji →",
      "href": "/contact"
    },
    "logoBg": "#211a16"
  }
];

export const DEFAULT_BRANDS: BrandsData = {
  archiveTitle: "Brands",
  archiveIntro: "A selection of brands we've helped grow with strategy, content and community.",
  items: [MAST_MASALA, ...IMPORTED_BRANDS],
};

export function findBrand(d: BrandsData, slug: string): Brand | undefined {
  return d.items.find((b) => b.slug === slug);
}
