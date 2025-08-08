import { create } from "zustand";

type SceneType = "none" | "garage preview" | "xperiencemor3 preview" | "garage" | "xperiencemor3";

type SceneState = {
  currentScene: SceneType;
  previousScene: SceneType | null;
  setScene: (scene: SceneType) => void;
  enterMainScene: () => void;
};

export const useSceneStore = create<SceneState>(set => ({
  currentScene: "none",
  previousScene: null,
  setScene: scene =>
    set(state => ({
      previousScene: state.currentScene,
      currentScene: scene,
    })),
  enterMainScene: () => {
    set(state => {
      if (state.currentScene === "garage preview") {
        return { previousScene: state.currentScene, currentScene: "garage" };
      }
      if (state.currentScene === "xperiencemor3 preview") {
        return { previousScene: state.currentScene, currentScene: "xperiencemor3" };
      }
      return {};
    });
  },
}));
