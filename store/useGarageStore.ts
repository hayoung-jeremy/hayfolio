import { create } from "zustand";
import type { PartsType } from "@/types/garage";
import { partCameraMap } from "@/constants/partsCameraTarget";

export type PartMeta = {
  theme: string;
  variant: string | null;
  imageUrl: string;
};

export type GarageSceneCameraTarget = {
  position: [number, number, number];
  target: [number, number, number];
};

type GarageState = {
  selectedBody: "XM3" | "SM6" | "QM6" | null;
  selectedParts: Partial<Record<PartsType, PartMeta>>;
  selectBody: (name: "XM3" | "SM6" | "QM6") => void;
  selectPart: (part: PartsType, meta: PartMeta) => void;
  resetParts: () => void;
  cameraTarget: GarageSceneCameraTarget | null;
  setCameraTarget: (target: GarageSceneCameraTarget) => void;
  resetCameraTarget: () => void;
  hasReset: boolean;
  setHasReset: (v: boolean) => void;
};

export const useGarageStore = create<GarageState>(set => ({
  selectedBody: "XM3",
  selectedParts: {},
  selectBody: name =>
    set({
      selectedBody: name,
      selectedParts: {},
    }),
  selectPart: (part, meta) =>
    set(state => {
      const cameraTarget = partCameraMap[part];
      return {
        selectedParts: {
          ...state.selectedParts,
          [part]: meta,
        },
        ...(cameraTarget ? { cameraTarget } : {}),
        hasReset: false,
      };
    }),
  resetParts: () => set({ selectedParts: {} }),
  cameraTarget: null,
  setCameraTarget: target => set({ cameraTarget: target }),
  resetCameraTarget: () => set({ cameraTarget: { position: [0, 0, 5], target: [0, 0, 0] } }),
  hasReset: false,
  setHasReset: v => set({ hasReset: v }),
}));
