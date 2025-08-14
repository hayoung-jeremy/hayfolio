import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useScrollStore } from "@/store/useScrollStore";
import { useSceneStore } from "@/store/useSceneStore";
import { SCROLL_THRESHOLDS } from "@/constants/scrollThresholds";

gsap.registerPlugin(ScrollTrigger);

const PeviewScenesController = () => {
  const progress = useScrollStore(s => s.progress);
  const { currentScene, setScene } = useSceneStore();

  useGSAP(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".PeviewScenesController",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: self => {
          useScrollStore.getState().setProgress(self.progress);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const inCYEC =
    progress >= SCROLL_THRESHOLDS.createYourEpicCar.min && progress < SCROLL_THRESHOLDS.createYourEpicCar.max;
  const inXM3 = progress >= SCROLL_THRESHOLDS.xperiencemor3.min && progress < SCROLL_THRESHOLDS.xperiencemor3.max;
  const inClarins = progress >= SCROLL_THRESHOLDS.clarins.min && progress < SCROLL_THRESHOLDS.clarins.max;
  const inAI = progress >= SCROLL_THRESHOLDS.ai.min && progress < SCROLL_THRESHOLDS.ai.max;

  useEffect(() => {
    if (progress < SCROLL_THRESHOLDS.createYourEpicCar.min || progress >= 0.9999) {
      if (currentScene !== "none") setScene("none");
      return;
    }
    if (inCYEC && currentScene !== "garage preview") setScene("garage preview");
    else if (inXM3 && currentScene !== "xperiencemor3 preview") setScene("xperiencemor3 preview");
    else if ((inClarins || inAI) && currentScene !== "none") setScene("none");
  }, [progress, inCYEC, inXM3, inClarins, inAI, currentScene, setScene]);

  return null;
};

export default PeviewScenesController;
