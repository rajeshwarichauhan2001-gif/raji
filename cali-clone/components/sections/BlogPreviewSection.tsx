"use client";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useRowHover } from "@/hooks/useRowHover";
import BlogRow from "@/components/ui/BlogRow";

const posts = [
  "Businesses are being launched every day with a unique image and story to tell",
  "How to build a lovely relationship with your customer and your fans and followers",
  "People buy from the person they know and trust",
];

export default function BlogPreviewSection() {
  const head = useFadeUp({ selector: ".fu", stagger: 0.12 });
  const list = useRowHover();
  return (
    <section className="container-x" style={{ padding: "120px 0" }}>
      <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-16">
        <div ref={head as React.Ref<HTMLDivElement>} className="flex flex-col gap-5 max-w-[420px]">
          <span className="fu eyebrow-italic">welcome</span>
          <h2 className="fu" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>raji blog</h2>
          <h3 className="fu" style={{ fontSize: 24, fontStyle: "italic" }}>welcome to the blog you actually will love to read!</h3>
          <p className="fu" style={{ color: "var(--color-text-muted)", fontSize: 16, lineHeight: 1.7 }}>
            Slow business essays, behind-the-scenes notes from real launches, and the journal entries I write on
            mornings when nobody is asking me anything.
          </p>
          <a className="fu arrow-link" href="#">all blogposts <span aria-hidden>→</span></a>
        </div>
        <div ref={list as React.Ref<HTMLDivElement>} style={{ borderTop: "1px solid var(--color-divider)" }}>
          {posts.map((title, i) => <BlogRow key={i} title={title} />)}
        </div>
      </div>
    </section>
  );
}
