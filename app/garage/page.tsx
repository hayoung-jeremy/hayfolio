"use client";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { SceneLoader } from "@/components/ui";
import { MobileBottomSheet, SideBar } from "@/components/ui/garage";
import { GarageScene } from "@/components/3d/scenes/garage";
import { useGarageStore } from "@/store/useGarageStore";
import useDisplay from "@/hooks/useDisplay";
import useModelLoadProgress from "@/hooks/useModelLoadProgress";

const Garage = () => {
  const router = useRouter();
  const { isMobile, isTablet } = useDisplay();
  const isModelLoaded = useModelLoadProgress();
  const { resetAll } = useGarageStore();

  const handleBack = () => {
    router.push("/");
    resetAll();
  };

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
        <GarageScene />
      </motion.main>

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
