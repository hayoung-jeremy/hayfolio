import { SCROLL_THRESHOLDS as T } from "@/constants/scrollThresholds";

export type PreviewKey = "garage" | "xm3" | "clarins" | "ai";

export type PreviewConfig = {
  key: PreviewKey;
  title: string;
  description: string;
  route?: string;
  cta?: string;
  range: { min: number; max: number };
};

const clamp = (n: number, min = 0, max = 0.9999) => Math.max(min, Math.min(max, n));

export const PREVIEW_SECTIONS: PreviewConfig[] = [
  {
    key: "garage",
    title: "Renault — Create your epic car",
    description:
      "새롭게 출시된 XM3 관련 이벤트의 핵심 기능인 '차고' 페이지 개발을 담당하여, 차량 파츠(보닛, 헤드라이트, 범퍼 등)를 직접 조립하고 커스터마이징할 수 있는 인터랙션 UI를 구현했습니다.",
    route: "/garage",
    cta: "자세히 살펴보기",
    range: { min: T.createYourEpicCar.min, max: T.xperiencemor3.min ?? T.createYourEpicCar.max },
  },
  {
    key: "xm3",
    title: "Renault — Xperiencemor3",
    description:
      "XM3 NFT 캠페인을 위한 인터랙티브 웹 이벤트 페이지를 개발했습니다. 사용자의 선택에 따라 고해상도 3D 차량 부품이 자연스럽게 전환되는 인터페이스를 구현했어요.",
    route: "/xperiencemor3",
    cta: "자세히 살펴보기",
    range: { min: T.xperiencemor3.min, max: T.clarins?.min ?? clamp(T.xperiencemor3.max ?? 0.6) },
  },
  {
    key: "clarins",
    title: "Clarins — As Rare As You",
    description:
      "럭셔리 Web3 캠페인의 NFT 갤러리 전반을 구현했습니다. 325개 NFT를 ‘속성 조합’으로 필터링하고 무한 스크롤로 렌더링을 최적화했으며, Recoil selector로 필터/검색 상태를, react-query로 메타데이터 fetch를 분리해 체감 속도와 UX를 개선하고자 했어요.",
    // route: "/clarins",
    cta: "작업 중",
    range: { min: T.clarins.min, max: T.ai?.min ?? clamp(T.clarins.max ?? 0.85) },
  },
  {
    key: "ai",
    title: "Generative 3D AI Showcase",
    description:
      "다양한 3D 생성형 AI(DreamCraft3D·DreamGaussian 등)의 결과를 단일 WebGL 뷰어로 통합했습니다. Blender 기반 후처리로 GLB 변환을 자동화하고, Seed 전환·Wireframe 토글·다운로드 등 인터랙션을 제공해 생성→시각화 흐름을 매끄럽게 연결했습니다.",
    // route: "ai",
    cta: "작업 중",
    range: { min: T.ai.min, max: clamp(T.ai.max ?? 0.9999) },
  },
];

export const getActiveByProgress = (p: number) => {
  const firstMin = PREVIEW_SECTIONS[0].range.min;
  const lastMax = PREVIEW_SECTIONS[PREVIEW_SECTIONS.length - 1].range.max;
  if (p < firstMin || p >= lastMax) return null;

  for (const s of PREVIEW_SECTIONS) {
    if (p >= s.range.min && p < s.range.max) return s;
  }
  return null;
};
