import { QUESTION_INFO_COLLECTION } from "@/constants/xperiencemor3";
import { create } from "zustand";

export type Keywords =
  | "Electric"
  | "Analog"
  | "Sporty"
  | "Elegant"
  | "Dynamic"
  | "Calm"
  | "Technology"
  | "Nature"
  | "Experienced"
  | "Innovative"
  | "Emotional"
  | "Pragmatic"
  | "Spacious"
  | "Compact"
  | "Pop-culture"
  | "Traditions";
export type GameStatus = "intro" | "entering" | "questioning" | "result";

export type QuestionInfo = {
  first: Keywords;
  second: Keywords;
  targetPosition: number[];
  cameraPosition: number[];
};

export type GameResult = { text: string; imageUrl: string };

type GameStore = {
  choosedList: Keywords[];
  status: GameStatus;
  result: GameResult | null;
  currentQuestionInfo: QuestionInfo | null;
  actions: {
    setChoosedList: (k: Keywords) => void;
    setGameStatus: (s: GameStatus) => void;
    setCurrentQuestionInfo: (i: number) => void;
    setResult: (r: GameResult) => void;
    undo: () => void;
    resetGame: () => void;
  };
};

export const useXperiencemor3GameStore = create<GameStore>(set => ({
  choosedList: [],
  status: "intro",
  result: null,
  currentQuestionInfo: null,
  actions: {
    setChoosedList: k => set(s => ({ choosedList: [...s.choosedList, k] })),
    setGameStatus: s => set(() => ({ status: s })),
    setCurrentQuestionInfo: i => set(() => ({ currentQuestionInfo: QUESTION_INFO_COLLECTION[i] })),
    setResult: r => set(() => ({ result: r, status: "result" })),
    undo: () => set(s => ({ choosedList: s.choosedList.slice(0, -1) })),
    resetGame: () =>
      set(() => ({
        choosedList: [],
        status: "intro",
        result: null,
        currentQuestionInfo: null,
      })),
  },
}));
