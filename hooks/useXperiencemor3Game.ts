import { useEffect } from "react";
import { useXperiencemor3GameStore } from "@/store/useXperiencemor3GameStore";
import { getResultForCombinationFromSelections } from "@/utils/xperiencemor3";

export const useGameStatus = () => useXperiencemor3GameStore(s => s.status);
export const useSelectedOptions = () => useXperiencemor3GameStore(s => s.selectedOptions);
export const useCurrentQuestionInfo = () => useXperiencemor3GameStore(s => s.currentQuestionInfo);
export const useGameResult = () => useXperiencemor3GameStore(s => s.result);
export const useGameActions = () => useXperiencemor3GameStore(s => s.actions);

export const useGameProgressObserver = () => {
  const selectedOptions = useSelectedOptions();
  const status = useGameStatus();
  const { setCurrentQuestionInfo, setResult, resetGame } = useGameActions();

  useEffect(() => {
    if (status !== "questioning") return;

    if (selectedOptions.length === 4) {
      const result = getResultForCombinationFromSelections(selectedOptions);
      if (!result) return resetGame();
      setResult(result);
      return;
    }

    setCurrentQuestionInfo(selectedOptions.length);
  }, [selectedOptions, status]);
};
