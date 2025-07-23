"use client";
import { motion } from "framer-motion";
import { GarageScene } from "@/components/3d/scenes";

const Garage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1 }}
      className="h-screen flex items-center justify-center"
    >
      <GarageScene />
    </motion.main>
  );
};

export default Garage;
