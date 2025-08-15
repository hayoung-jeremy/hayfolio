import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useScrollStore } from "@/store/useScrollStore";
import { useSceneStore } from "@/store/useSceneStore";
import { getActivePreviewSection } from "@/utils/home";

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

  useEffect(() => {
    const active = getActivePreviewSection(progress);
    const targetScene =
      active?.key === "garage" ? "garage preview" : active?.key === "xm3" ? "xperiencemor3 preview" : "none";

    if (currentScene !== targetScene) setScene(targetScene);
  }, [progress, currentScene, setScene]);

  return null;
};

export default PeviewScenesController;
