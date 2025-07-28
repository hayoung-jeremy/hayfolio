import { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, PanInfo } from "framer-motion";
import clsx from "clsx";

const MobileBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closedY, setClosedY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const HANDLE_HEIGHT = 32;
  const y = useMotionValue(0);
  const controls = useAnimation();

  useEffect(() => {
    const updateSheetPosition = () => {
      const viewportHeight =
        typeof window !== "undefined" && window.visualViewport ? window.visualViewport.height : window.innerHeight;

      const sheetHeight = viewportHeight * 0.5;
      const closed = sheetHeight - HANDLE_HEIGHT;

      setClosedY(closed);
      y.set(closed);
      controls.set({ y: closed });
    };

    updateSheetPosition();

    window.visualViewport?.addEventListener("resize", updateSheetPosition);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateSheetPosition);
    };
  }, []);

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    const currentY = y.get();

    const fastUp = info.velocity.y < -20;
    const fastDown = info.velocity.y > 20;

    const shouldOpen = fastUp || (!fastDown && currentY <= closedY / 2);
    const targetY = shouldOpen ? HANDLE_HEIGHT : closedY;

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
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      style={{ y }}
      animate={controls}
      className="fixed z-20 bg-white/5 backdrop-blur-sm bottom-0 left-0 w-screen h-[50dvh] rounded-t-2xl"
    >
      <div className="w-full h-7 flex justify-center items-center">
        <div
          className={clsx(
            "h-1 bg-white rounded-full transition-all duration-200",
            { "w-16 opacity-40": isDragging },
            { "w-12 opacity-10": !isDragging }
          )}
        />
      </div>
      SideBar
    </motion.aside>
  );
};

export default MobileBottomSheet;
