"use client";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useImageReveal } from "@/hooks/useImageReveal";
import { VIDEOS, IMG, unsplashUrl } from "@/lib/unsplash";
import Button from "@/components/ui/Button";
import RotatingBadge from "@/components/ui/RotatingBadge";

export default function SignatureProgramSection() {
  const textRef = useFadeUp({ selector: ".fu", stagger: 0.12 });
  const vidRef = useImageReveal();
  return (
    <section className="container-x" style={{ padding: "120px 0" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div ref={vidRef as React.Ref<HTMLDivElement>} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={unsplashUrl(IMG.desk4, 1200)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={VIDEOS.hero} type="video/mp4" />
          </video>
        </div>
        <div ref={textRef as React.Ref<HTMLDivElement>} className="flex flex-col gap-8 max-w-[540px]">
          <div className="fu">
            <RotatingBadge />
          </div>
          <span className="fu eyebrow">waitlist open</span>
          <h2 className="fu" style={{ fontSize: "clamp(40px, 5.5vw, 72px)" }}>
            Signature High-Ticket Sales funnel system
          </h2>
          <p className="fu" style={{ color: "var(--color-text-muted)", fontSize: 17, lineHeight: 1.7 }}>
            Get the most powerful step-by-step program and don&apos;t miss the early-bird discount. The program is
            launching soon, and the cohort is small on purpose.
          </p>
          <div className="fu">
            <Button variant="filled">join waitlist</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
