"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const DOT_COUNT = 5;
const STORAGE_KEY = "raji-preloader-seen";

export default function Preloader() {
  const [show, setShow] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const overlay = overlayRef.current;
    const ring = ringRef.current;
    if (!overlay || !ring) return;
    const dots = Array.from(overlay.querySelectorAll<HTMLElement>(".raji-preloader-dot"));
    if (dots.length === 0) return;

    document.documentElement.style.overflow = "hidden";

    const radius = 64;
    dots.forEach((dot, i) => {
      const angle = (i / dots.length) * Math.PI * 2 - Math.PI / 2;
      gsap.set(dot, {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        scale: 0,
        opacity: 0,
      });
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        sessionStorage.setItem(STORAGE_KEY, "1");
        document.documentElement.style.overflow = "";
        setShow(false);
      },
    });

    tl.to(dots, {
      scale: 1,
      opacity: 1,
      duration: 0.35,
      stagger: 0.05,
      ease: "back.out(2)",
    }, 0.1);

    tl.to(ring, { rotation: 540, duration: 1.2, ease: "power2.inOut" }, 0.3);

    const logoDot = document.querySelector<HTMLElement>(".raji-nav .logo .logo-dot");
    const startDotSize = 18;
    const ringRect = ring.getBoundingClientRect();
    const ringCenterX = ringRect.left + ringRect.width / 2;
    const ringCenterY = ringRect.top + ringRect.height / 2;
    let targetX = -ringCenterX + 60;
    let targetY = -ringCenterY + 40;
    let targetScale = 0.4;
    if (logoDot) {
      const r = logoDot.getBoundingClientRect();
      targetX = r.left + r.width / 2 - ringCenterX;
      targetY = r.top + r.height / 2 - ringCenterY;
      targetScale = Math.max(r.width / startDotSize, 0.2);
    }

    tl.to(dots.slice(1), {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      duration: 0.45,
      ease: "power3.in",
      stagger: 0.04,
    }, 1.5);

    tl.to(dots[0], {
      x: targetX,
      y: targetY,
      scale: targetScale,
      duration: 0.75,
      ease: "expo.inOut",
    }, 1.55);

    tl.to(overlay, { opacity: 0, duration: 0.35, ease: "power2.in" }, "-=0.15");

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div ref={overlayRef} className="raji-preloader" aria-hidden="true">
      <div ref={ringRef} className="raji-preloader-ring">
        {Array.from({ length: DOT_COUNT }, (_, i) => (
          <div key={i} className="raji-preloader-dot" />
        ))}
      </div>
    </div>
  );
}
