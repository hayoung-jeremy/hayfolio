import { create } from "zustand";
import type CameraControls from "camera-controls";

type Vec3 = [number, number, number];

type CameraBus = {
  ref: CameraControls | null;
  setRef: (r: CameraControls | null) => void;

  moveTo: (pos: Vec3, tgt: Vec3, smooth?: boolean) => Promise<void>;
  setConstraints: (
    opts: Partial<{ minDistance: number; maxDistance: number; polar: [number, number]; fov: number }>
  ) => void;
  setAutoRotate: (on: boolean, speed?: number) => void;

  autoRotate: boolean;
  autoRotateSpeed: number;
};

export const useCameraBus = create<CameraBus>((set, get) => ({
  ref: null,
  setRef: r => set({ ref: r }),

  moveTo: async (pos, tgt, smooth = true) => {
    const c = get().ref;
    if (!c) return;
    await c.setLookAt(pos[0], pos[1], pos[2], tgt[0], tgt[1], tgt[2], smooth);
    c.saveState();
  },

  setConstraints: ({ minDistance, maxDistance, polar, fov }) => {
    const c = get().ref;
    if (!c) return;
    if (minDistance != null) c.minDistance = minDistance;
    if (maxDistance != null) c.maxDistance = maxDistance;
    if (polar) {
      c.minPolarAngle = polar[0];
      c.maxPolarAngle = polar[1];
    }
    if (fov != null) {
      const cam: any = (c as any).camera;
      if (cam) {
        cam.fov = fov;
        cam.updateProjectionMatrix();
      }
    }
  },

  setAutoRotate: (on, speed = 0.3) => set({ autoRotate: on, autoRotateSpeed: speed }),
  autoRotate: false,
  autoRotateSpeed: 0.3,
}));
