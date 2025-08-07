import { useEffect } from "react";
import { useXperiencemor3GameStore } from "@/store/useXperiencemor3GameStore";
import { getResultForCombinationFromSelections } from "@/utils/xperiencemor3";

export const useGameStatus = () => useXperiencemor3GameStore(s => s.status);
export const useChoosedList = () => useXperiencemor3GameStore(s => s.choosedList);
export const useCurrentQuestionInfo = () => useXperiencemor3GameStore(s => s.currentQuestionInfo);
export const useGameResult = () => useXperiencemor3GameStore(s => s.result);
export const useGameActions = () => useXperiencemor3GameStore(s => s.actions);

export const useGameProgressObserver = () => {
  const choosedList = useChoosedList();
  const status = useGameStatus();
  const { setCurrentQuestionInfo, setResult, resetGame } = useGameActions();

  useEffect(() => {
    if (status !== "inGame") return;

    if (choosedList.length === 4) {
      const result = getResultForCombinationFromSelections(choosedList);
      if (!result) return resetGame();
      setResult(result);
      return;
    }

    setCurrentQuestionInfo(choosedList.length);
  }, [choosedList, status]);
};
