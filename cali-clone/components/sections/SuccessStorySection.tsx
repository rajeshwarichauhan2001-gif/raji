"use client";
import Image from "next/image";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useImageReveal } from "@/hooks/useImageReveal";
import { VIDEOS, IMG, unsplashUrl } from "@/lib/unsplash";

export default function SuccessStorySection() {
  const leftImg = useImageReveal();
  const overlapImg = useImageReveal();
  const right = useFadeUp({ selector: ".fu", stagger: 0.12 });

  return (
    <section className="container-x relative" style={{ padding: "160px 0" }}>
      <div className="grid grid-cols-1 md:grid-cols-[40fr_50fr] gap-16 items-start">
        <div className="relative">
          <span
            className="absolute left-0"
            style={{ top: -32, fontSize: 14, fontStyle: "italic", color: "var(--color-text-muted)" }}
          >
            Success Story
          </span>
          <div ref={leftImg as React.Ref<HTMLDivElement>} className="relative w-[90%] h-[80vh]">
            <Image src={unsplashUrl(IMG.portrait6, 1200)} alt="Success" fill sizes="(max-width: 767px) 100vw, 40vw" style={{ objectFit: "cover" }} />
          </div>
          <div
            ref={overlapImg as React.Ref<HTMLDivElement>}
            className="hidden md:block absolute"
            style={{ bottom: -60, right: -40, width: 280, height: 360, zIndex: 2 }}
          >
            <Image src={unsplashUrl(IMG.desk3, 600)} alt="Overlap" fill sizes="280px" style={{ objectFit: "cover" }} />
          </div>
        </div>
        <div ref={right as React.Ref<HTMLDivElement>} className="flex flex-col gap-8 max-w-[520px]">
          <div className="fu relative w-full aspect-[4/5] overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={unsplashUrl(IMG.portrait7, 1000)}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={VIDEOS.coach} type="video/mp4" />
            </video>
          </div>
          <span className="fu eyebrow">client&apos;s success story</span>
          <p className="fu" style={{ fontSize: 17, lineHeight: 1.75, color: "var(--color-text-muted)" }}>
            “Within six months of working with Raji my agency went from feast-and-famine to a fully booked waitlist.
            Nothing about the work felt rushed. Everything felt true to me.” — Aanya, founder of Soft Studio.
          </p>
          <a className="fu arrow-link" href="#">more stories <span aria-hidden>→</span></a>
        </div>
      </div>
    </section>
  );
}
