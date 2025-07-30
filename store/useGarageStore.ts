import { create } from "zustand";
import type { PartsType } from "@/types/garage";

type PartMeta = {
  theme: string;
  variant: string | null;
  imageUrl: string;
};

type GarageState = {
  selectedBody: "XM3" | "SM6" | "QM6" | null;
  selectedParts: Partial<Record<PartsType, PartMeta>>;
  selectBody: (name: "XM3" | "SM6" | "QM6") => void;
  selectPart: (part: PartsType, meta: { imageUrl: string; theme: string; variant: string | null }) => void;
  resetParts: () => void;
};

export const useGarageStore = create<GarageState>(set => ({
  selectedBody: null,
  selectedParts: {},
  selectBody: name =>
    set({
      selectedBody: name,
      selectedParts: {},
    }),
  selectPart: (part, meta) =>
    set(state => ({
      selectedParts: {
        ...state.selectedParts,
        [part]: meta,
      },
    })),
  resetParts: () => set({ selectedParts: {} }),
}));
