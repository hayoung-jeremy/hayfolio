import { useRouter } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useScrollStore } from "@/store/useScrollStore";
import { SCROLL_THRESHOLDS } from "@/constants/scrollThresholds";

const ViewProjectDetailButton = () => {
  const progress = useScrollStore(s => s.progress);

  const router = useRouter();

  const navigateToSceneDetailPage = () => {
    if (progress < SCROLL_THRESHOLDS.createYourEpicCar.max) {
      router.push("/garage");
    } else if (progress >= SCROLL_THRESHOLDS.xperiencemor3.min) {
      router.push("/xperiencemor3");
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileTap={{ scale: 0.95 }}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      whileHover={{
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderColor: "rgba(255, 255, 255, 0.4)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={clsx(
        "fixed top-[80dvh] left-1/2 -translate-x-1/2",
        "w-full max-w-[88vw] md:max-w-[360px]",
        "px-10 py-3 md:py-4 rounded-md font-semibold shadow-lg",
        "backdrop-blur-md",
        "md:text-[20px]",
        "xl:cursor-pointer"
      )}
      onClick={navigateToSceneDetailPage}
    >
      자세히 살펴보기
    </motion.button>
  );
};

export default ViewProjectDetailButton;
