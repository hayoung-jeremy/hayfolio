import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import CanvasWrapper from "../CanvasWrapper";
import CreateYourEpicCarPreviewScene from "./CreateYourEpicCarPreviewScene";
import Xperiencemor3PreviewScene from "./Xperiencemor3PreviewScene";
import { useScrollStore } from "@/store/useScrollStore";

gsap.registerPlugin(ScrollTrigger);

const ScenesContainer = () => {
  const router = useRouter();
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

  const handleClick = () => {
    // push는 exit 애니메이션 후에 실행
    setTimeout(() => router.push("/garage"), 1000);
  };

  return (
    <div className="ScenesContainer opacity-0 h-[300vh] relative z-10">
      <div className="sticky top-0 h-screen">
        <CanvasWrapper>
          <CreateYourEpicCarPreviewScene visible={progress < 0.45} />
          <Xperiencemor3PreviewScene visible={progress >= 0.55} />
        </CanvasWrapper>

        <nav className="absolute top-5 left-5 border px-4 py-2" onClick={handleClick}>
          자세히 보기
        </nav>
      </div>
    </div>
  );
};

export default ScenesContainer;
