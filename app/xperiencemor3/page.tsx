"use client";
import { motion } from "framer-motion";
import { Xperiencemor3Scene } from "@/components/3d/scenes/xperiencemor3";

const Xperiencemor3 = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 1 }}
      className="h-screen flex items-center justify-center"
    >
      <Xperiencemor3Scene />
    </motion.main>
  );
};

export default Xperiencemor3;
