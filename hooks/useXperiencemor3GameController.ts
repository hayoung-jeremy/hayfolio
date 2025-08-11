import { QUESTION_INFO_COLLECTION } from "@/constants/xperiencemor3";
import { useSelectedOptions, useGameStatus, useGameActions } from "@/hooks/useXperiencemor3Game";
import { Keywords } from "@/store/useXperiencemor3GameStore";

export const useXperiencemor3GameController = () => {
  const selectedOptions = useSelectedOptions();
  const status = useGameStatus();
  const { setSelectedOptions, undo, setGameStatus, resetGame } = useGameActions();

  const startGame = (delay: number = 3000) => {
    setGameStatus("entering");
    setTimeout(() => {
      setGameStatus("questioning");
    }, delay);
  };

  const selectKeyword = (keyword: Keywords) => {
    if (selectedOptions.length >= QUESTION_INFO_COLLECTION.length || status !== "questioning") return;
    setSelectedOptions(keyword);
  };

  return {
    startGame,
    selectKeyword,
    undo,
    resetGame,
  };
};
