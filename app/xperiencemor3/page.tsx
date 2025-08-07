"use client";
import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion } from "framer-motion";

import { SceneLoader } from "@/components/ui";
import { Xperiencemor3Scene } from "@/components/3d/scenes/xperiencemor3";

const Xperiencemor3 = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { progress } = useProgress();

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
        className="min-h-svh fixed inset-0 z-0"
      >
        <Xperiencemor3Scene />
      </motion.main>
    </>
  );
};

export default Xperiencemor3;
