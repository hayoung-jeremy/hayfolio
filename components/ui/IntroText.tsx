"use client";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

const IntroText = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mainSplit = new SplitText(".split-text-main", { type: "chars" });
      gsap.from(mainSplit.chars, {
        opacity: 0,
        y: 40,
        rotateX: 90,
        transformOrigin: "0% 50% -20px",
        ease: "back.out(1.9)",
        stagger: 0.06,
        duration: 0.7,
      });

      const subSplit = new SplitText(".split-text-sub", { type: "lines" });
      gsap.from(subSplit.lines, {
        rotationX: -100,
        transformOrigin: "50% 50% -20px",
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.9,
      });

      const guideSplit = new SplitText(".scroll-guide", { type: "lines" });
      gsap.from(guideSplit.lines, {
        rotationX: -100,
        transformOrigin: "50% 50% -160px",
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        delay: 1.1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-screen xl:w-full h-screen flex flex-col items-center justify-center text-center"
    >
      <h1 className="split-text-main text-4xl md:text-5xl xl:text-7xl font-bold leading-tight">
        안녕하세요, <br className="md:hidden" /> 하영입니다.
      </h1>
      <div className="split-text-sub text-base md:text-lg xl:text-xl mt-6 text-gray-300 max-w-xl">
        Three.js로 인터랙티브한 3D 웹을 만들고, <br /> 생성형 AI 결과를 직접 시각화해왔어요.
      </div>

      <p className="scroll-guide text-sm md:text-base text-gray-400 mt-10">화면을 내려 작업을 확인해보세요 ⇓</p>
    </div>
  );
};

export default IntroText;
