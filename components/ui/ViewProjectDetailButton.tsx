import { useRouter } from "next/navigation";

import ButtonWrapper from "./ButtonWrapper";
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
    <ButtonWrapper className="fixed top-[80dvh] left-1/2 -translate-x-1/2" onClick={navigateToSceneDetailPage}>
      자세히 살펴보기
    </ButtonWrapper>
  );
};

export default ViewProjectDetailButton;
