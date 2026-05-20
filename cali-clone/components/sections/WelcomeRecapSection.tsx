"use client";
import { useFadeUp } from "@/hooks/useFadeUp";

export default function WelcomeRecapSection() {
  const ref = useFadeUp({ selector: ".fu", stagger: 0.2 });
  return (
    <section className="container-x" style={{ padding: "80px 0" }}>
      <div ref={ref as React.Ref<HTMLDivElement>} className="flex flex-col items-center text-center gap-6 max-w-[800px] mx-auto">
        <h2 className="fu" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>Welcome to Raji</h2>
        <p
          className="fu"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(16px, 1.5vw, 20px)",
            color: "var(--color-text-muted)",
            lineHeight: 1.5,
            maxWidth: 620,
          }}
        >
          inspired creative and educator, with an eye for subtle sophistication and aspiration, building magnetic
          projects for your business
        </p>
      </div>
    </section>
  );
}
