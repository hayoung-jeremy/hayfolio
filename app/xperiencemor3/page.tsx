"use client";
import { useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ModalWrapper } from "@/components/ui";
import { BeginningQuestionOverlay, IntroOverlay, KeywordDuelOverlay } from "@/components/ui/xperiencemor3";

import { useGameStatus } from "@/hooks/useXperiencemor3Game";
import useModelLoadProgress from "@/hooks/useModelLoadProgress";
import { useCleanupOnUnmount } from "@/hooks/useCleanupOnUnmount";
import { useSceneStore } from "@/store/useSceneStore";

const Xperiencemor3 = () => {
  const isModelLoaded = useModelLoadProgress();
  const gameStatus = useGameStatus();
  const { setScene } = useSceneStore();
  useCleanupOnUnmount();

  useLayoutEffect(() => {
    setScene("xperiencemor3");
  }, [setScene]);

  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isModelLoaded ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence mode="wait">
          {gameStatus === "intro" && isModelLoaded && (
            <ModalWrapper>
              <IntroOverlay />
            </ModalWrapper>
          )}
          {gameStatus === "entering" && (
            <ModalWrapper>
              <BeginningQuestionOverlay />
            </ModalWrapper>
          )}
          {gameStatus === "questioning" && <KeywordDuelOverlay />}
        </AnimatePresence>
      </motion.main>
    </>
  );
};

export default Xperiencemor3;
