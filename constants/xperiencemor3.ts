import { GameResult, QuestionInfo } from "@/store/useXperiencemor3GameStore";

export const QUESTION_INFO_COLLECTION: Array<QuestionInfo> = [
  {
    first: "Electric",
    second: "Analog",
    targetPosition: [0, 0, 2],
    cameraPosition: [0, -0.1, 4.4],
  },
  {
    first: "Sporty",
    second: "Elegant",
    targetPosition: [1.2, -0.7, 1.2],
    cameraPosition: [2, -0.85, 3.6],
  },
  {
    first: "Dynamic",
    second: "Calm",
    targetPosition: [2, 0.1, 0],
    cameraPosition: [4, 0, 1.8],
  },
  {
    first: "Technology",
    second: "Nature",
    targetPosition: [1.2, 1, -1.45],
    cameraPosition: [3, 1, 0.4],
  },
  {
    first: "Experienced",
    second: "Innovative",
    targetPosition: [-0.1, 1.8, -2],
    cameraPosition: [2.8, 2, -3],
  },
  {
    first: "Emotional",
    second: "Pragmatic",
    targetPosition: [-1, -1.4, -1.4],
    cameraPosition: [-1.5, -1.4, -5.8],
  },
  {
    first: "Spacious",
    second: "Compact",
    targetPosition: [-1.8, 1, -0.1],
    cameraPosition: [-4.2, 1, 3],
  },
  {
    first: "Pop-culture",
    second: "Traditions",
    targetPosition: [-2, 0, 1.1],
    cameraPosition: [-3, 0, -1],
  },
];

