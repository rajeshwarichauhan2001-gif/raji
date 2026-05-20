"use client";
import { useGSAP } from "@gsap/react";
import { useRef, RefObject } from "react";
import { gsap, Observer } from "@/lib/gsap";

export function usePodcastRail(duration = 40) {
  const ref = useRef<HTMLElement | null>(null);
  useGSAP(
    () => {
      const track = ref.current?.querySelector<HTMLElement>(".rail-track");
      if (!track || !ref.current) return;
      const tween = gsap.to(track, {
        xPercent: -50,
        duration,
        ease: "none",
        repeat: -1,
      });
      const obs = Observer.create({
        target: ref.current,
        type: "pointer,touch",
        onPress: () => tween.pause(),
        onRelease: () => tween.play(),
        onDrag: (self) => {
          gsap.to(track, { x: `+=${self.deltaX}`, duration: 0.1 });
        },
      });
      return () => obs.kill();
    },
    { scope: ref as RefObject<HTMLElement> }
  );
  return ref;
}
