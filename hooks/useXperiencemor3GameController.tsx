import { QUESTION_INFO_COLLECTION } from "@/constants/xperiencemor3";
import { useChoosedList, useGameStatus, useGameActions } from "@/hooks/useXperiencemor3Game";
import { Keywords } from "@/store/useXperiencemor3GameStore";

export const useXperiencemor3GameController = () => {
  const choosedList = useChoosedList();
  const status = useGameStatus();
  const { setChoosedList, undo, setGameStatus, resetGame } = useGameActions();

  const startGame = (delay: number = 3000) => {
    setGameStatus("entering");
    setTimeout(() => {
      setGameStatus("questioning");
    }, delay);
  };

  const selectKeyword = (keyword: Keywords) => {
    if (choosedList.length >= QUESTION_INFO_COLLECTION.length || status !== "questioning") return;
    setChoosedList(keyword);
  };

  return {
    startGame,
    selectKeyword,
    undo,
    resetGame,
  };
};
