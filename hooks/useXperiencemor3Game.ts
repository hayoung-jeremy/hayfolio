import { useEffect } from "react";
import { useXperiencemor3GameStore } from "@/store/useXperiencemor3GameStore";
import { getResultForCombinationFromSelections } from "@/utils/xperiencemor3";
import { QUESTION_INFO_COLLECTION } from "@/constants/xperiencemor3";

export const useGameStatus = () => useXperiencemor3GameStore(s => s.status);
export const useSelectedOptions = () => useXperiencemor3GameStore(s => s.selectedOptions);
export const useCurrentQuestionInfo = () => useXperiencemor3GameStore(s => s.currentQuestionInfo);
export const useGameResult = () => useXperiencemor3GameStore(s => s.result);
export const useGameActions = () => useXperiencemor3GameStore(s => s.actions);

export const useGameProgressObserver = () => {
  const selectedOptions = useSelectedOptions();
  const status = useGameStatus();
  const { setCurrentQuestionInfo, setResult, resetGame, setGameStatus } = useGameActions();

  useEffect(() => {
    if (status !== "questioning") return;

    const total = QUESTION_INFO_COLLECTION.length;

    if (selectedOptions.length === 0) {
      setCurrentQuestionInfo(0);
      return;
    }

    if (selectedOptions.length === 4) {
      const r = getResultForCombinationFromSelections(selectedOptions);
      if (!r) return resetGame();
      setResult(r);
      setCurrentQuestionInfo(4);
      return;
    }

    if (selectedOptions.length === total) {
      setGameStatus("result");
      return;
    }

    setCurrentQuestionInfo(selectedOptions.length);
  }, [selectedOptions, status]);
};
