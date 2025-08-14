import { motion } from "framer-motion";
import WorkInProgressNotification from "../WorkInProgressNotification";

const ClarinsPreview = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      className="w-screen xl:w-[1200px] h-dvh xl:h-screen absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center"
    >
      <WorkInProgressNotification />
    </motion.section>
  );
};

export default ClarinsPreview;
