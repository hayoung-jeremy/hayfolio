# 🌌 Hayfolio

Hayfolio는 프론트엔드 개발자 김하영 (Ha young Kim) 의 포트폴리오 웹사이트입니다.
Next.js 기반으로 제작되었으며, 3D WebGL 인터랙션과 AI 프로젝트 결과물을 통합적으로 보여주는 Interactive Portfolio입니다.
<br />
<br />

## ✨ 주요 기능

**Interactive Landing**

- 스크롤 기반 Timeline 애니메이션
- Intro → Preview → 상세 페이지로 이어지는 부드러운 Scene 전환

**3D Background & Animations**

- 풀스크린 3D 공간, 카메라 이동/조명 전환
- 차량 파츠 커스터마이징 및 애니메이션

**Project Previews**

- Create Your Epic Car (Renault Garage) – XM3 차량 커스터마이징 Garage
- Xperiencemor3 – 고해상도 3D 자동차 부품 시연 인터페이스
- Clarins — As Rare As You 🚧 구현 진행 중
- AI Projects Showcase 🚧 구현 진행 중
<br />

## 🛠️ 기술 스택

- Framework & Language: Next.js 15, React 19, TypeScript 5
- 3D / WebGL: three.js, React Three Fiber, drei, postprocessing, camera-controls
- Animation: Framer Motion, GSAP, React Spring, Lenis
- State Management: Zustand
- UI / Styling: Tailwind CSS, Swiper, React Colorful
- Infra & Tools: AWS S3 SDK, Vercel Analytics, ESLint, pnpm
<br />

## 🌐 Live Demo

프로젝트는 Vercel에 배포되어 있으며, 아래 링크에서 직접 확인할 수 있습니다:

👉 Hayfolio — [Live Website](https://hayfolio-ochre.vercel.app/)

> 3D 에셋이 모두 Cloudflare R2 버킷에 저장되어 있으므로, 로컬에서는 정상적으로 동작하지 않습니다.
> 전체 기능은 배포된 사이트에서만 확인 가능합니다.
<br />

## ⚠️ Known Issues

**Garage → Xperiencemor3 전환 시 충돌**

- Garage 페이지를 다녀온 뒤 Xperiencemor3 진입 시 강제 새로고침 또는 크래시 발생
- 원인: WebGL 리소스 dispose 및 Scene 상태 관리 문제
- 진행 상황: 전환 로직 및 메모리 해제 최적화 작업 중

**Clarins / AI Section**

- 구조만 잡혀 있으며 UI/기능은 구현 진행 중
- NFT 갤러리와 AI 모델 결과물 뷰어는 추후 업데이트 예정
<br />

## 📝 License & Asset Notice

- Code: MIT License (see LICENSE)
- 3D & Media Assets:
> 본 프로젝트에 포함된 Renault 차량 모델, 파츠, 이미지 등 Renault 관련 3D 에셋은 모두 ALTAVA Group과Renault의 자산입니다.
> 해당 에셋은 오직 개인 포트폴리오 용도로만 사용되었으며,
> 무단 복제, 수정, 배포, 상업적 이용은 엄격히 금지됩니다.
> 위반 시 관련 법률에 따라 법적 처벌을 받을 수 있습니다.
