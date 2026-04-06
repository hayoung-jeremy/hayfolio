import { create } from "zustand";

type OverlayLoaderState = {
  enabled: boolean;
  suppressedCount: number;
  holdCount: number;
  enable: () => void;
  disable: () => void;
  suppress: () => void; // ++
  unsuppress: () => void; // --
  hold: () => void; // keep overlay open even after loading completes
  unhold: () => void;
};

export const useOverlayLoader = create<OverlayLoaderState>(set => ({
  enabled: true,
  suppressedCount: 0,
  holdCount: 0,
  enable: () => set({ enabled: true }),
  disable: () => set({ enabled: false }),
  suppress: () => set(s => ({ suppressedCount: s.suppressedCount + 1 })),
  unsuppress: () => set(s => ({ suppressedCount: Math.max(0, s.suppressedCount - 1) })),
  hold: () => set(s => ({ holdCount: s.holdCount + 1 })),
  unhold: () => set(s => ({ holdCount: Math.max(0, s.holdCount - 1) })),
}));
