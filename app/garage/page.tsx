"use client";
import { useEffect, useLayoutEffect } from "react";
import { AnimatePresence } from "framer-motion";

import { BackButton } from "@/components/ui";
import { MobileBottomSheet, SideBar } from "@/components/ui/garage";

import useDisplay from "@/hooks/useDisplay";
import useModelLoadProgress from "@/hooks/useModelLoadProgress";
import { useCleanupOnUnmount } from "@/hooks/useCleanupOnUnmount";
import { useGarageStore } from "@/store/useGarageStore";
import { useSceneStore } from "@/store/useSceneStore";
import { registerGaragePreloads } from "@/utils/garage";

const Garage = () => {
  const { isMobile, isTablet } = useDisplay();
  const isModelLoaded = useModelLoadProgress();
  const { resetAll } = useGarageStore();
  const { setScene } = useSceneStore();
  useCleanupOnUnmount();

  useLayoutEffect(() => {
    setScene("garage");
  }, [setScene]);

  useEffect(() => {
    registerGaragePreloads();
  }, []);

  return (
    <>
      {isMobile || isTablet ? (
        <AnimatePresence>{isModelLoaded && <MobileBottomSheet />}</AnimatePresence>
      ) : (
        isModelLoaded && <SideBar />
      )}

      {isModelLoaded && (
        <BackButton
          to="/"
          onBeforeNavigate={resetAll}
          label="← 되돌아가기"
          className="fixed top-5 left-5 z-50 xl:cursor-pointer"
        />
      )}
    </>
  );
};

export default Garage;
