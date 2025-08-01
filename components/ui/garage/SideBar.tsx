import { motion } from "framer-motion";
import PartsCarousel from "./PartsCarousel";
import { useGarageStore } from "@/store/useGarageStore";

const SideBar = () => {
  const { isPartPanelOpen, setPartPanelOpen } = useGarageStore();
  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "100%" },
  };
  return (
    <motion.aside
      initial="closed"
      animate={isPartPanelOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 right-0 z-20 h-screen w-full max-w-[360px] bg-white/5 backdrop-blur-lg"
    >
      <button
        className="absolute left-[-42px] top-1/2 -translate-y-1/2 w-[42px] h-[120px] bg-white/15 backdrop-blur-lg text-white rounded-l-xl p-2 shadow-lg"
        onClick={() => setPartPanelOpen(!isPartPanelOpen)}
      >
        {isPartPanelOpen ? "▶" : "◀"}
      </button>
      <PartsCarousel />
    </motion.aside>
  );
};

export default SideBar;
