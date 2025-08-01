"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

import { IntroText, Navigation } from "@/components/ui";
import { ScenesContainer } from "@/components/3d/scenes";

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

    gsap.to(".ScenesContainer", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".ScenesContainer",
        start: "top 40%",
        end: "top top",
        scrub: true,
      },
    });
  }, []);
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1 }}
    >
      <IntroText />
      <div className="ScenesContainer opacity-0 h-[300vh] relative z-10">
        <div className="sticky top-0 h-screen">
          <ScenesContainer />
          <Navigation />
        </div>
      </div>
      <div className="h-screen flex items-center justify-center">dummy Footer</div>
    </motion.main>
  );
}
