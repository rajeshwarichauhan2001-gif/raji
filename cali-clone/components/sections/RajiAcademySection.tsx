"use client";
import Image from "next/image";
import { useFadeUp } from "@/hooks/useFadeUp";
import { IMG, unsplashUrl } from "@/lib/unsplash";
import Button from "@/components/ui/Button";

export default function RajiAcademySection() {
  const ref = useFadeUp({ selector: ".fu", stagger: 0.15 });
  return (
    <section className="relative overflow-hidden" style={{ padding: "160px 0" }}>
      <div className="hidden md:block absolute -z-0 pointer-events-none" style={{ top: 80, left: "6vw", width: 240, height: 320 }}>
        <Image src={unsplashUrl(IMG.portrait3, 600)} alt="" fill sizes="240px" style={{ objectFit: "cover" }} />
      </div>
      <div className="hidden md:block absolute -z-0 pointer-events-none" style={{ bottom: 80, right: "6vw", width: 320, height: 420 }}>
        <Image src={unsplashUrl(IMG.desk7, 700)} alt="" fill sizes="320px" style={{ objectFit: "cover" }} />
      </div>
      <div ref={ref as React.Ref<HTMLDivElement>} className="container-x relative z-10 flex flex-col items-center text-center gap-6 max-w-[640px] mx-auto">
        <span className="fu eyebrow-italic">raji academy</span>
        <h2 className="fu" style={{ fontSize: "clamp(48px, 7vw, 96px)" }}>Learn With Me</h2>
        <p className="fu" style={{ color: "var(--color-text-muted)", fontSize: 17, lineHeight: 1.75, maxWidth: 540 }}>
          A small library of self-paced strategy courses for the woman who wants to grow her business without burning her
          life down. Templates, scripts, the calm playbook — all of it.
        </p>
        <div className="fu">
          <Button variant="outlined">details</Button>
        </div>
      </div>
    </section>
  );
}
