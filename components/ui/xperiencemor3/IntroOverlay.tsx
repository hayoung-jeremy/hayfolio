import clsx from "clsx";

import ButtonWrapper from "../ButtonWrapper";
import { useXperiencemor3GameController } from "@/hooks/useXperiencemor3GameController";

const IntroOverlay = () => {
  const { startGame } = useXperiencemor3GameController();

  return (
    <div className={clsx("w-full max-w-[340px] md:max-w-[360px]", "flex flex-col items-center justify-center gap-10")}>
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-6",
          "w-full",
          "pt-6 pb-8",
          "border-b border-l border-[#ffffff08] bg-white/5 rounded-2xl backdrop-blur-lg",
          "text-center",
          "font-NouvelR-KR-Book"
        )}
      >
        <h3 className="font-bold text-[28px]">XPERIENCE MOR3</h3>
        <p className="text-center">
          몇 가지 질문을 통해
          <br />
          당신에게 어울리는 스타일을 찾아볼게요.
          <br />
          준비되셨나요?
        </p>
      </div>
      <ButtonWrapper
        onClick={() => {
          startGame(3000);
        }}
      >
        BEGIN
      </ButtonWrapper>
    </div>
  );
};

export default IntroOverlay;
