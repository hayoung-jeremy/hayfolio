import { useState } from "react";
import { motion } from "framer-motion";

const MobileBottomSheet = () => {
  const sidebarVariants = {
    open: { y: 0 },
    closed: { y: "calc(60dvh - 40px)" }, // 핸들 영역만 보이도록
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.aside
      key="mobile bottom sheet"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ type: "tween", stiffness: 300, damping: 30 }}
      className="fixed z-20 bg-[#222] bottom-0 left-0 w-screen h-[60dvh] rounded-t-2xl"
    >
      <div className="w-full h-10 flex justify-center items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-12 h-1.5 bg-gray-400 rounded-full" />
      </div>
      SideBar
    </motion.aside>
  );
};

export default MobileBottomSheet;
