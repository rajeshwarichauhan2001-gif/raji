"use client";
import { useCookieStrip } from "@/hooks/useCookieStrip";

export default function CookieStrip() {
  const { ref, open, dismiss } = useCookieStrip();
  if (!open) return null;
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="fixed bottom-0 left-0 right-0 z-[80]"
      style={{
        background: "var(--color-text)",
        color: "var(--color-bg)",
        padding: "20px 32px",
        opacity: 0,
        transform: "translateY(100%)",
      }}
    >
      <div className="container-x flex flex-wrap items-center justify-between gap-4">
        <p style={{ fontSize: 13, maxWidth: 640 }}>
          We use cookies to make your raji.world experience warmer. By browsing on, you agree to our policy.
        </p>
        <button
          onClick={dismiss}
          className="pill"
          style={{
            background: "var(--color-bg)",
            color: "var(--color-text)",
            height: 44,
            padding: "0 28px",
            border: "1px solid var(--color-bg)",
          }}
        >
          got it
        </button>
      </div>
    </div>
  );
}
