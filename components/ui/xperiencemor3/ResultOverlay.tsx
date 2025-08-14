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
          loaderVariant="skeleton"
        />
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
