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
  shouldResetOnFirstInteract: boolean; // 추가
  setShouldResetOnFirstInteract: (v: boolean) => void;

  isPartPanelOpen: boolean;
  setPartPanelOpen: (v: boolean) => void;
  activePartTabIndex: number;
  setActivePartTabIndex: (index: number) => void;

  isColorPickerOpen: boolean;
  setColorPickerOpen: (v: boolean) => void;
  selectedColors: {
    Body: string;
    Bonnet: string;
    Bumper: string;
    Wheel: string;
    Spoiler: string;
    Pattern: string;
  };
  setSelectedColorByType: (type: "Body" | "Bonnet" | "Bumper" | "Wheel" | "Spoiler" | "Pattern", color: string) => void;
  resetAll: () => void;
};

export const useGarageStore = create<GarageState>(set => ({
  selectedBody: "XM3",
  selectedParts: {},
  selectBody: name =>
    set(state => {
      if (state.selectedBody === name) {
        return {};
      }
      return {
        selectedBody: name,
        selectedParts: {},
      };
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
        shouldResetOnFirstInteract: !!cameraTarget,
      };
    }),
  resetParts: () => set({ selectedParts: {} }),

  cameraTarget: null,
  setCameraTarget: target => set({ cameraTarget: target }),
  resetCameraTarget: () => set({ cameraTarget: { position: [0, 0, 5], target: [0, 0, 0] } }),
  shouldResetOnFirstInteract: false,
  setShouldResetOnFirstInteract: v => set({ shouldResetOnFirstInteract: v }),

  isPartPanelOpen: false,
  setPartPanelOpen: v => set({ isPartPanelOpen: v }),
  activePartTabIndex: 0,
  setActivePartTabIndex: index => set({ activePartTabIndex: index }),

  isColorPickerOpen: false,
  setColorPickerOpen: v => set({ isColorPickerOpen: v }),
  selectedColors: {
    Body: "#ffffff",
    Bonnet: "#ffffff",
    Bumper: "#ffffff",
    Wheel: "#ffffff",
    Spoiler: "#ffffff",
    Pattern: "#ffffff",
  },
  setSelectedColorByType: (type: "Body" | "Bonnet" | "Bumper" | "Wheel" | "Spoiler" | "Pattern", color: string) =>
    set(state => ({
      selectedColors: {
        ...state.selectedColors,
        [type]: color,
      },
    })),
  resetAll: () =>
    set({
      selectedBody: "XM3",
      selectedParts: {},
      cameraTarget: { position: [0, 0, 5], target: [0, 0, 0] },
      shouldResetOnFirstInteract: false,
      isPartPanelOpen: false,
      activePartTabIndex: 0,
      isColorPickerOpen: false,
      selectedColors: {
        Body: "#ffffff",
        Bonnet: "#ffffff",
        Bumper: "#ffffff",
        Wheel: "#ffffff",
        Spoiler: "#ffffff",
        Pattern: "#ffffff",
      },
    }),
}));
