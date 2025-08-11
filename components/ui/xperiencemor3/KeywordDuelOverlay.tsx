"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import OptionSelectorCircleAnimation from "./OptionSelectorCircleAnimation";
import {
  useSelectedOptions,
  useCurrentQuestionInfo,
  useGameStatus,
  useGameProgressObserver,
} from "@/hooks/useXperiencemor3Game";
import { useXperiencemor3GameController } from "@/hooks/useXperiencemor3GameController";
import useXperiencemor3GameCameraSync from "@/hooks/useXperiencemor3GameCameraSync";
import { QUESTION_INFO_COLLECTION } from "@/constants/xperiencemor3";

export default function KeywordDuel() {
  const status = useGameStatus();
  const info = useCurrentQuestionInfo();
  const selectedOptions = useSelectedOptions();
  const { selectKeyword, undo } = useXperiencemor3GameController();
  useGameProgressObserver();
  useXperiencemor3GameCameraSync();

  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const [locked, setLocked] = useState(false);

  const stackVariants = useMemo(
    () => ({
      initial: { y: 4, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, delayChildren: 1.0, staggerChildren: 0.25 },
      },
    }),
    []
  );

  if (status !== "questioning") return null;

  const total = QUESTION_INFO_COLLECTION.length;
  const progressRatio = selectedOptions.length / total;

  const handlePick = (k: string | undefined, idx: 0 | 1) => {
    if (locked) return;
    setLocked(true);
    setSelectedIdx(idx);

    setTimeout(() => {
      selectKeyword(k as any);
      setSelectedIdx(-1);
      setLocked(false);
    }, 280);
  };

  return (
    <>
      <aside
        className={clsx(
          "fixed left-1/2 -translate-x-1/2 z-[9999]",
          "top-[12vh] md:top-[15.625vh] xl:top-[180px]",
          "flex flex-col items-center justify-center",
          "w-fit min-h-[194px] select-none"
        )}
        key={`${info?.first}-${info?.second}-top`}
      >
        <div
          onMouseEnter={() => setSelectedIdx(0)}
          onMouseLeave={() => setSelectedIdx(-1)}
          onTouchStart={() => setSelectedIdx(0)}
          onTouchEnd={() => setSelectedIdx(-1)}
          onClick={() => handlePick(info?.first, 0)}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <motion.button
            initial="initial"
            animate="animate"
            variants={stackVariants}
            className="flex flex-col items-center justify-center mb-2"
          >
            {/* <motion.span variants={stackVariants} className="text-[16px] leading-4 opacity-80">
              {info?.first}
            </motion.span> */}
            <motion.span variants={stackVariants} className="game-text-shadow font-bold text-[40px] leading-[40px]">
              {info?.first}
            </motion.span>
          </motion.button>

          <OptionSelectorCircleAnimation startsFrom="top" isSelected={selectedIdx === 0} />
        </div>

        <motion.div
          className="bg-gradient-to-t from-transparent to-white/90 w-[1px]"
          initial={{ height: 0 }}
          animate={{ height: 100 }}
          transition={{ duration: 0.5 }}
        />
      </aside>

      <aside
        className={clsx(
          "fixed left-1/2 -translate-x-1/2 z-[9999]",
          "bottom-[15vh] md:bottom-[15.625vh] xl:bottom-[180px]",
          "flex flex-col items-center justify-center",
          "w-fit min-h-[194px] select-none"
        )}
        key={`${info?.first}-${info?.second}-bottom`}
      >
        <motion.div
          className="bg-gradient-to-b from-transparent to-white/90 w-[1px] origin-bottom"
          initial={{ height: 0 }}
          animate={{ height: 100 }}
          transition={{ duration: 0.5 }}
        />

        <div
          onMouseEnter={() => setSelectedIdx(1)}
          onMouseLeave={() => setSelectedIdx(-1)}
          onTouchStart={() => setSelectedIdx(1)}
          onTouchEnd={() => setSelectedIdx(-1)}
          onClick={() => handlePick(info?.second, 1)}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <OptionSelectorCircleAnimation startsFrom="bottom" isSelected={selectedIdx === 1} />

          <motion.button
            initial="initial"
            animate="animate"
            variants={stackVariants}
            className="flex flex-col items-center justify-center gap-2"
          >
            <motion.span className="game-text-shadow font-bold text-[40px] leading-[40px]" variants={stackVariants}>
              {info?.second}
            </motion.span>
            {/* <motion.span className="text-[16px] leading-4 opacity-80" variants={stackVariants}>
              {info?.second}
            </motion.span> */}
          </motion.button>
        </div>
      </aside>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 z-[9999]"
      >
        <p className="text-[12px]">
          {Math.min(selectedOptions.length + 1, total)} / {total}
        </p>

        <div className="w-[128px] h-[2px] bg-white/20 relative rounded">
          <div
            style={{ width: `${progressRatio * 100}%` }}
            className="absolute top-0 left-0 h-[2px] bg-white/80 transition-[width] duration-500 shadow-[0_0_8px_2px_rgba(255,255,255,0.5)] rounded"
          />
        </div>

        <motion.button
          initial={{ y: "47%", scale: 1, color: "#ffffff90" }}
          whileHover={{ y: "47%", scale: 1, color: "#ffffff" }}
          whileTap={{ y: "47%", scale: 0.95, color: "#ffffff60" }}
          onClick={undo}
          className="absolute bottom-0 -left-10 w-8 h-8 flex items-center justify-center rounded"
          aria-label="undo"
          title="undo"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 14l-4-4 4-4" />
            <path d="M5 10h7a5 5 0 1 1 0 10h-1" />
          </svg>
        </motion.button>
      </motion.div>
    </>
  );
}
