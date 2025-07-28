import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

import useDisplay from "@/hooks/useDisplay";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useDisplay();

  const sidebarVariants = {
    open: ({ isMobile }: { isMobile: boolean }) => (isMobile ? { y: 0, x: 0 } : { x: 0 }),
    closed: ({ isMobile }: { isMobile: boolean }) => (isMobile ? { y: "calc(100% - 40px)", x: 0 } : { x: "100%" }),
  };

  return (
    <motion.aside
      key="sidebar"
      custom={{ isMobile }}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ type: "tween", stiffness: 300, damping: 30 }}
      className={clsx("fixed z-20 bg-[#222]", {
        "bottom-0 left-0 w-screen h-[60dvh] rounded-t-2xl": isMobile,
        "top-0 right-0 h-screen w-full max-w-[360px]": !isMobile,
      })}
    >
      {isMobile && (
        <div className="w-full h-10 flex justify-center items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div className="w-12 h-1.5 bg-gray-400 rounded-full" />
        </div>
      )}
      {!isMobile && (
        <button
          className="absolute left-[-40px] top-1/2 -translate-y-1/2 w-[42px] h-[120px] bg-[#222] text-white rounded-l-xl p-2 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "▶" : "◀"}
        </button>
      )}
      SideBar
    </motion.aside>
  );
};

export default SideBar;
