"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, PanInfo } from "framer-motion";

const MobileBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closedY, setClosedY] = useState(0);

  const HANDLE_HEIGHT = 40;
  const y = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    const sheetHeight = window.innerHeight * 0.5;
    const closed = sheetHeight - HANDLE_HEIGHT;
    setClosedY(closed);
    y.set(closed);
    controls.set({ y: closed });
  }, []);

  const onDragEnd = (_: any, info: PanInfo) => {
    const currentY = y.get();

    const fastUp = info.velocity.y < -20;
    const fastDown = info.velocity.y > 20;

    const shouldOpen = fastUp || (!fastDown && currentY <= closedY / 2);
    const targetY = shouldOpen ? 40 : closedY;

    controls.start({
      y: targetY,
      transition: { type: "spring", stiffness: 400, damping: 40 },
    });

    setIsOpen(shouldOpen);
  };

  return (
    <motion.aside
      drag="y"
      dragConstraints={{ top: 0 }}
      onDragEnd={onDragEnd}
      style={{ y }}
      animate={controls}
      className="fixed z-20 bg-white/5 backdrop-blur-sm bottom-0 left-0 w-screen h-[50dvh] rounded-t-2xl touch-pan-y"
    >
      <div className="w-full h-10 flex justify-center items-center cursor-pointer">
        <div className="w-12 h-1.5 bg-gray-400 rounded-full" />
      </div>
      SideBar
    </motion.aside>
  );
};

export default MobileBottomSheet;
