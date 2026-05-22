"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";

export default function FreebieSection() {
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setState("idle");
    setTimeout(() => setState(Math.random() > 0.05 ? "ok" : "err"), 800);
  };

  return (
    <section className="freebie-section">
      <div className="freebie-grid">

        {/* LEFT — full portrait image, natural ratio */}
        <div className="freebie-media">
          <Image
            src="/images/raji-library.png"
            alt="Raji at her creative workspace"
            width={941}
            height={1672}
            priority
            sizes="(max-width: 767px) 100vw, 50vw"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: 20 }}
          />
        </div>

        {/* RIGHT — sticky form panel */}
        <div className="freebie-copy">
          <div className="freebie-copy-inner">
            <span className="eyebrow-italic">let&apos;s connect</span>
            <h2 className="freebie-heading">
              Sounds Good?<br />
              <em>Let&apos;s connect.</em>
            </h2>
            <p className="freebie-body">
              Drop your email and I&apos;ll reach out for a free 30-minute discovery call —
              no pressure, no obligation, just a real conversation about your social media goals.
            </p>
            <form onSubmit={onSubmit} className="freebie-form">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="freebie-input"
              />
              <button type="submit" className="pill pill-filled freebie-btn">
                Send Message
              </button>
              {state === "ok" && (
                <p className="freebie-msg freebie-msg--ok">
                  Thank you! I&apos;ll be in touch shortly.
                </p>
              )}
              {state === "err" && (
                <p className="freebie-msg freebie-msg--err">
                  Oops! Something went wrong. Please try again.
                </p>
              )}
              <p className="freebie-legal">
                By submitting you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
