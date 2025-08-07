import { Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Perf } from "r3f-perf";

import CanvasWrapper from "../CanvasWrapper";
import { CreateYourEpicCarPreviewScene } from "./garage";
import { Xperiencemor3PreviewScene } from "./xperiencemor3";
import { PreviewSceneEnvironments } from "../envs";
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

  const showEpicCar =
    progress >= SCROLL_THRESHOLDS.createYourEpicCar.min && progress < SCROLL_THRESHOLDS.createYourEpicCar.max;

  const showXperiencemor3 = progress >= SCROLL_THRESHOLDS.xperiencemor3.min;

  return (
    <CanvasWrapper>
      <Suspense>
        {showEpicCar && <CreateYourEpicCarPreviewScene />}
        {showXperiencemor3 && <Xperiencemor3PreviewScene />}
      </Suspense>
      <Perf position="top-right" />
      <PreviewSceneEnvironments />
    </CanvasWrapper>
  );
};

export default ScenesContainer;
