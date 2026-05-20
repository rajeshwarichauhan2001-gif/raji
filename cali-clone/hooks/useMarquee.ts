"use client";
import { useGSAP } from "@gsap/react";
import { useRef, RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useMarquee(opts: { duration?: number; direction?: 1 | -1; pauseOnHover?: boolean } = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const { duration = 30, direction = -1, pauseOnHover = true } = opts;
  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>(".marquee-track");
      if (!track) return;
      const tween = gsap.to(track, {
        xPercent: direction * 50,
        duration,
        ease: "none",
        repeat: -1,
      });
      if (pauseOnHover && ref.current) {
        const el = ref.current;
        const onEnter = () => tween.pause();
        const onLeave = () => tween.play();
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        return () => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        };
      }
    },
    { scope: ref as RefObject<HTMLElement> }
  );
  return ref;
}
