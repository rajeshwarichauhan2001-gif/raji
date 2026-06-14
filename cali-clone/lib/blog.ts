// Client-safe blog data layer. No "fs" import — defaults live here so both the
// frontend and the (separate) admin dashboard share one schema. The store layer
// (lib/store.ts) merges saved JSON over DEFAULT_BLOG at request time.

export type BlogPost = {
  slug: string; // url-safe, unique
  title: string;
  excerpt: string; // short summary for archive cards
  cover: string; // image URL or /api/media/... path (may be empty "")
  author: string;
  date: string; // ISO-ish display string e.g. "2026-05-01"
  tags: string[];
  body: string; // plain text; paragraphs separated by blank lines (\n\n)
  published?: boolean; // hidden from public site when false (draft). undefined = visible.
};

export type BlogData = {
  title: string;
  intro: string;
  posts: BlogPost[];
};

export const DEFAULT_BLOG: BlogData = {
  title: "Blog",
  intro: "Notes on building calm, consistent social-media presences that actually convert.",
  posts: [
    {
      slug: "content-pillars-that-scale",
      published: true,
      title: "Content Pillars That Scale: A Framework for Consistent Posting",
      excerpt:
        "Most creators burn out chasing trends. Here's the pillar system I use to keep a feed coherent and a calendar full without the daily scramble.",
      cover: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&q=80&auto=format&fit=crop",
      author: "Rajeshwari Chauhan",
      date: "2026-05-28",
      tags: ["strategy", "content", "frameworks"],
      body: "When clients come to me overwhelmed, the problem is almost never effort — it's the absence of a repeatable structure. They post when inspiration strikes, then go quiet for a week, and the algorithm punishes the inconsistency.\n\nContent pillars fix this. Pick three to five themes that map to what your audience wants and what you actually sell. Every piece you publish lives under one pillar, so you never start from a blank page.\n\nThe magic is in the rotation. Cycle through your pillars on a fixed cadence and your feed reads as intentional rather than random. Followers learn what to expect, and expectation builds trust.\n\nStart small: define three pillars this week, batch five posts for each, and schedule them. You'll buy yourself a month of breathing room and a feed that finally looks like a brand.",
    },
    {
      slug: "reels-hooks-first-three-seconds",
      published: true,
      title: "The First Three Seconds: Writing Reels Hooks That Stop the Scroll",
      excerpt:
        "Watch time is won or lost before your intro finishes. A breakdown of the hook patterns that consistently lift retention on short-form video.",
      cover: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80&auto=format&fit=crop",
      author: "Rajeshwari Chauhan",
      date: "2026-05-12",
      tags: ["reels", "video", "growth"],
      body: "Retention is the only metric the algorithm truly cares about, and the steepest drop-off always happens in the opening moment. If the first three seconds don't earn the next three, nothing else you filmed matters.\n\nThe strongest hooks create an open loop — a question, a bold claim, or a visual that demands resolution. \"I stopped doing this and my reach doubled\" works because the viewer needs to know what \"this\" is.\n\nPair the verbal hook with motion. A jump cut, a gesture, or text that lands on beat keeps the eye busy while the brain decides to stay.\n\nTest relentlessly. Reshoot the same content with five different openings and let the data, not your taste, pick the winner. Hooks are a skill, and skills compound.",
    },
    {
      slug: "turning-followers-into-clients",
      published: true,
      title: "From Followers to Clients: Designing a Funnel Inside the Feed",
      excerpt:
        "A large audience that never buys is a vanity metric. How to build a quiet, frictionless path from a casual like to a paying client.",
      cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
      author: "Rajeshwari Chauhan",
      date: "2026-04-30",
      tags: ["funnels", "conversion", "business"],
      body: "Growth feels good, but revenue pays the bills. The gap between the two is a funnel — and most personal brands simply don't have one.\n\nThink in three layers. The top is reach content that attracts strangers. The middle is trust content that proves you can solve a real problem. The bottom is a clear, repeated invitation to work with you.\n\nThe mistake I see most is skipping the middle. You can't ask for the sale from people who've watched one reel. Nurture first: case studies, behind-the-scenes process, honest results.\n\nThen make the ask obvious and easy. A pinned post, a link in bio, a single call to action in your captions. When the path is frictionless, conversion stops feeling like selling and starts feeling like service.",
    },
  ],
};

export function findPost(data: BlogData, slug: string): BlogPost | undefined {
  return data.posts.find((p) => p.slug === slug);
}
