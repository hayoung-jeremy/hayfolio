"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";

import { MobileBottomSheet, SceneLoader, SideBar } from "@/components/ui/garage";
import { GarageScene } from "@/components/3d/scenes/garage";
import useDisplay from "@/hooks/useDisplay";
import { useGarageStore } from "@/store/useGarageStore";

const Garage = () => {
  const router = useRouter();
  const { isMobile, isTablet } = useDisplay();
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);
  const { resetAll } = useGarageStore();

  const handleBack = () => {
    router.push("/");
    resetAll();
  };

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
        className="min-h-svh fixed inset-0 z-0 bg-[#1f1d24]"
      >
        <GarageScene />
      </motion.main>

      {isMobile || isTablet ? (
        <AnimatePresence>{isLoaded && <MobileBottomSheet />}</AnimatePresence>
      ) : (
        isLoaded && <SideBar />
      )}

      {isLoaded && (
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
