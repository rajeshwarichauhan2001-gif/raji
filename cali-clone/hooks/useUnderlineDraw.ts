"use client";
import { useGSAP } from "@gsap/react";
import { useRef, RefObject } from "react";
import { gsap } from "@/lib/gsap";

// Fallback for DrawSVGPlugin — uses stroke-dasharray/dashoffset directly.
export function useUnderlineDraw() {
  const ref = useRef<HTMLElement | null>(null);
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const input = root.querySelector<HTMLInputElement>("input[type='email']");
      const line = root.querySelector<SVGGeometryElement>(".draw-line");
      if (!input || !line) return;
      const len = line.getTotalLength();
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      const onFocus = () => gsap.to(line, { strokeDashoffset: 0, duration: 0.6, ease: "power3.out" });
      const onBlur = () => gsap.to(line, { strokeDashoffset: len, duration: 0.4 });
      input.addEventListener("focus", onFocus);
      input.addEventListener("blur", onBlur);
      return () => {
        input.removeEventListener("focus", onFocus);
        input.removeEventListener("blur", onBlur);
      };
    },
    { scope: ref as RefObject<HTMLElement> }
  );
  return ref;
}
