"use client";
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";

import { MobileBottomSheet, SceneLoader, SideBar } from "@/components/ui/garage";
import { GarageScene } from "@/components/3d/scenes/garage";
import useDisplay from "@/hooks/useDisplay";

const Garage = () => {
  const { isMobile, isTablet } = useDisplay();
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);

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
        className="min-h-svh z-0"
      >
        <GarageScene />
      </motion.main>

      {isMobile || isTablet ? (
        <AnimatePresence>{isLoaded && <MobileBottomSheet />}</AnimatePresence>
      ) : (
        isLoaded && <SideBar />
      )}
    </>
  );
};

export default Garage;
