"use client";
import { useGSAP } from "@gsap/react";
import { useRef, RefObject } from "react";
import { gsap } from "@/lib/gsap";

export function useRowHover() {
  const ref = useRef<HTMLElement | null>(null);
  useGSAP(
    () => {
      const rows = ref.current?.querySelectorAll<HTMLElement>(".row-hover");
      if (!rows) return;
      rows.forEach((row) => {
        const content = row.querySelector(".row-content");
        const arrow = row.querySelector(".row-arrow");
        const onEnter = () => {
          if (content) gsap.to(content, { x: 12, duration: 0.25, ease: "power2.out" });
          if (arrow) gsap.to(arrow, { x: 20, duration: 0.25, ease: "power2.out" });
        };
        const onLeave = () => {
          if (content) gsap.to(content, { x: 0, duration: 0.25 });
          if (arrow) gsap.to(arrow, { x: 0, duration: 0.25 });
        };
        row.addEventListener("mouseenter", onEnter);
        row.addEventListener("mouseleave", onLeave);
      });
    },
    { scope: ref as RefObject<HTMLElement> }
  );
  return ref;
}
