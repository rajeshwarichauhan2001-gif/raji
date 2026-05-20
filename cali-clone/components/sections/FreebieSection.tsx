"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import { useFadeUp } from "@/hooks/useFadeUp";
import { useImageReveal } from "@/hooks/useImageReveal";
import { useUnderlineDraw } from "@/hooks/useUnderlineDraw";
import { IMG, unsplashUrl } from "@/lib/unsplash";

export default function FreebieSection() {
  const img = useImageReveal();
  const txt = useFadeUp({ selector: ".fu", stagger: 0.12 });
  const formRef = useUnderlineDraw();
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setState("idle");
    setTimeout(() => setState(Math.random() > 0.05 ? "ok" : "err"), 800);
  };

  return (
    <section className="container-x" style={{ padding: "120px 0" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={img as React.Ref<HTMLDivElement>} className="relative w-full h-[60vh] md:h-[80vh]">
          <Image src={unsplashUrl(IMG.portrait4, 1200)} alt="Freebie" fill sizes="(max-width: 767px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        </div>
        <div ref={txt as React.Ref<HTMLDivElement>} className="flex flex-col gap-5 max-w-[480px]">
          <span className="fu eyebrow-italic">freebie</span>
          <span className="fu eyebrow">Get it Now</span>
          <h2 className="fu" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>snag my freebie!</h2>
          <h3 className="fu" style={{ fontSize: 26, fontStyle: "italic" }}>10 high-ticket sales in a month</h3>
          <p className="fu" style={{ color: "var(--color-text-muted)", fontSize: 16, lineHeight: 1.7 }}>
            The exact script structure, the calm follow-up sequence, and the energetic posture I lean on when I want a
            month to close strong. Free, instant, no funnels.
          </p>
          <form ref={formRef as React.Ref<HTMLFormElement>} onSubmit={onSubmit} className="fu flex flex-col gap-5 mt-2">
            <div className="relative">
              <input
                type="email"
                required
                placeholder="Your email address"
                style={{
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  borderBottom: "1px solid var(--color-text)",
                  padding: "16px 0",
                  fontSize: 16,
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text)",
                  outline: "none",
                }}
              />
              <svg className="absolute left-0" width="100%" height="2" style={{ bottom: 0 }}>
                <line className="draw-line" x1="0" y1="1" x2="100%" y2="1" stroke="var(--color-accent-2)" strokeWidth="2" />
              </svg>
            </div>
            <button type="submit" className="pill pill-filled self-start">Get it Now</button>
            {state === "ok" && <p style={{ color: "var(--color-accent-2)", fontSize: 14 }}>Thank you! Your Freebie is under the link →</p>}
            {state === "err" && <p style={{ color: "#b03a2e", fontSize: 14 }}>Oops! Something went wrong while submitting the form.</p>}
            <p style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
              By subscribing you agree to our Privacy Policy. You can unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
