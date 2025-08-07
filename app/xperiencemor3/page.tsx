"use client";
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";

import { ModalWrapper, SceneLoader } from "@/components/ui";
import { Xperiencemor3Scene } from "@/components/3d/scenes/xperiencemor3";
import { IntroOverlay } from "@/components/ui/xperiencemor3";
import { useGameStatus } from "@/hooks/useXperiencemor3Game";

const Xperiencemor3 = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { progress } = useProgress();
  const gameStatus = useGameStatus();

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => setIsLoaded(true), 300);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <>
      {!isLoaded && <SceneLoader />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="min-h-svh fixed inset-0 z-0"
      >
        <Xperiencemor3Scene />

        <AnimatePresence>
          {gameStatus === "intro" && isLoaded && (
            <ModalWrapper>
              <IntroOverlay />
            </ModalWrapper>
          )}
        </AnimatePresence>
      </motion.main>
    </>
  );
};

export default Xperiencemor3;
