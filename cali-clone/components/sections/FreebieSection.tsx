"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import { useImageReveal } from "@/hooks/useImageReveal";
import { unsplashUrl } from "@/lib/unsplash";

export default function FreebieSection() {
  const img = useImageReveal();
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setState("idle");
    setTimeout(() => setState(Math.random() > 0.05 ? "ok" : "err"), 800);
  };

  return (
    <section className="container-x" style={{ padding: "120px 0" }}>
      <div className="freebie-grid">
        <div ref={img as React.Ref<HTMLDivElement>} className="freebie-media">
          <Image
            src={unsplashUrl("photo-1487412720507-e7ab37603c6f", 1200)}
            alt="Let's connect"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="freebie-copy">
          <span className="eyebrow-italic">let&apos;s connect</span>
          <span className="eyebrow">Get in Touch</span>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", margin: 0 }}>Sounds Good? Let&apos;s connect</h2>
          <h3 style={{ fontSize: 26, fontStyle: "italic", margin: 0 }}>
            Let&apos;s talk about your project, your idea, your vision
          </h3>
          <p style={{ color: "var(--color-text-muted)", fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            Drop your email and I&apos;ll be in touch for a free 30-minute discovery call —
            no pressure, no obligation, just a real conversation about your social media goals.
          </p>
          <form onSubmit={onSubmit} className="freebie-form">
            <div style={{ position: "relative" }}>
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
            </div>
            <button type="submit" className="pill pill-filled" style={{ alignSelf: "flex-start" }}>Send Message</button>
            {state === "ok" && <p style={{ color: "var(--color-accent-2)", fontSize: 14, margin: 0 }}>Thank you! I&apos;ll be in touch shortly.</p>}
            {state === "err" && <p style={{ color: "#b03a2e", fontSize: 14, margin: 0 }}>Oops! Something went wrong while submitting the form.</p>}
            <p style={{ fontSize: 11, color: "var(--color-text-muted)", margin: 0 }}>
              By subscribing you agree to our Privacy Policy. You can unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
