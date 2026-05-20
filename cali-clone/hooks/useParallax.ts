"use client";
import { useGSAP } from "@gsap/react";
import { useRef, RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useParallax(opts: { multiplier?: number; max?: number } = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const { multiplier = 0.2, max = 120 } = opts;
  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        y: () => -max * multiplier,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref as RefObject<HTMLElement> }
  );
  return ref;
}
