// Client-safe About page content model (no "fs").
export type QuoteCol = { heading: string; body: string };

export type AboutData = {
  header: { eyebrow: string; title: string; subtitle: string };
  quote: { columns: QuoteCol[] };
  whyUs: { eyebrow: string; title: string; body: string };
};

export const DEFAULT_ABOUT: AboutData = {
  header: {
    eyebrow: "Our story",
    title: "About Us",
    subtitle:
      "Strategy, storytelling and steady community building for brands that want growth with intention.",
  },
  quote: {
    columns: [
      {
        heading: "Successful Campaign",
        body: "Every successful campaign begins with deep audience understanding. I analyze engagement patterns, study competitor landscapes, and identify opportunities where your brand's voice can truly resonate. This research forms the foundation for content strategies that don't just chase trends, but create meaningful conversations.",
      },
      {
        heading: "Client collaboration",
        body: "Client collaboration is central to everything I do. I believe in transparent communication, regular performance updates, and adapting strategies based on real results. From initial content calendars to influencer partnerships and community management, I handle each aspect with meticulous attention to detail.",
      },
    ],
  },
  whyUs: {
    eyebrow: "Why us",
    title: "Unveiling The Success Of Our Achievements Growth",
    body: "We help brands stand out with compelling and persuasive designs that leave a lasting impact. By blending creativity with strategy, we craft visuals that not only capture attention but also drive action.",
  },
};
