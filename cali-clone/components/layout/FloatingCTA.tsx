"use client";
import { useFloatingCTA } from "@/hooks/useFloatingCTA";

export default function FloatingCTA() {
  const ref = useFloatingCTA();
  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href="/shop"
      className="fixed z-[55]"
      style={{
        bottom: 24,
        right: 24,
        background: "var(--color-accent-2)",
        color: "var(--color-bg)",
        borderRadius: 999,
        height: 48,
        padding: "0 24px",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        letterSpacing: "0.05em",
      }}
    >
      <span className="hidden md:inline">purchase template</span>
      <span aria-hidden>↗</span>
    </a>
  );
}
