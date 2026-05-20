"use client";
import Image from "next/image";
import { useFadeUp } from "@/hooks/useFadeUp";
import { IMG, unsplashUrl } from "@/lib/unsplash";
import Button from "@/components/ui/Button";

export default function DailyPlannerExpanded() {
  const ref = useFadeUp({ selector: ".fu", stagger: 0.12 });
  return (
    <section className="relative overflow-hidden" style={{ padding: "160px 0" }}>
      <div className="hidden md:block absolute -z-0 pointer-events-none" style={{ top: "50%", left: "4vw", width: 200, height: 280, transform: "translateY(-50%)" }}>
        <Image src={unsplashUrl(IMG.flat1, 600)} alt="" fill sizes="200px" style={{ objectFit: "cover" }} />
      </div>
      <div className="hidden md:block absolute -z-0 pointer-events-none" style={{ top: "50%", right: "4vw", width: 220, height: 300, transform: "translateY(-50%)" }}>
        <Image src={unsplashUrl(IMG.desk6, 600)} alt="" fill sizes="220px" style={{ objectFit: "cover" }} />
      </div>
      <div ref={ref as React.Ref<HTMLDivElement>} className="container-x relative z-10 flex flex-col gap-7 max-w-[720px] mx-auto">
        <span className="fu eyebrow-italic">its all about intention</span>
        <h2 className="fu" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>Daily Planner</h2>
        <p className="fu" style={{ color: "var(--color-text-muted)", fontSize: 17, lineHeight: 1.75 }}>
          The planner is the quiet anchor for your week. Each spread holds one big intention, three meaningful tasks,
          a place to capture what surprised you, and ten lines for the parts of your work you forget to celebrate.
        </p>
        <p className="fu" style={{ color: "var(--color-text-muted)", fontSize: 17, lineHeight: 1.75 }}>
          Use it standalone or with the Raji studio system — either way, ten minutes a day is all it needs.
        </p>
        <div className="fu">
          <Button variant="outlined">start planning</Button>
        </div>
      </div>
    </section>
  );
}
