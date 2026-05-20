"use client";
import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect, RefObject } from "react";
import { gsap } from "@/lib/gsap";

const KEY = "raji-cookie-accepted";

export function useCookieStrip() {
  const ref = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setOpen(localStorage.getItem(KEY) !== "1");
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !open) return;
      gsap.fromTo(
        ref.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.8 }
      );
    },
    { dependencies: [open], scope: ref as RefObject<HTMLElement> }
  );

  const dismiss = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      yPercent: 100,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        localStorage.setItem(KEY, "1");
        setOpen(false);
      },
    });
  };

  return { ref, open, dismiss };
}
