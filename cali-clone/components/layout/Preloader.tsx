"use client";
import { useEffect, useRef, useState } from "react";

const DOT_START_SIZE = 28;

type Stage = "enter" | "pulse" | "fly" | "fade";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [stage, setStage] = useState<Stage>("enter");
  const [target, setTarget] = useState<{ x: number; y: number; scale: number } | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = "hidden";

    const t1 = window.setTimeout(() => setStage("pulse"), 60);
    const t2 = window.setTimeout(() => {
      const dot = dotRef.current;
      const logoDot = document.querySelector<HTMLElement>(".raji-nav .logo .logo-dot");
      if (dot && logoDot) {
        const dRect = dot.getBoundingClientRect();
        const lRect = logoDot.getBoundingClientRect();
        const dx = (lRect.left + lRect.width / 2) - (dRect.left + dRect.width / 2);
        const dy = (lRect.top + lRect.height / 2) - (dRect.top + dRect.height / 2);
        const scale = Math.max(lRect.width / DOT_START_SIZE, 0.15);
        setTarget({ x: dx, y: dy, scale });
      } else {
        setTarget({ x: -window.innerWidth / 2 + 60, y: -window.innerHeight / 2 + 40, scale: 0.2 });
      }
      setStage("fly");
    }, 1700);
    const t3 = window.setTimeout(() => setStage("fade"), 2700);
    const t4 = window.setTimeout(() => {
      document.documentElement.style.overflow = "";
      setShow(false);
    }, 3300);

    return () => {
      [t1, t2, t3, t4].forEach(clearTimeout);
    };
  }, [show]);

  if (!show) return null;

  const overlayStyle: React.CSSProperties = {
    opacity: stage === "fade" ? 0 : 1,
    transition: "opacity 600ms cubic-bezier(0.4, 0, 1, 1)",
  };

  let dotStyle: React.CSSProperties = {
    transform: "translate(0,0) scale(0)",
    opacity: 0,
    transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 500ms ease-out",
  };
  if (stage === "pulse") {
    dotStyle = {
      transform: "translate(0,0) scale(1)",
      opacity: 1,
      animation: "raji-preloader-pulse 1.2s ease-in-out 1",
    };
  }
  if (stage === "fly" && target) {
    dotStyle = {
      transform: `translate(${target.x}px, ${target.y}px) scale(${target.scale})`,
      opacity: 1,
      transition:
        "transform 1100ms cubic-bezier(0.87, 0, 0.13, 1), opacity 1100ms ease-out",
    };
  }
  if (stage === "fade" && target) {
    dotStyle = {
      transform: `translate(${target.x}px, ${target.y}px) scale(${target.scale})`,
      opacity: 0,
      transition: "opacity 500ms ease-in",
    };
  }

  return (
    <div ref={overlayRef} className="raji-preloader" aria-hidden="true" style={overlayStyle}>
      <div ref={dotRef} className="raji-preloader-dot" style={dotStyle} />
    </div>
  );
}