export const GAME_RESULT_COLLECTION: { [key: string]: GameResult } = {
  "Electric,Sporty,Dynamic,Technology": {
    text: "당신은 XM3 E-TECH와 찰떡궁합! \n 당신의 스포티하고 역동적인 성격이 경쟁심리를 자극하지만, 결과 또한 즐기는 사람입니다. 당신은 전기 자동차와 같이 모든 신기술에 관심이 많으며, 효율성 또한 중요하게 생각하는 사람입니다.",
    imageUrl: "/images/game/1.png?1",
  },
  "Electric,Sporty,Dynamic,Nature": {
    text: "당신은 열정적인 탐험가! \n XM3 E-TECH처럼 다이내믹한 모습을 가지고 있는 당신은 새로운 경험을 두려워하지 않고 끊임없이 도전하는 불굴의 탐험가 기질을 가지고 있습니다.",
    imageUrl: "/images/game/2.png?1",
  },
  "Electric,Sporty,Calm,Technology": {
    text: "당신은 평정심을 잃지 않는 대담한 레이서! \n 최신 전기 기술이 탑재된 XM3 E-TECH의 스포티함과 당신만이 가지고 있는 차분함 뒤에 숨겨져 있는 질주본능은 완벽한 조화를 이루는군요.",
    imageUrl: "/images/game/3.png?1",
  },
  "Electric,Sporty,Calm,Nature": {
    text: "당신은 에코 라이프 파이어니어! \n 당신은 XM3 E-TECH와 같은 친환경 자동차와 함께 평화로운 여행을 하며 자연의 아름다움을 탐험하는 것을 즐기는 사람입니다.",
    imageUrl: "/images/game/4.png?1",
  },
  "Electric,Elegant,Dynamic,Technology": {
    text: "당신은 섬세함이 돋보이는 프로 레이서! \n 당신은 혁신적인 전기 기술과 정교한 아름다움을 탑재한 XM3 E-TECH처럼 기술과 예술 모두를 마스터한 감각적인 사람입니다.",
    imageUrl: "/images/game/5.png?1",
  },
  "Electric,Elegant,Dynamic,Nature": {
    text: "당신은 우아한 자연의 항해자! \n XM3 E-TECH만의 독보적인 전기 주행 기술의 경이로움과 같이 도시를 벗어난 교외에서 당신만의 길을 찾을 때 그 무엇보다 큰 즐거움을 느낍니다.",
    imageUrl: "/images/game/6.png?1",
  },
  "Electric,Elegant,Calm,Technology": {
    text: "당신은 현명한 얼리어답터! \n XM3 E-TECH의 최신 전기 기술처럼 어떠한 기술도 쉽게 이해하고 따라잡는 당신은 차분하지만 동시에 끈기를 가지고 있는 엔지니어적인 기질을 가지고 있는 사람입니다.",
    imageUrl: "/images/game/7.png?1",
  },
  "Electric,Elegant,Calm,Nature": {
    text: "당신은 여유로운 모험가! \n 당신은 XM3 E-TECH의 뛰어난 전기기술로 탄생한 친환경 주행 시스템처럼 항상 도시를 벗어나 새로운 곳을 탐구하며, 전기 모터가 주는 편안함과 같은 안정감을 찾아 여행을 떠나는 모험가입니다.",
    imageUrl: "/images/game/8.png?1",
  },
  "Analog,Sporty,Dynamic,Technology": {
    text: "당신은 스피드 마스터! \n 당신은 역동적이며 F1을 기반으로 한 XM3 E-TECH의 스포티함을 당신만의 숨겨진 또 다른 아날로그적 감각으로 즐길 줄 아는 사람입니다.",
    imageUrl: "/images/game/9.png?1",
  },
  "Analog,Sporty,Dynamic,Nature": {
    text: "당신은 자연을 사랑하는 모험가! \n 당신은 XM3 E-TECH의 최신 전기 기술처럼 현대 문명을 추구하지만 동시에 자연을 탐험하며 그곳에서 당신만의 짜릿한 모험을 즐기는 사람입니다.",
    imageUrl: "/images/game/10.png?1",
  },
  "Analog,Sporty,Calm,Technology": {
    text: "당신은 엣지 있는 클래식 수호자! \n 클래식한 스타일에 대한 당신의 사랑은 XM3 E-TECH의 시대를 초월한 세련된 디자인과 같이 최신 기술과 트렌드에 쉽게 흔들리지 않는군요!",
    imageUrl: "/images/game/11.png?1",
  },
  "Analog,Sporty,Calm,Nature": {
    text: "당신은 클래식한 감성의 탐험가! \n 차분한 분위기와 자연의 진가까지 알아보는 당신은 XM3 E-TECH의 클래식한 매력과 완벽한 조화를 이룹니다.",
    imageUrl: "/images/game/12.png?1",
  },
  "Analog,Elegant,Dynamic,Technology": {
    text: "당신은 시크한 디지털 노마드! \n 우아한 스타일과 현대적 기술의 가치를 아는 당신은 XM3 E-TECH의 커넥티비티 기능과 같이 신기술이 주는 편리함을 활용할 줄 아는 사람입니다.",
    imageUrl: "/images/game/13.png?1",
  },
  "Analog,Elegant,Dynamic,Nature": {
    text: "당신은 호기심이 넘치는 항해자이군요! \n 당신의 모험적인 일상을 F1 기술을 기반으로 탄생한 XM3 E-TECH의 엔진과 전기모터로 더 다이내믹하게 즐겨보는 건 어떨까요?",
    imageUrl: "/images/game/14.png?1",
  },
  "Analog,Elegant,Calm,Technology": {
    text: "당신은 시대를 초월한 테크 전문가네요! \n 당신은 차분한 성향으로 새로운 기술에 대한 가치를 더욱 탐구하지만 XM3 E-TECH의 클래식함과도 잘 어울리는 사람입니다.",
    imageUrl: "/images/game/15.png?1",
  },
  "Analog,Elegant,Calm,Nature": {
    text: "당신은 클래식함을 추구하는 평화주의자! \n 당신의 차분하면서도 우아한 성격은 쿠페와 SUV의 매력을 동시에 겸비한 XM3 E-TECH만의 감각적인 디자인과 잘 어울립니다.",
    imageUrl: "/images/game/16.png?1",
  },
};
