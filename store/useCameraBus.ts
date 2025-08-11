import { create } from "zustand";
import type CameraControls from "camera-controls";

type Vec3 = [number, number, number];
type Constraints = Partial<{
  minDistance: number;
  maxDistance: number;
  polar: [number, number];
  fov: number;
}>;

type CameraBus = {
  ref: CameraControls | null;
  setRef: (r: CameraControls | null) => void;

  moveTo: (pos: Vec3, tgt: Vec3, smooth?: boolean) => Promise<void>;
  constraints: Constraints | null;
  setConstraints: (opts: Constraints | null) => void;
  setAutoRotate: (on: boolean, speed?: number) => void;

  autoRotate: boolean;
  autoRotateSpeed: number;
};

export const useCameraBus = create<CameraBus>((set, get) => {
  const applyConstraints = (c: CameraControls, opts: Constraints | null) => {
    if (opts?.minDistance != null) c.minDistance = opts.minDistance;
    else c.minDistance = 0;

    if (opts?.maxDistance != null) c.maxDistance = opts.maxDistance;
    else c.maxDistance = Number.POSITIVE_INFINITY;

    if (opts?.polar) {
      c.minPolarAngle = opts.polar[0];
      c.maxPolarAngle = opts.polar[1];
    } else {
      c.minPolarAngle = 0;
      c.maxPolarAngle = Math.PI;
    }

    if (opts?.fov != null) {
      const cam: any = (c as any).camera;
      if (cam) {
        cam.fov = opts.fov;
        cam.updateProjectionMatrix();
      }
    }
  };

  return {
    ref: null,
    setRef: r => set({ ref: r }),

    moveTo: async (pos, tgt, smooth = true) => {
      const c = get().ref;
      if (!c) return;
      await c.setLookAt(pos[0], pos[1], pos[2], tgt[0], tgt[1], tgt[2], smooth);
      c.saveState();
    },

    constraints: null,
    setConstraints: opts => {
      set({ constraints: opts });
      const c = get().ref;
      if (c) applyConstraints(c, opts);
    },

    setAutoRotate: (on, speed = 0.3) => set({ autoRotate: on, autoRotateSpeed: speed }),
    autoRotate: false,
    autoRotateSpeed: 0.3,
  };
});
