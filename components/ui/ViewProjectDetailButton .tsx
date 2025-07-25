import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useScrollStore } from "@/store/useScrollStore";

const ViewProjectDetailButton = () => {
  const progress = useScrollStore(s => s.progress);

  const router = useRouter();

  const navigateToSceneDetailPage = () => {
    if (progress < 0.45) {
      router.push("/garage"); // 첫 번째 씬: XM3 차고
    } else if (progress >= 0.55) {
      router.push("/xperiencemor3"); // 두 번째 씬: Xperiencemor3 본 페이지
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
