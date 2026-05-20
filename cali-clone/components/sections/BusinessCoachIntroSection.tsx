"use client";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useImageReveal } from "@/hooks/useImageReveal";
import { VIDEOS, IMG, unsplashUrl } from "@/lib/unsplash";
import Button from "@/components/ui/Button";

export default function BusinessCoachIntroSection() {
  const textRef = useFadeUp({ selector: ".fu", stagger: 0.12 });
  const vidRef = useImageReveal();
  return (
    <section style={{ padding: "120px 0" }} className="container-x">
      <div className="grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-12 items-center">
        <div ref={textRef as React.Ref<HTMLDivElement>} className="flex flex-col gap-7 max-w-[560px]">
          <span className="fu eyebrow-italic">Hey, I am Raji</span>
          <h3 className="fu" style={{ fontSize: "clamp(32px, 4.5vw, 64px)", lineHeight: 1.05 }}>
            I am a social media strategist, leader, podcaster and your biggest cheerleader
          </h3>
          <p className="fu" style={{ fontSize: 17, lineHeight: 1.75, color: "var(--color-text-muted)" }}>
            For over a decade I&apos;ve been helping female founders build calm, magnetic brands online — through
            handcrafted content strategy, story-driven launches, and the kind of community that turns casual followers
            into lifelong clients. Let&apos;s craft yours.
          </p>
          <div className="fu">
            <Button variant="filled">i am ready</Button>
          </div>
        </div>
        <div ref={vidRef as React.Ref<HTMLDivElement>} className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={unsplashUrl(IMG.portrait4, 1200)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={VIDEOS.coach} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
