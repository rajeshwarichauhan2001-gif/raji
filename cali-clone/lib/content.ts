// NOTE: this file is imported by client components, so it must stay
// dependency-free (no "fs"). Server-only read/write lives in content.server.ts.

// ---------- Types ----------
export type HeroAction = { label: string; href: string; style: "primary" | "outline" | "ghost" };

export type HeroContent = {
  bgVideo: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  sub: string;
  actions: HeroAction[];
};

export type ApproachStat = { num: string; label: string };
export type ApproachContent = {
  eyebrow: string;
  title: string;
  body: string;
  stats: ApproachStat[];
  image: string;
};

export type StatItem = { target: number; decimals: number; suffix: string; label: string };
export type StatsContent = { title: string; items: StatItem[] };

export type FaqItem = { q: string; a: string };
export type FaqContent = { eyebrow: string; title: string; items: FaqItem[] };

export type Testimonial = { name: string; role: string; quote: string; avatar: string };
export type TestimonialsContent = { eyebrow: string; title: string; items: Testimonial[] };

export type SiteContent = {
  hero: HeroContent;
  approach: ApproachContent;
  stats: StatsContent;
  faq: FaqContent;
  testimonials: TestimonialsContent;
};

// ---------- Defaults (current live values — site looks identical until edited) ----------
export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    bgVideo:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_131941_d136af49-e243-493a-be14-6ff3f24e09e6.mp4",
    eyebrow: "SOCIAL MEDIA STRATEGIST",
    title: "Transforming Brands Through",
    titleAccent: "Strategic Social Media Excellence",
    sub: "Social media professional with proven expertise in managing and growing brand presence across diverse digital platforms. Specialized in content creation, community engagement, influencer collaborations, and leveraging analytics to optimize performance and drive measurable growth. I combine strategic planning with creative execution to build meaningful connections between brands and their audiences.",
    actions: [
      { label: "View My Work", href: "#services", style: "primary" },
      { label: "Resume", href: "#resume", style: "outline" },
      { label: "Let's Collaborate", href: "#contact", style: "ghost" },
    ],
  },
  approach: {
    eyebrow: "my approach",
    title: "Building Digital Communities That Drive Real Results",
    body: "My approach to social media management is rooted in three core principles: strategic thinking, authentic storytelling, and consistent execution. With hands-on agency experience managing diverse portfolios from food & beverage brands to digital marketing agencies, I've developed a methodology that balances creative expression with data-driven decision making.",
    stats: [
      { num: "50+", label: "Completed Projects" },
      { num: "3+", label: "Years Experience" },
    ],
    image: "/images/raji-portrait.jpg",
  },
  stats: {
    title: "Enhance Your Digital Impact with My Expertise",
    items: [
      { target: 50, decimals: 0, suffix: "+", label: "Completed Projects" },
      { target: 40, decimals: 0, suffix: "+", label: "Happy Clients" },
      { target: 3, decimals: 0, suffix: "+", label: "Years Experience" },
      { target: 4.5, decimals: 1, suffix: "/5", label: "Client Ratings" },
    ],
  },
  faq: {
    eyebrow: "faqs",
    title:
      "Still have Qs? Find answers to common questions about our products, hosting, domains, and support.",
    items: [
      { q: "What social media services do you offer?", a: "I provide comprehensive social media management including strategic planning, content creation and curation, community engagement, influencer collaboration coordination, analytics tracking, and detailed monthly reporting. I manage accounts across Instagram, Facebook, LinkedIn, YouTube, Twitter, and other platforms based on your specific business needs and target audience preferences." },
      { q: "How can social media management help my business?", a: "Strategic social media management increases brand awareness, builds authentic customer relationships, drives website traffic, generates quality leads, and ultimately boosts sales. Through consistent posting, genuine community engagement, and data-driven optimization, I help businesses achieve measurable growth in their online presence, audience reach, customer loyalty, and conversion rates." },
      { q: "Is there a free consultation available?", a: "Yes! I offer a complimentary 30-minute discovery call where we'll discuss your current social media situation, business goals, target audience, industry challenges, and how my services can specifically help you achieve the results you're looking for. This is a no-pressure, no-obligation conversation designed to provide genuine value." },
      { q: "Can services be customized for my business?", a: "Absolutely, every business has unique needs, audiences, goals, and challenges. I tailor my approach based on your specific industry, budget, timeline, and objectives. Whether you need comprehensive account management or support with specific aspects like content creation, community management, or analytics, I'll customize a service package that works perfectly for you." },
      { q: "How do you ensure quality in social media campaigns?", a: "Quality stems from thorough preparation and consistent execution. I create detailed content calendars, review all content before scheduling, track performance metrics continuously, and optimize based on real data. I stay updated on platform algorithm changes, emerging trends, and industry best practices to ensure your content remains relevant, engaging, and effective at achieving your objectives." },
      { q: "What industries have you worked with?", a: "I've successfully managed social media for food & beverage brands, digital marketing agencies, cultural organizations, international film festivals, and B2B service providers. My mass media communication background combined with ongoing MBA studies in Digital Marketing gives me the versatility to adapt effectively to various industries while maintaining strategic focus on measurable results." },
      { q: "How long before I see results from social media efforts?", a: "Initial engagement improvements often become visible within 2-3 weeks of consistent, strategic posting. Significant follower growth and meaningful business impact typically manifest within 2-3 months as we build community, refine strategy, and optimize based on performance data. Social media success is a marathon, not a sprint; sustainable growth requires patience and persistence." },
      { q: "Do you provide ongoing support after initial setup?", a: "Yes! Social media requires continuous attention and adaptation. I provide ongoing account management, daily monitoring, regular performance reporting, and strategic adjustments. I'm readily available for questions, handle time-sensitive situations promptly, and ensure your social media presence runs smoothly throughout our entire partnership. You're never left wondering what's happening with your accounts." },
      { q: "How do I get started working with you?", a: "Simple! Use the contact form below or email me directly. We'll schedule a free discovery call to discuss your goals, challenges, and opportunities. If we're a good fit, I'll create a customized proposal outlining strategy, timeline, deliverables, and investment. Once you're comfortable, we'll get your social media growing immediately!" },
      { q: "What makes your approach different from others?", a: "I combine academic knowledge from my MBA with real-world agency experience and genuine passion for social media storytelling. You get strategic thinking, creative execution, transparent communication, and sincere dedication to your success. I don't just manage accounts. I build brands, foster communities, and grow businesses through authentic social media presence." },
    ],
  },
  testimonials: {
    eyebrow: "client love",
    title: "Client Feedback & Reviews",
    items: [
      { name: "Priya Sharma", role: "Marketing Head, Rapoo", quote: "Their understanding of Indian festivals and cultural moments is exceptional. Every Diwali, Holi, and Navratri campaign feels authentic and resonates with our customers beautifully. They've helped us build a genuine connection with our audience through thoughtful content. Working with them has been an absolute pleasure!", avatar: "photo-1494790108377-be9c29b29330" },
      { name: "Pratik Jain", role: "Founder, Pratik", quote: "What impressed me most is their quick response time and understanding of our needs. They never miss deadlines and always keep us informed about campaign progress. Their content strikes the perfect balance between informative and engaging. Parents trust our brand more now, thanks to their professional approach!", avatar: "photo-1488426862026-3ee34a7d66df" },
      { name: "Sneha Desai", role: "Marketing Head, NBG", quote: "They brought fresh creative ideas to our wellness brand. From beautiful photography to calming reels, everything they create aligns perfectly with our brand identity. Their ability to create content in regional languages helped us connect with local communities. Patient, professional, and genuinely passionate about our success!", avatar: "photo-1573497019940-1c28c88b4f3e" },
      { name: "Vikram Singh Rathore", role: "Social Media Head", quote: "They understood our vision of showcasing traditional craftsmanship to modern audiences. Their storytelling approach made our artisan stories come alive on social media. International clients often mention discovering us through Instagram. They've given our heritage brand a contemporary voice without losing its soul. Truly grateful!", avatar: "photo-1517841905240-472988babdf9" },
      { name: "Amish Doshi", role: "COO, Furnishing Home", quote: "Our social media presence has improved significantly since working with this social media manager. From content planning to consistent posting and engagement, everything is handled professionally. The strategies are well thought out and results-driven.", avatar: "photo-1438761681033-6461ffad8d80" },
      { name: "Aayush Agarwal", role: "COO, Intellve", quote: "Highly creative and reliable. The social media manager understands our brand voice perfectly and creates content that actually connects with the audience. We've seen better engagement, reach, and overall brand visibility.", avatar: "photo-1544005313-94ddf0286df2" },
      { name: "Hiralkumar Patel", role: "COO, Kunuts", quote: "A very dedicated and proactive social media manager. From reels to captions and analytics, everything is managed smoothly. Timely communication and a clear understanding of trends make working together effortless.", avatar: "photo-1554151228-14d9def656e4" },
    ],
  },
};

