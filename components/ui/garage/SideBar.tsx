import { useState } from "react";
import { motion } from "framer-motion";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "100%" },
  };
  return (
    <motion.aside
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 right-0 z-20 h-screen w-full max-w-[360px] bg-[#222]"
    >
      <button
        className="absolute left-[-40px] top-1/2 -translate-y-1/2 w-[42px] h-[120px] bg-[#222] text-white rounded-l-xl p-2 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "▶" : "◀"}
      </button>
      SideBar
    </motion.aside>
  );
};

export default SideBar;
