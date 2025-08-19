import { KernelSize } from "postprocessing";

export type VisualSceneKey = "home" | "garage preview" | "garage" | "xperiencemor3 preview" | "xperiencemor3";

export type EnvKind = "hdr" | "lightformer";

export type PostFX = {
  bloom: {
    on: boolean;
    intensity: number;
    threshold: number;
    smoothing: number;
    radius?: number;
    kernelSize?: KernelSize;
    resolutionScale: number;
    multisampling: number;
    smaa: boolean;
  };
};

export type VisualPreset = {
  env: {
    kind: EnvKind;
    hdrUrl?: string;
    exposure: number;
    background: string;
    rotationY?: number;
    lightformer: "xp" | "garage" | "none";
  };
  postfx: PostFX;
};

export const HDR = {
  XP_1K: "/assets/envs/studio_small_01_1k.hdr",
} as const;

export const ENV_RES = {
  PC: 1024,
  MOBILE: 512,
} as const;

/** ===== 프리셋: Desktop ===== */
export const DESKTOP: Record<VisualSceneKey, VisualPreset> = {
  home: {
    env: { kind: "lightformer", exposure: 0.95, background: "#0a0a0a", rotationY: 0, lightformer: "garage" },
    postfx: {
      bloom: {
        on: true,
        intensity: 0.65,
        threshold: 1.02,
        smoothing: 0.6,
        radius: 0.2,
        resolutionScale: 1.0,
        multisampling: 8,
        smaa: false,
      },
    },
  },
  "garage preview": {
    env: { kind: "lightformer", exposure: 1.0, background: "#0a0a0a", rotationY: 0, lightformer: "garage" },
    postfx: {
      bloom: {
        on: true,
        intensity: 0.8,
        threshold: 1.0,
        smoothing: 0.55,
        radius: 0.2,
        resolutionScale: 1.0,
        multisampling: 8,
        smaa: false,
      },
    },
  },
  garage: {
    env: { kind: "lightformer", exposure: 1.05, background: "#0b0b0b", rotationY: 0, lightformer: "garage" },
    postfx: {
      bloom: {
        on: true,
        intensity: 0.5,
        threshold: 0.0,
        smoothing: 0.85,
        kernelSize: KernelSize.HUGE,
        resolutionScale: 1.0,
        multisampling: 8,
        smaa: false,
      },
    },
  },
  "xperiencemor3 preview": {
    env: { kind: "hdr", hdrUrl: HDR.XP_1K, exposure: 1.1, background: "#050505", rotationY: 0, lightformer: "xp" },
    postfx: {
      bloom: {
        on: true,
        intensity: 0.8,
        threshold: 1.0,
        smoothing: 0.55,
        radius: 0.2,
        resolutionScale: 1.0,
        multisampling: 0,
        smaa: true,
      },
    },
  },
  xperiencemor3: {
    env: { kind: "hdr", hdrUrl: HDR.XP_1K, exposure: 1.12, background: "#050505", rotationY: 0, lightformer: "xp" },
    postfx: {
      bloom: {
        on: true,
        intensity: 0.4,
        threshold: 1.0,
        smoothing: 0.85,
        radius: 0.2,
        resolutionScale: 1.0,
        multisampling: 0,
        smaa: true,
      },
    },
  },
};

/** ===== 프리셋: Mobile ===== */
export const MOBILE: Record<VisualSceneKey, VisualPreset> = {
  home: {
    env: { kind: "lightformer", exposure: 1.02, background: "#0a0a0a", rotationY: 0, lightformer: "garage" },
    postfx: {
      bloom: {
        on: true,
        intensity: 0.7,
        threshold: 0.98,
        smoothing: 0.6,
        radius: 0.2,
        resolutionScale: 0.9,
        multisampling: 0,
        smaa: true,
      },
    },
  },
  "garage preview": {
    env: { kind: "lightformer", exposure: 1.08, background: "#0a0a0a", rotationY: 0, lightformer: "garage" },
    postfx: {
      bloom: {
        on: true,
        intensity: 0.85,
        threshold: 0.98,
        smoothing: 0.58,
        radius: 0.22,
        resolutionScale: 0.9,
        multisampling: 0,
        smaa: true,
      },
    },
  },
  garage: {
    env: { kind: "lightformer", exposure: 1.12, background: "#0b0b0b", rotationY: 0, lightformer: "garage" },
    postfx: {
      bloom: {
        on: true,
        intensity: 0.55,
        threshold: 0.0,
        smoothing: 0.82,
        kernelSize: KernelSize.LARGE,
        resolutionScale: 0.9,
        multisampling: 0,
        smaa: true,
      },
    },
  },
  "xperiencemor3 preview": {
    env: { kind: "hdr", hdrUrl: HDR.XP_1K, exposure: 0.12, background: "#050505", rotationY: 0, lightformer: "xp" },
    postfx: {
      bloom: {
        on: true,
        intensity: 0.86,
        threshold: 0.98,
        smoothing: 0.57,
        radius: 0.22,
        resolutionScale: 0.9,
        multisampling: 0,
        smaa: true,
      },
    },
  },
  xperiencemor3: {
    env: { kind: "hdr", hdrUrl: HDR.XP_1K, exposure: 0.12, background: "#050505", rotationY: 0, lightformer: "xp" },
    postfx: {
      bloom: {
        on: true,
        intensity: 0.92,
        threshold: 0.98,
        smoothing: 0.57,
        radius: 0.24,
        resolutionScale: 0.9,
        multisampling: 0,
        smaa: true,
      },
    },
  },
};
