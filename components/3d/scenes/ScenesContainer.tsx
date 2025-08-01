import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import CanvasWrapper from "../CanvasWrapper";
import { CreateYourEpicCarPreviewScene } from "./garage";
import Xperiencemor3PreviewScene from "./Xperiencemor3PreviewScene";
import { useScrollStore } from "@/store/useScrollStore";
import { SCROLL_THRESHOLDS } from "@/constants/scrollThresholds";

gsap.registerPlugin(ScrollTrigger);

const ScenesContainer = () => {
  const progress = useScrollStore(s => s.progress);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".ScenesContainer",
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

  return (
    <CanvasWrapper>
      <CreateYourEpicCarPreviewScene visible={progress < SCROLL_THRESHOLDS.createYourEpicCar.max} />
      <Xperiencemor3PreviewScene visible={progress >= SCROLL_THRESHOLDS.xperiencemor3.min} />
    </CanvasWrapper>
  );
};

export default ScenesContainer;
