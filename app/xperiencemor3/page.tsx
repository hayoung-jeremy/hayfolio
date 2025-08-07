"use client";
import { AnimatePresence, motion } from "framer-motion";

import { ModalWrapper, SceneLoader } from "@/components/ui";
import { Xperiencemor3Scene } from "@/components/3d/scenes/xperiencemor3";
import { IntroOverlay } from "@/components/ui/xperiencemor3";

import { useGameStatus } from "@/hooks/useXperiencemor3Game";
import useModelLoadProgress from "@/hooks/useModelLoadProgress";
import { useCleanupOnUnmount } from "@/hooks/useCleanupOnUnmount";

const Xperiencemor3 = () => {
  const isModelLoaded = useModelLoadProgress();
  const gameStatus = useGameStatus();
  useCleanupOnUnmount();

  return (
    <>
      {!isModelLoaded && <SceneLoader />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isModelLoaded ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="min-h-svh fixed inset-0 z-0"
      >
        <Xperiencemor3Scene />

        <AnimatePresence>
          {gameStatus === "intro" && isModelLoaded && (
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
