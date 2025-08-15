import { create } from "zustand";

type InteractionLayerStore = {
  domElement: HTMLElement | null;
  setDomElement: (el: HTMLElement | null) => void;
};

export const useInteractionLayerStore = create<InteractionLayerStore>(set => ({
  domElement: null,
  setDomElement: el => set({ domElement: el }),
}));
