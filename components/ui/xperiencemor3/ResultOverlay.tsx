"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";

import ButtonWrapper from "../ButtonWrapper";
import SmartImage from "../SmartImage";
import { useGameActions, useGameResult } from "@/hooks/useXperiencemor3Game";

const ResultOverlay = () => {
  const result = useGameResult();
  const { resetGame } = useGameActions();
  const router = useRouter();
  const handleBack = () => {
    router.push("/");
  };

  if (!result) return null;

  return (
    <article
      className={clsx("flex flex-col items-center gap-4 md:gap-6", "w-full max-w-[320px] md:max-w-[480px] text-center")}
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
        <SmartImage
          src={result.imageUrl}
          alt="result visual"
          fill
          priority
          sizes="320px"
          style={{ objectFit: "cover" }}
        />
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-5 bg-black/65 w-[80%] md:w-[70%] text-white/80 text-[14px] md:text-base rounded-lg">
          현재 이벤트가 종료되어 <br /> 정상적인 이미지 제공이 어렵습니다. <br /> 양해 부탁드려요🙏
        </p>
      </div>

      <p className="whitespace-pre-line leading-relaxed text-sm md:text-base opacity-90">{result.text}</p>

      <div className="w-full">
        <ButtonWrapper onClick={resetGame} className="mb-2">
          다시하기
        </ButtonWrapper>
        <ButtonWrapper type="negative" onClick={handleBack}>
          나가기
        </ButtonWrapper>
      </div>
    </article>
  );
};

export default ResultOverlay;
