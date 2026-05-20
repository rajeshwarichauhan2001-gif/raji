"use client";
import Image from "next/image";
import { useFadeUp } from "@/hooks/useFadeUp";
import { usePodcastRail } from "@/hooks/usePodcastRail";
import PodcastCard from "@/components/ui/PodcastCard";
import { IMG, unsplashUrl } from "@/lib/unsplash";

const cards = [
  { id: IMG.portrait1, eyebrow: "its all about intention", title: "Business vs life Balance" },
  { id: IMG.desk2, eyebrow: "its all about intention", title: "how to make 10 high ticket sales in a month" },
  { id: IMG.portrait3, eyebrow: "its all about intention", title: "Business vs life Balance" },
  { id: IMG.desk6, eyebrow: "its all about intention", title: "how to make 10 high ticket sales in a month" },
  { id: IMG.portrait5, eyebrow: "its all about intention", title: "Business vs life Balance" },
  { id: IMG.flat2, eyebrow: "its all about intention", title: "how to make 10 high ticket sales in a month" },
];

export default function PodcastSection() {
  const head = useFadeUp({ selector: ".fu", stagger: 0.12 });
  const rail = usePodcastRail(40);
  const doubled = [...cards, ...cards];

  return (
    <section style={{ padding: "120px 0" }}>
      <div ref={head as React.Ref<HTMLDivElement>} className="container-x flex flex-col gap-5 max-w-[600px] mb-12">
        <div className="fu relative" style={{ width: 80, height: 80 }}>
          <Image src={unsplashUrl(IMG.flat2, 200)} alt="podcast cover" fill sizes="80px" style={{ objectFit: "cover" }} />
        </div>
        <span className="fu eyebrow">podcast</span>
        <h2 className="fu" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>Learn With Me</h2>
        <p className="fu" style={{ fontSize: 18, color: "var(--color-text-muted)", lineHeight: 1.7, maxWidth: 480 }}>
          Achieve more by setting up goals in a way you can monitor and check in on your progress.
        </p>
      </div>
      <div ref={rail as React.Ref<HTMLDivElement>} className="overflow-hidden">
        <div className="rail-track flex gap-8 w-max pl-8">
          {doubled.map((c, i) => (
            <PodcastCard key={i} imageId={c.id} eyebrow={c.eyebrow} title={c.title} />
          ))}
        </div>
      </div>
      <div className="container-x text-center mt-12">
        <a className="arrow-link" href="#">all episodes <span aria-hidden>→</span></a>
      </div>
    </section>
  );
}
