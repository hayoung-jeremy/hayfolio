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
  }, []);

  useLayoutEffect(() => {
    if (ref.current) {
      setDomElement(ref.current);
    }
  }, []);

  useEffect(() => {
    useSceneStore.getState().setScene("none");
    useScrollStore.getState().setProgress(0);
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
