"use client";
import { AnimatePresence, motion } from "framer-motion";
import { GarageScene } from "@/components/3d/scenes";
import { MobileBottomSheet, SideBar } from "@/components/ui/garage";
import useDisplay from "@/hooks/useDisplay";

const Garage = () => {
  const { isMobile } = useDisplay();
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="min-h-svh z-0"
      >
        <GarageScene />
      </motion.main>

      {isMobile ? (
        <AnimatePresence>
          <MobileBottomSheet />
        </AnimatePresence>
      ) : (
        <SideBar />
      )}
    </>
  );
};

export default Garage;
