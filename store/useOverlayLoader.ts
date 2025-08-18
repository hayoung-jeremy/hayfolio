import { create } from "zustand";

type OverlayLoaderState = {
  enabled: boolean;
  suppressedCount: number;
  enable: () => void;
  disable: () => void;
  suppress: () => void; // ++
  unsuppress: () => void; // --
};

export const useOverlayLoader = create<OverlayLoaderState>(set => ({
  enabled: true,
  suppressedCount: 0,
  enable: () => set({ enabled: true }),
  disable: () => set({ enabled: false }),
  suppress: () => set(s => ({ suppressedCount: s.suppressedCount + 1 })),
  unsuppress: () => set(s => ({ suppressedCount: Math.max(0, s.suppressedCount - 1) })),
}));
