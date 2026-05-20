"use client";
import Image from "next/image";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useImageReveal } from "@/hooks/useImageReveal";
import { IMG, unsplashUrl } from "@/lib/unsplash";
import EyebrowText from "@/components/ui/EyebrowText";
import Button from "@/components/ui/Button";

export default function HeyImRajiIntroSection() {
  const textRef = useFadeUp({ selector: ".fu", stagger: 0.15 });
  const imgRef = useImageReveal();

  return (
    <section style={{ padding: "120px 0" }} className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16 items-center">
        <div
          ref={imgRef as React.Ref<HTMLDivElement>}
          className="relative w-full h-[60vh] md:h-[80vh]"
        >
          <Image
            src={unsplashUrl(IMG.portrait2, 1200)}
            alt="Raji portrait"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div ref={textRef as React.Ref<HTMLDivElement>} className="container-x md:px-12 flex flex-col gap-7 max-w-[560px]">
          <span className="fu eyebrow-italic">Hey, I am Raji</span>
          <h2 className="fu" style={{ fontSize: "clamp(36px, 6vw, 88px)" }}>Hey, I am Raji</h2>
          <p className="fu" style={{ fontSize: 17, lineHeight: 1.7, color: "var(--color-text-muted)" }}>
            I&apos;m passionate about helping female creatives and dreamers bring their vision to life. I offer soulful,
            feminine, and timeless strategy that helps you create the life and business you love.
          </p>
          <div className="fu">
            <Button variant="outlined">discovery call</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
