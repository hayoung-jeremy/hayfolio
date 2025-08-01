import { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, PanInfo, useDragControls } from "framer-motion";
import clsx from "clsx";
import PartsCarousel from "./PartsCarousel";
import { useGarageStore } from "@/store/useGarageStore";

const MobileBottomSheet = () => {
  const [closedY, setClosedY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { isPartPanelOpen, setPartPanelOpen } = useGarageStore();

  const HANDLE_HEIGHT = 32;
  const y = useMotionValue(0);
  const controls = useAnimation();
  const dragControls = useDragControls();

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
    if (nextY < HANDLE_HEIGHT) y.set(HANDLE_HEIGHT);
    else if (nextY > closedY) y.set(closedY);
    else y.set(nextY);
  };

  const onDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);

    const currentY = y.get();
    const { x: offsetX, y: offsetY } = info.offset;
    const { y: velocityY } = info.velocity;

    const isVerticalSwipe = Math.abs(offsetY) > Math.abs(offsetX) * 1.2;
    const draggedEnough = Math.abs(offsetY) > 28;

    if (!isVerticalSwipe || !draggedEnough) return;

    const fastUp = velocityY < -20;
    const fastDown = velocityY > 20;
    const openThreshold = closedY * 0.5;
    const closeThreshold = closedY * 0.5;

    let targetY = closedY;
    let open = isPartPanelOpen;

    if (fastUp || currentY <= openThreshold) {
      targetY = HANDLE_HEIGHT;
      open = true;
    } else if (fastDown || currentY >= closeThreshold) {
      targetY = closedY;
      open = false;
    } else {
      targetY = isPartPanelOpen ? HANDLE_HEIGHT : closedY;
      open = isPartPanelOpen;
    }

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

    setPartPanelOpen(open);
  };

  return (
    <motion.aside
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: HANDLE_HEIGHT, bottom: closedY }}
      dragElastic={0.2}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      style={{ y }}
      animate={controls}
      className="fixed z-20 bg-white/5 backdrop-blur-sm bottom-0 left-0 w-screen h-[50dvh] touch-pan-y pb-[env(safe-area-inset-bottom)]"
    >
      <div
        className="w-full h-7 flex justify-center items-center cursor-pointer touch-none"
        onPointerDown={e => dragControls.start(e)}
      >
        <div
          className={clsx(
            "h-1 bg-white rounded-full transition-all duration-200",
            { "w-16 opacity-40": isDragging },
            { "w-12 opacity-10": !isDragging }
          )}
        />
      </div>
      <PartsCarousel />
    </motion.aside>
  );
};

export default MobileBottomSheet;
