"use client";
import Image from "next/image";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useImageReveal } from "@/hooks/useImageReveal";
import { IMG, unsplashUrl } from "@/lib/unsplash";
import Button from "@/components/ui/Button";

export default function DailyPlannerFeature() {
  const img = useImageReveal();
  const txt = useFadeUp({ selector: ".fu", stagger: 0.12 });
  return (
    <section className="container-x" style={{ padding: "120px 0" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={img as React.Ref<HTMLDivElement>} className="relative w-full h-[60vh] md:h-[80vh]">
          <Image src={unsplashUrl(IMG.desk2, 1200)} alt="Daily Planner" fill sizes="(max-width: 767px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        </div>
        <div ref={txt as React.Ref<HTMLDivElement>} className="flex flex-col gap-7 max-w-[480px]">
          <span className="fu eyebrow-italic">Plan like a boss!</span>
          <h2 className="fu" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>Daily Planner</h2>
          <p className="fu" style={{ color: "var(--color-text-muted)", fontSize: 17, lineHeight: 1.75 }}>
            Achieve more by setting up goals in a way you can monitor and check in on your progress. My daily planner
            will take only 10 minutes per day to dramatically transform your day-to-day performance.
          </p>
          <div className="fu">
            <Button variant="filled">start planning</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
