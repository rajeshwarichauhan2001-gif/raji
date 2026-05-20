"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const PLAYED = new WeakSet<Element>();

export function useImageReveal(opts: { selector?: string } = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const { selector = "img, video, .reveal-target" } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (!targets.length) return;
    const trigger = (el.closest("section") as HTMLElement) || el;
    if (PLAYED.has(trigger)) return;

    gsap.set(targets, { scale: 1.08, opacity: 0 });

    const play = () => {
      if (PLAYED.has(trigger)) return;
      PLAYED.add(trigger);
      gsap.to(targets, { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out", overwrite: "auto" });
    };

    const inOrPastView = () => trigger.getBoundingClientRect().top < window.innerHeight * 0.9;

    if (inOrPastView()) {
      play();
      return;
    }

    const st = ScrollTrigger.create({ trigger, start: "top 90%", once: true, onEnter: play });
    const onScroll = () => { if (inOrPastView()) play(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const tIds = [50, 250, 800, 2000].map(ms => window.setTimeout(() => { ScrollTrigger.refresh(); if (inOrPastView()) play(); }, ms));

    return () => {
      tIds.forEach(clearTimeout);
      window.removeEventListener("scroll", onScroll);
      st.kill();
    };
  }, []);

  return ref;
}
