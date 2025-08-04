import { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, PanInfo, useDragControls, AnimatePresence } from "framer-motion";
import clsx from "clsx";

import PartsCarousel from "./PartsCarousel";
import ColorPicker from "./ColorPicker";
import { Palette } from "../icons";
import { useGarageStore } from "@/store/useGarageStore";
import { partsTypes } from "@/types/garage";

const MobileBottomSheet = () => {
  const [closedY, setClosedY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { isPartPanelOpen, setPartPanelOpen, isColorPickerOpen, setColorPickerOpen, activePartTabIndex } =
    useGarageStore();

  const currentType = partsTypes[activePartTabIndex];
  const isColorEditable = !["Head light", "Tail lamp", "Roof carrier"].includes(currentType);

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
    const { y: offsetY } = info.offset;
    const { y: velocityY } = info.velocity;

    const fastUp = velocityY < -20;
    const fastDown = velocityY > 200;
    const shouldForceClose = offsetY > 10 || fastDown;
    const shouldForceOpen = offsetY < -10 || fastUp;

    let targetY = closedY;
    let open = isPartPanelOpen;

    if (shouldForceOpen) {
      targetY = HANDLE_HEIGHT;
      open = true;
    } else if (shouldForceClose) {
      targetY = closedY;
      open = false;
    } else {
      const shouldOpen = currentY < closedY * 0.6;
      targetY = shouldOpen ? HANDLE_HEIGHT : closedY;
      open = shouldOpen;
    }

    if (!open) setColorPickerOpen(false);

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
      className="fixed z-20 bg-black/70 backdrop-blur-sm bottom-0 left-0 w-screen h-[50dvh] touch-pan-y pb-[env(safe-area-inset-bottom)]"
    >
      <div
        className="w-full h-7 flex justify-center items-center cursor-pointer touch-none"
        onPointerDown={e => dragControls.start(e, { distanceThreshold: 10 })}
      >
        <div
          className={clsx(
            "h-1 bg-white rounded-full transition-all duration-200",
            { "w-16 opacity-40": isDragging },
            { "w-12 opacity-10": !isDragging }
          )}
        />
      </div>
      <AnimatePresence mode="wait">
        {!isColorPickerOpen ? (
          <>
            <PartsCarousel />
            {isColorEditable && (
              <button
                onClick={() => {
                  setPartPanelOpen(false);
                  setColorPickerOpen(true);
                }}
                className="fixed bottom-[calc(env(safe-area-inset-bottom)+48px)] right-5 z-[9999] border border-white/10 bg-black/70 w-12 h-12 rounded-full flex items-center justify-center"
              >
                <Palette />
              </button>
            )}
          </>
        ) : (
          isColorEditable && (
            <motion.div
              key={"mobile colorpicker"}
              className="w-full p-5 garage-colorpicker h-[calc(29dvh)] relative xl:absolute xl:top-0 xl:right-[360px] xl:w-[320px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "tween", duration: 0.24, ease: "easeOut" }}
            >
              <ColorPicker />
            </motion.div>
          )
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default MobileBottomSheet;
