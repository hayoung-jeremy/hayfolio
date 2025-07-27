import { useRouter } from "next/navigation";
import clsx from "clsx";
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
    <button
      className={clsx(
        "fixed top-[80dvh] left-1/2 -translate-x-1/2",
        "backdrop-blur-md bg-white/5 border border-white/20",
        "px-10 py-3 rounded-md font-semibold shadow-lg",
        "font-bold"
      )}
    >
      자세히 살펴보기
    </button>
  );
};

export default ViewProjectDetailButton;
