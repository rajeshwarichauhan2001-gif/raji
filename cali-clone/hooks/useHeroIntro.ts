"use client";
import { useGSAP } from "@gsap/react";
import { useRef, RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { splitChars } from "@/lib/splitChars";

export function useHeroIntro() {
  const ref = useRef<HTMLElement | null>(null);
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const h1 = root.querySelector<HTMLElement>(".hero-h1");
      const eyebrow = root.querySelector<HTMLElement>(".hero-eyebrow");
      const cue = root.querySelector<HTMLElement>(".scroll-cue");
      const chars = h1 ? splitChars(h1) : [];
      const tl = gsap.timeline();
      if (chars.length) {
        tl.from(chars, {
          y: 100,
          opacity: 0,
          stagger: 0.02,
          duration: 1,
          ease: "power4.out",
        });
      }
      if (eyebrow) tl.from(eyebrow, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 0.6);
      if (cue) {
        tl.from(cue, { opacity: 0, duration: 0.5 }, 0.9);
        gsap.to(cue, { y: 12, repeat: -1, yoyo: true, duration: 1.4, ease: "sine.inOut" });
      }
    },
    { scope: ref as RefObject<HTMLElement> }
  );
  return ref;
}
