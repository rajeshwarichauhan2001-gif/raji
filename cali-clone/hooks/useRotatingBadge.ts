"use client";
import { useGSAP } from "@gsap/react";
import { useRef, RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useRotatingBadge(duration = 22) {
  const ref = useRef<HTMLElement | null>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        rotation: 360,
        duration,
        ease: "none",
        repeat: -1,
        transformOrigin: "center center",
      });
    },
    { scope: ref as RefObject<HTMLElement> }
  );
  return ref;
}
