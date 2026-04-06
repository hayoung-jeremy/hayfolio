"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { BackButton } from "@/components/ui";
import { MobileBottomSheet, SideBar } from "@/components/ui/garage";

import useDisplay from "@/hooks/useDisplay";
import useModelLoadProgress from "@/hooks/useModelLoadProgress";
import { useCleanupOnUnmount } from "@/hooks/useCleanupOnUnmount";
import { useGarageStore } from "@/store/useGarageStore";
import { useSceneStore } from "@/store/useSceneStore";
import { registerGaragePreloads, preloadInitialThumbnails } from "@/utils/garage";

const Garage = () => {
  const { isMobile, isTablet } = useDisplay();
  const isModelLoaded = useModelLoadProgress();
  const [isThumbnailsReady, setThumbnailsReady] = useState(false);
  const { resetAll } = useGarageStore();
  const { setScene } = useSceneStore();
  useCleanupOnUnmount();

  const isReady = isModelLoaded && isThumbnailsReady;

  useLayoutEffect(() => {
    setScene("garage");
  }, [setScene]);

  useEffect(() => {
    registerGaragePreloads();
    preloadInitialThumbnails().finally(() => setThumbnailsReady(true));
  }, []);

  return (
    <>
      {isMobile || isTablet ? (
        <AnimatePresence>{isReady && <MobileBottomSheet />}</AnimatePresence>
      ) : (
        isReady && <SideBar />
      )}

      {isReady && (
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
