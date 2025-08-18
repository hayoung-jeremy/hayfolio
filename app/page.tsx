"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

import { Footer, IntroText, Navigation } from "@/components/ui";
import { ClarinsPreview } from "@/components/ui/clarins";
import { AiPreview } from "@/components/ui/ai";
import { PeviewScenesController } from "@/components/3d/scenes";

import { useInteractionLayerStore } from "@/store/useInteractionLayerStore";
import { useSceneStore } from "@/store/useSceneStore";
import { useScrollStore } from "@/store/useScrollStore";
import { getActivePreviewSection } from "@/utils/home";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const setDomElement = useInteractionLayerStore(s => s.setDomElement);
  const progress = useScrollStore(s => s.progress);

  const active = getActivePreviewSection(progress);
  const showClarins = active?.key === "clarins";
  const showAI = active?.key === "ai";

  useLayoutEffect(() => {
    if (ref.current) setDomElement(ref.current);
    return () => setDomElement(null);
  }, []);

  useLayoutEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isBackForward = nav?.type === "back_forward";
    const shouldRestore = isBackForward || sessionStorage.getItem("home-restore") === "1";

    if (!shouldRestore) {
      useScrollStore.getState().setProgress(0);
      return;
    }

    const raw = sessionStorage.getItem("home-progress") ?? sessionStorage.getItem("scroll-progress");
    const p = raw ? parseFloat(raw) : 0;

    const el = document.querySelector(".PeviewScenesController") as HTMLElement | null;
    if (el) {
      try {
        window.history.scrollRestoration = "manual";
      } catch {}
      const start = el.offsetTop;
      const end = start + el.offsetHeight - window.innerHeight;
      const len = Math.max(0, end - start);
      const y = Math.round(start + p * len);

      window.scrollTo(0, y);
    }

    useScrollStore.getState().setProgress(p);
    sessionStorage.removeItem("home-restore");
  }, []);

  useGSAP(() => {
    gsap.to(".IntroText", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".IntroText",
        start: "top top",
        end: "top+=480",
        scrub: true,
      },
    });

    gsap.to(".PeviewScenesController", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".PeviewScenesController",
        start: "top 40%",
        end: "top top",
        scrub: true,
      },
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    useSceneStore.getState().setScene("none");
  }, []);

  useEffect(() => {
    return () => {
      const p = useScrollStore.getState().progress;
      sessionStorage.setItem("home-progress", String(p));
      sessionStorage.setItem("scroll-progress", String(p));
    };
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1 }}
    >
      <IntroText />
      <div ref={ref} className="PeviewScenesController opacity-0 h-[500vh] relative z-10">
        <div className="sticky top-0 h-screen">
          <AnimatePresence mode="wait">
            {showClarins && <ClarinsPreview />}
            {showAI && <AiPreview />}
          </AnimatePresence>
          <PeviewScenesController />
          <Navigation />
        </div>
      </div>
      <Footer />
    </motion.main>
  );
}
