import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import CanvasWrapper from "../CanvasWrapper";
import CreateYourEpicCarPreviewScene from "./CreateYourEpicCarPreviewScene";
import Xperiencemor3PreviewScene from "./Xperiencemor3PreviewScene";
import { useScrollStore } from "@/store/useScrollStore";

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
    <div className="ScenesContainer opacity-0 h-[300vh] relative z-10">
      <div className="sticky top-0 h-screen">
        <CanvasWrapper>
          {progress < 0.5 && <CreateYourEpicCarPreviewScene />}
          {progress >= 0.5 && <Xperiencemor3PreviewScene />}
        </CanvasWrapper>
      </div>
    </div>
  );
};

export default ScenesContainer;
