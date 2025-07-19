"use client";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

const IntroText = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let split = new SplitText(".split-text", { type: "chars" });

      const anim = gsap.from(split.chars, {
        opacity: 0,
        y: 40,
        rotateX: 90,
        transformOrigin: "0% 50% -20px",
        ease: "back.out(1.9)",
        stagger: 0.06,
        duration: 0.7,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-screen xl:w-full h-screen flex items-center justify-center">
      <div className="split-text text-white text-4xl md:text-5xl xl:text-7xl font-bold text-center space-y-4">
        안녕하세요, <br className="md:hidden" /> 하영입니다.
      </div>
    </div>
  );
};

export default IntroText;
