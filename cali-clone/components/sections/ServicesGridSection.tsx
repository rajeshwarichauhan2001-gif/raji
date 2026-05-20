"use client";
import Image from "next/image";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useImageReveal } from "@/hooks/useImageReveal";
import { IMG, unsplashUrl } from "@/lib/unsplash";

type Block = { eyebrow: string; title: string; body: string; img: string; reverse?: boolean };

const blocks: Block[] = [
  {
    eyebrow: "option one",
    title: "services",
    body: "Brand-led social strategy, monthly content systems, and signature launch frameworks — done with you, never to you.",
    img: IMG.desk2,
  },
  {
    eyebrow: "option two",
    title: "Courses",
    body: "Self-paced programs for solo founders who want to stop posting blindly and start running their socials like a studio.",
    img: IMG.desk5,
    reverse: true,
  },
  {
    eyebrow: "option three",
    title: "Master Classes",
    body: "Live, intimate workshops on the inner game of pricing, pitching and showing up with confidence on camera.",
    img: IMG.flat1,
  },
];

function ZigBlock({ block }: { block: Block }) {
  const text = useFadeUp({ selector: ".fu", stagger: 0.12 });
  const img = useImageReveal();
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${block.reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
      <div ref={img as React.Ref<HTMLDivElement>} className="relative w-full h-[50vh] md:h-[70vh]">
        <Image src={unsplashUrl(block.img, 1200)} alt={block.title} fill sizes="(max-width: 767px) 100vw, 50vw" style={{ objectFit: "cover" }} />
      </div>
      <div ref={text as React.Ref<HTMLDivElement>} className="flex flex-col gap-6 max-w-[480px]">
        <span className="fu eyebrow">{block.eyebrow}</span>
        <h3 className="fu" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>{block.title}</h3>
        <p className="fu" style={{ color: "var(--color-text-muted)", fontSize: 17, lineHeight: 1.7 }}>{block.body}</p>
        <a className="fu arrow-link" href="#">learn more <span aria-hidden>→</span></a>
      </div>
    </div>
  );
}

export default function ServicesGridSection() {
  return (
    <section className="container-x" style={{ padding: "160px 0" }}>
      <div className="flex flex-col gap-24 md:gap-32">
        {blocks.map((b, i) => <ZigBlock key={i} block={b} />)}
      </div>
    </section>
  );
}
