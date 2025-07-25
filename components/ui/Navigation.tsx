import clsx from "clsx";
import ProjectDescription from "./ProjectDesc";
import ViewProjectDetailButton from "./ViewProjectDetailButton ";
import { useScrollStore } from "@/store/useScrollStore";

const Navigation = () => {
  const progress = useScrollStore(s => s.progress);

  return (
    <nav className={clsx("absolute top-0 left-0 w-screen", "xl:w-[1200px] top-10 left-1/2 -translate-x-1/2")}>
      <ProjectDescription
        id="desc1"
        title="Renault — Create your epic car"
        description="새롭게 출시된 XM3 관련 이벤트의 핵심 기능인 '차고' 페이지 개발을 담당하여, 차량 파츠(보닛, 헤드라이트, 범퍼 등)를 직접 조립하고 커스터마이징할 수 있는 인터랙션 UI를 구현했습니다."
        visible={progress >= 0.00001 && progress < 0.45}
      />

      <ProjectDescription
        id="desc2"
        title="Renault — Xperiencemor3"
        description="XM3 NFT 캠페인을 위한 인터랙티브 웹 이벤트 페이지를 개발했습니다. 사용자의 선택에 따라 고해상도 3D 차량 부품이 자연스럽게 전환되는 인터페이스를 구현했어요."
        visible={progress >= 0.55}
      />
      <ViewProjectDetailButton />
    </nav>
  );
};

export default Navigation;
