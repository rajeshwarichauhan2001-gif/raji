"use client";
import { useGSAP } from "@gsap/react";
import { useRef, RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useCountUp(target: number, suffix = "") {
  const ref = useRef<HTMLElement | null>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`;
        },
      });
    },
    { scope: ref as RefObject<HTMLElement> }
  );
  return ref;
}
