"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);
  ScrollTrigger.defaults({
    start: "top 80%",
    toggleActions: "play none none none",
  });
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, ScrollToPlugin, Observer };
