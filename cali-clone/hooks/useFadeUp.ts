"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Opts = {
  selector?: string;
  stagger?: number;
  delay?: number;
  y?: number;
  duration?: number;
};

const PLAYED = new WeakSet<Element>();

export function useFadeUp(opts: Opts = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const { selector = ":scope > *", stagger = 0.12, delay = 0, y = 40, duration = 0.8 } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = Array.from(el.querySelectorAll<HTMLElement>(selector));
    if (!targets.length) return;
    const trigger = (el.closest("section") as HTMLElement) || el;
    if (PLAYED.has(trigger)) return;

    gsap.set(targets, { opacity: 0, y });

    const play = () => {
      if (PLAYED.has(trigger)) return;
      PLAYED.add(trigger);
      gsap.to(targets, { y: 0, opacity: 1, duration, stagger, delay, ease: "power3.out", overwrite: "auto" });
    };

    const inOrPastView = () => {
      const r = trigger.getBoundingClientRect();
      return r.top < window.innerHeight * 0.9;
    };

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
