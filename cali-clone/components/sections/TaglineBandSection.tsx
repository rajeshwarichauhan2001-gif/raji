"use client";
import { useFadeUp } from "@/hooks/useFadeUp";

export default function TaglineBandSection() {
  const ref = useFadeUp({ selector: ".fu", stagger: 0, duration: 1 });
  return (
    <section style={{ padding: "80px 0" }}>
      <div ref={ref as React.Ref<HTMLDivElement>} className="container-x">
        <p
          className="fu mx-auto text-center"
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            maxWidth: 900,
            fontSize: "clamp(18px, 2vw, 28px)",
            lineHeight: 1.5,
          }}
        >
          welcome to raji world, in the next couple of weeks we are going to transform your business and bring it to the
          next level
        </p>
      </div>
    </section>
  );
}
