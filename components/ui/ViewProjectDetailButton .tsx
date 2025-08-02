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
      className={clsx(
        "fixed top-[80dvh] left-1/2 -translate-x-1/2",
        "w-full max-w-[88vw] md:max-w-[360px]",
        "px-10 py-3 rounded-md font-semibold shadow-lg",
        "backdrop-blur-md bg-white/5 border border-white/20",
        "font-bold",
        "cursor-pointer"
      )}
      onClick={navigateToSceneDetailPage}
    >
      자세히 살펴보기
    </motion.button>
  );
};

export default ViewProjectDetailButton;
