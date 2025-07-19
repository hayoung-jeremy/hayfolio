// hooks/useLenis.ts
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis: Lenis | null = null;

export const useLenis = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!lenis) {
      lenis = new Lenis({
        lerp: 0.1, // 0 ~ 1 (감속 정도)
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        ScrollTrigger.update(); // ← 꼭 필요함!
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    }

    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
};
