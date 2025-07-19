"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import IntroText from "@/components/ui/IntroText";
import CanvasWrapper from "@/components/3d/CanvasWrapper";

export default function Home() {
  useGSAP(() => {
    gsap.to(".IntroText", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".IntroText",
        start: "top top",
        end: "top+=480",
        scrub: true,
      },
    });

    gsap.to(".ThreeScene", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".ThreeScene",
        start: "top center",
        end: "top top",
        scrub: true,
      },
    });
  }, []);
  return (
    <main className="">
      <IntroText />
      <CanvasWrapper />
    </main>
  );
}
