import clsx from "clsx";
import ProjectDescription from "./ProjectDesc";
import ViewProjectDetailButton from "./ViewProjectDetailButton";
import { useScrollStore } from "@/store/useScrollStore";
import { SCROLL_THRESHOLDS } from "@/constants/scrollThresholds";
import { AnimatePresence } from "framer-motion";

const Navigation = () => {
  const progress = useScrollStore(s => s.progress);

  const showCYEC =
    progress >= SCROLL_THRESHOLDS.createYourEpicCar.min && progress < SCROLL_THRESHOLDS.createYourEpicCar.max;
  const showXM3 = progress >= SCROLL_THRESHOLDS.xperiencemor3.min && progress < SCROLL_THRESHOLDS.xperiencemor3.max;
  const showCLR = progress >= SCROLL_THRESHOLDS.clarins.min && progress < SCROLL_THRESHOLDS.clarins.max;
  const showAI = progress >= SCROLL_THRESHOLDS.ai.min && progress < SCROLL_THRESHOLDS.ai.max;

  return (
    <nav className={clsx("absolute top-0 left-0 w-screen", "xl:w-[1200px] top-10 left-1/2 -translate-x-1/2")}>
      <ProjectDescription
        id="desc1"
        title="Renault — Create your epic car"
        description="새롭게 출시된 XM3 관련 이벤트의 핵심 기능인 '차고' 페이지 개발을 담당하여, 차량 파츠(보닛, 헤드라이트, 범퍼 등)를 직접 조립하고 커스터마이징할 수 있는 인터랙션 UI를 구현했습니다."
        visible={showCYEC}
      />
      <ProjectDescription
        id="desc2"
        title="Renault — Xperiencemor3"
        description="XM3 NFT 캠페인을 위한 인터랙티브 웹 이벤트 페이지를 개발했습니다. 사용자의 선택에 따라 고해상도 3D 차량 부품이 자연스럽게 전환되는 인터페이스를 구현했어요."
        visible={showXM3}
      />
      <ProjectDescription
        id="desc3"
        title="Clarins — As Rare As You (NFT Gallery)"
        description="속성 기반 필터와 Infinite Scroll을 갖춘 2D 갤러리 UI를 구현했습니다. Recoil + react-query로 상태/데이터를 분리해 UX를 개선."
        visible={showCLR}
      />
      <ProjectDescription
        id="desc4"
        title="Generative 3D AI Showcase"
        description="이미지→3D 파이프라인의 결과를 공통 뷰어로 시각화. Seed/Wireframe 토글 등 인터랙션 중심의 UI 설계."
        visible={showAI}
      />
      <AnimatePresence>{(showCYEC || showXM3 || showCLR || showAI) && <ViewProjectDetailButton />}</AnimatePresence>
    </nav>
  );
};

export default Navigation;
