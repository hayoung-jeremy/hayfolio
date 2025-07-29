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
      controls.set({
        y: closed,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      });
    };

    updateSheetPosition();

    window.visualViewport?.addEventListener("resize", updateSheetPosition);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateSheetPosition);
    };
  }, []);

  const onDragStart = () => {
    setIsDragging(true);

    controls.start({
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      transition: {
        borderTopLeftRadius: { duration: 0.2, ease: "easeInOut" },
        borderTopRightRadius: { duration: 0.2, ease: "easeInOut" },
      },
    });
  };

  const onDrag = (_: any, info: PanInfo) => {
    const nextY = y.get() + info.delta.y;

    if (nextY < HANDLE_HEIGHT) {
      y.set(HANDLE_HEIGHT);
    } else if (nextY > closedY) {
      y.set(closedY);
    } else {
      y.set(nextY);
    }
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
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      transition: {
        y: { type: "spring", stiffness: 400, damping: 40 },
        borderTopLeftRadius: { duration: 0.2, ease: "easeInOut" },
        borderTopRightRadius: { duration: 0.2, ease: "easeInOut" },
      },
    });

    setIsOpen(shouldOpen);
  };

  return (
    <motion.aside
      drag="y"
      dragConstraints={{ top: HANDLE_HEIGHT, bottom: closedY }}
      dragElastic={0.2}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      style={{ y }}
      animate={controls}
      className="fixed z-20 bg-white/5 backdrop-blur-sm bottom-0 left-0 w-screen h-[50dvh] touch-pan-y"
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
