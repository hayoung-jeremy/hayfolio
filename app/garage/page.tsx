"use client";
import { motion } from "framer-motion";
import { GarageScene } from "@/components/3d/scenes";
import { SideBar } from "@/components/ui/garage";

const Garage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1 }}
      className="h-screen flex items-center justify-center overflow-hidden"
    >
      <GarageScene />
      <SideBar />
    </motion.main>
  );
};

export default Garage;
