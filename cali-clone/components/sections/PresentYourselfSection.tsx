"use client";
import Image from "next/image";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useImageReveal } from "@/hooks/useImageReveal";
import { IMG, unsplashUrl } from "@/lib/unsplash";

export default function PresentYourselfSection() {
  const txt = useFadeUp({ selector: ".fu", stagger: 0.12 });
  const img = useImageReveal();
  return (
    <section className="container-x" style={{ padding: "120px 0" }}>
      <div className="grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-16 items-center">
        <div ref={txt as React.Ref<HTMLDivElement>} className="flex flex-col gap-7 max-w-[540px]">
          <span className="fu eyebrow-italic">Present yourself and your business</span>
          <p className="fu" style={{ fontSize: 17, lineHeight: 1.75, color: "var(--color-text-muted)" }}>
            We&apos;re here to give creatives the tools they need to positively impact their marketplace, to help them
            take their talents and ideas and make a real difference in the world. We want to help creatives make their
            businesses a success, and we believe that if you do what you love, you&apos;ll never work a day in your
            life.
          </p>
          <a className="fu arrow-link" href="#">more stories <span aria-hidden>→</span></a>
        </div>
        <div ref={img as React.Ref<HTMLDivElement>} className="relative w-full h-[60vh] md:h-[80vh]">
          <Image src={unsplashUrl(IMG.portrait7, 1200)} alt="Present" fill sizes="(max-width: 767px) 100vw, 40vw" style={{ objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}
