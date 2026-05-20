"use client";
import { VIDEOS, IMG, unsplashUrl } from "@/lib/unsplash";
import { useHeroIntro } from "@/hooks/useHeroIntro";
import EyebrowText from "@/components/ui/EyebrowText";

export default function HeroSection() {
  const ref = useHeroIntro();
  return (
    <section
      ref={ref as React.Ref<HTMLElement>}
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "var(--nav-h)" }}
    >
      <div className="container-x grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-10 items-center" style={{ minHeight: "calc(100vh - var(--nav-h))" }}>
        <div className="relative flex flex-col gap-6 py-10">
          <span className="hero-eyebrow eyebrow-italic">Welcome to Raji</span>
          <h1
            className="hero-h1"
            style={{
              fontSize: "clamp(44px, 9vw, 140px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              maxWidth: "13ch",
            }}
          >
            Strategy for service providers &amp; coaches
          </h1>
          <span
            className="scroll-cue absolute"
            style={{
              left: 0,
              bottom: 20,
              transform: "rotate(-90deg)",
              transformOrigin: "left bottom",
              fontSize: 11,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
            }}
          >
            scroll ↓
          </span>
        </div>
        <div className="relative w-full h-[60vh] md:h-[80vh] rounded-sm overflow-hidden bg-[color:var(--color-bg-alt)]">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={unsplashUrl(IMG.hero, 1600)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={VIDEOS.hero} type="video/mp4" />
          </video>
          <div
            className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
            style={{ background: "linear-gradient(to top, var(--color-bg), transparent)" }}
          />
        </div>
      </div>
    </section>
  );
}
