"use client";
import { useGSAP } from "@gsap/react";
import { useRef, RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useFloatingCTA() {
  const ref = useRef<HTMLElement | null>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.set(ref.current, { opacity: 0, y: 20 });
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: document.body, start: "top -200" },
      });
    },
    { scope: ref as RefObject<HTMLElement> }
  );
  return ref;
}
