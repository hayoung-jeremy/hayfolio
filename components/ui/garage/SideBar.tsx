import { AnimatePresence, motion } from "framer-motion";
import PartsCarousel from "./PartsCarousel";
import { useGarageStore } from "@/store/useGarageStore";
import { Palette } from "../icons";
import ColorPicker from "./ColorPicker";
import { partsTypes } from "@/types/garage";

const SideBar = () => {
  const { isPartPanelOpen, setPartPanelOpen, isColorPickerOpen, setColorPickerOpen, activePartTabIndex } =
    useGarageStore();
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "100%" },
  };

  const currentType = partsTypes[activePartTabIndex];
  const isColorEditable = !["Head light", "Tail lamp", "Roof carrier"].includes(currentType);

  return (
    <motion.aside
      initial="closed"
      animate={isPartPanelOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ type: "tween", duration: 0.24, ease: "easeOut" }}
      className="fixed top-0 right-0 z-20 h-screen w-full max-w-[360px] bg-black/20 backdrop-blur-3xl"
    >
      <button
        className="absolute left-[-42px] top-1/2 -translate-y-1/2 w-[42px] h-[120px] bg-black/70 backdrop-blur-lg text-white rounded-l-xl p-2 shadow-lg"
        onClick={() => setPartPanelOpen(!isPartPanelOpen)}
      >
        {isPartPanelOpen ? "▶" : "◀"}
      </button>
      <PartsCarousel />
      <AnimatePresence mode="wait">
        {isPartPanelOpen && !isColorPickerOpen && isColorEditable && (
          <button
            onClick={() => {
              setColorPickerOpen(true);
            }}
            className="fixed top-5 right-[380px] z-[9999] border border-white/10 bg-black/70 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
          >
            <Palette />
          </button>
        )}
        {isColorPickerOpen && isColorEditable && (
          <motion.div
            key={"desktop colorpicker"}
            className="w-[320px] p-5 garage-colorpicker h-[calc(29dvh)] absolute top-0 right-[360px] z-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: "tween", duration: 0.24, ease: "easeOut" }}
          >
            <ColorPicker />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
};

export default SideBar;
