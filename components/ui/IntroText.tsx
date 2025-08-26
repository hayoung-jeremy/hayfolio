"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);

const IntroText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const splitsRef = useRef<{ main?: any; sub?: any; guide?: any }>({});

  useGSAP(
    () => {
      const mainSplit = new SplitText(".split-text-main", { type: "chars" });
      const subSplit = new SplitText(".split-text-sub", { type: "lines" });
      const guideSplit = new SplitText(".scroll-guide", { type: "lines" });
      splitsRef.current = { main: mainSplit, sub: subSplit, guide: guideSplit };

      gsap.set(mainSplit.chars, { opacity: 0, y: 40, rotateX: 90, transformOrigin: "0% 50% -20px" });
      gsap.set(subSplit.lines, { opacity: 0, rotateX: -100, transformOrigin: "50% 50% -20px" });
      gsap.set(guideSplit.lines, { opacity: 0, rotateX: -100, transformOrigin: "50% 50% -30px" });

      tlRef.current = gsap
        .timeline({ paused: true })
        .to(mainSplit.chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          ease: "power3.out",
          stagger: 0.06,
          duration: 0.7,
        })
        .to(subSplit.lines, { opacity: 1, rotateX: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 }, 1.0)
        .to(guideSplit.lines, { opacity: 1, rotateX: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 }, 1.34);
    },
    { scope: containerRef }
  );

  useEffect(() => {
    const play = () => tlRef.current?.restart(true);

    window.addEventListener("overlayClosed", play);

    if (!document.getElementById("overlay") || window.__overlayClosed) {
      play();
    }

    return () => {
      window.removeEventListener("overlayClosed", play);
      splitsRef.current.main?.revert();
      splitsRef.current.sub?.revert();
      splitsRef.current.guide?.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="IntroText w-screen xl:w-full h-screen flex flex-col items-center justify-center text-center"
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
