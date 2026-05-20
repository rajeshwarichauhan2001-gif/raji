"use client";
import { useGSAP } from "@gsap/react";
import { useRef, RefObject } from "react";
import { gsap } from "@/lib/gsap";
import Button from "@/components/ui/Button";

type Props = { open: boolean; onClose: () => void };

export default function CartDrawer({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const backdrop = root.querySelector(".c-backdrop");
      const panel = root.querySelector(".c-panel");
      if (open) {
        gsap.set(root, { pointerEvents: "auto" });
        gsap.to(backdrop, { opacity: 1, duration: 0.2 });
        gsap.fromTo(panel, { x: "100%" }, { x: "0%", duration: 0.35, ease: "power3.out" });
      } else {
        gsap.to(panel, { x: "100%", duration: 0.3, ease: "power3.in" });
        gsap.to(backdrop, { opacity: 0, duration: 0.2, onComplete: () => gsap.set(root, { pointerEvents: "none" }) });
      }
    },
    { dependencies: [open], scope: ref as RefObject<HTMLElement> }
  );

  return (
    <div ref={ref} className="fixed inset-0 z-[70]" style={{ pointerEvents: "none" }}>
      <div className="c-backdrop absolute inset-0" style={{ background: "rgba(58,47,26,0.4)", opacity: 0 }} onClick={onClose} />
      <aside
        className="c-panel absolute top-0 right-0 h-full w-full max-w-[420px] flex flex-col"
        style={{ background: "var(--color-bg)", transform: "translateX(100%)" }}
      >
        <div className="flex items-center justify-between p-8" style={{ borderBottom: "1px solid var(--color-divider)" }}>
          <h2 style={{ fontSize: 24 }}>Your Cart</h2>
          <button onClick={onClose} aria-label="close cart" style={{ fontSize: 20 }}>×</button>
        </div>
        <div className="flex-1 flex items-center justify-center p-8" style={{ color: "var(--color-text-muted)", fontStyle: "italic" }}>
          No items found.
        </div>
        <div className="p-8" style={{ borderTop: "1px solid var(--color-divider)" }}>
          <div className="flex justify-between mb-4" style={{ fontSize: 14 }}>
            <span>Subtotal</span>
            <span>₹0.00</span>
          </div>
          <p className="mb-6" style={{ fontSize: 12, color: "var(--color-text-muted)" }}>Pay with browser.</p>
          <Button variant="filled" className="w-full">continue to checkout</Button>
        </div>
      </aside>
    </div>
  );
}
