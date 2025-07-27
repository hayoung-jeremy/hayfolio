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
        lerp: 0.1,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        ScrollTrigger.update();
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
