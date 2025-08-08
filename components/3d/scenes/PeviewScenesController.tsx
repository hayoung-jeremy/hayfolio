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

  const renderGarageScene =
    progress >= SCROLL_THRESHOLDS.createYourEpicCar.min && progress < SCROLL_THRESHOLDS.createYourEpicCar.max;

  const renderXperiencemor3Scene = progress >= SCROLL_THRESHOLDS.xperiencemor3.min;

  useEffect(() => {
    if (progress < SCROLL_THRESHOLDS.createYourEpicCar.min || progress === 1) {
      if (currentScene !== "none") {
        setScene("none");
      }
    } else if (renderGarageScene && currentScene !== "garage preview") {
      setScene("garage preview");
    } else if (renderXperiencemor3Scene && currentScene !== "xperiencemor3 preview") {
      setScene("xperiencemor3 preview");
    }
  }, [progress, currentScene, renderGarageScene, renderXperiencemor3Scene]);

  return null;
};

export default PeviewScenesController;
