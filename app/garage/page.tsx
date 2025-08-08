"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import { MobileBottomSheet, SideBar } from "@/components/ui/garage";
import useDisplay from "@/hooks/useDisplay";
import useModelLoadProgress from "@/hooks/useModelLoadProgress";
import { useCleanupOnUnmount } from "@/hooks/useCleanupOnUnmount";
import { useGarageStore } from "@/store/useGarageStore";
import { useSceneStore } from "@/store/useSceneStore";

const Garage = () => {
  const router = useRouter();
  const { isMobile, isTablet } = useDisplay();
  const isModelLoaded = useModelLoadProgress();
  const { resetAll } = useGarageStore();
  const { currentScene, enterMainScene } = useSceneStore();
  useCleanupOnUnmount();
  const searchParams = useSearchParams();

  const handleBack = () => {
    router.push("/");
    resetAll();
  };

  useEffect(() => {
    console.log("Current scene changed:", currentScene);
  }, [currentScene]);

  useEffect(() => {
    const sceneParam = searchParams.get("scene");

    if (sceneParam === "garage") {
      enterMainScene();
    }
  }, [searchParams, enterMainScene]);

  return (
    <>
      {isMobile || isTablet ? (
        <AnimatePresence>{isModelLoaded && <MobileBottomSheet />}</AnimatePresence>
      ) : (
        isModelLoaded && <SideBar />
      )}

      {isModelLoaded && (
        <button
          onClick={handleBack}
          className="fixed top-5 left-5 z-50 px-4 py-2 text-white bg-black/50 rounded backdrop-blur-2xl xl:cursor-pointer"
        >
          ← 되돌아가기
        </button>
      )}
    </>
  );
};

export default Garage;
