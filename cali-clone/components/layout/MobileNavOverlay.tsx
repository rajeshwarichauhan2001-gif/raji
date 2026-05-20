"use client";
import { useGSAP } from "@gsap/react";
import { useRef, RefObject } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

type Link = { label: string; href: string };
type Props = { open: boolean; onClose: () => void; links: Link[] };

export default function MobileNavOverlay({ open, onClose, links }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const backdrop = root.querySelector(".m-backdrop");
      const panel = root.querySelector(".m-panel");
      const items = root.querySelectorAll(".m-link");
      if (open) {
        gsap.set(root, { pointerEvents: "auto" });
        const tl = gsap.timeline();
        tl.to(backdrop, { opacity: 1, duration: 0.2 })
          .fromTo(panel, { x: "100%" }, { x: "0%", duration: 0.35, ease: "power3.out" }, 0)
          .fromTo(items, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4 }, 0.2);
      } else {
        gsap.to(panel, { x: "100%", duration: 0.3, ease: "power3.in" });
        gsap.to(backdrop, { opacity: 0, duration: 0.2, onComplete: () => gsap.set(root, { pointerEvents: "none" }) });
      }
    },
    { dependencies: [open], scope: ref as RefObject<HTMLElement> }
  );

  return (
    <div ref={ref} className="fixed inset-0 z-[60]" style={{ pointerEvents: "none" }}>
      <div className="m-backdrop absolute inset-0" style={{ background: "rgba(58,47,26,0.4)", opacity: 0 }} onClick={onClose} />
      <div
        className="m-panel absolute top-0 right-0 h-full w-full max-w-[420px] flex flex-col gap-8 p-10 pt-24"
        style={{ background: "var(--color-bg)", transform: "translateX(100%)" }}
      >
        <button onClick={onClose} aria-label="close menu" className="absolute top-6 right-6" style={{ fontSize: 20 }}>
          ×
        </button>
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="m-link" style={{ fontSize: 28, fontFamily: "var(--font-display)", fontStyle: "italic" }} onClick={onClose}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
