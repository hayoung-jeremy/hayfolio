"use client";
import { useEffect, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ModalWrapper } from "@/components/ui";
import {
  BeginningQuestionOverlay,
  IntroOverlay,
  KeywordDuelOverlay,
  ResultOverlay,
} from "@/components/ui/xperiencemor3";

import { useGameActions, useGameStatus } from "@/hooks/useXperiencemor3Game";
import useModelLoadProgress from "@/hooks/useModelLoadProgress";
import { useCleanupOnUnmount } from "@/hooks/useCleanupOnUnmount";
import { useSceneStore } from "@/store/useSceneStore";
import { useCameraBus } from "@/store/useCameraBus";

const Xperiencemor3 = () => {
  const isModelLoaded = useModelLoadProgress();
  const gameStatus = useGameStatus();
  const { setGameStatus } = useGameActions();
  const { setScene } = useSceneStore();
  const { moveTo, setAutoRotate } = useCameraBus();
  useCleanupOnUnmount();

  useLayoutEffect(() => {
    setScene("xperiencemor3");
  }, [setScene]);

  useEffect(() => {
    return () => {
      setGameStatus("intro");
    };
  }, [moveTo, setAutoRotate]);

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
          {gameStatus === "result" && (
            <ModalWrapper>
              <ResultOverlay />
            </ModalWrapper>
          )}
        </AnimatePresence>
      </motion.main>
    </>
  );
};

export default Xperiencemor3;
