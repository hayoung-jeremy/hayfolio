import { PartsType } from "@/types/garage";
import { GarageSceneCameraTarget } from "@/store/useGarageStore";

export const initialGarageCameraTarget: GarageSceneCameraTarget = {
  position: [0, 0, 5],
  target: [0, 0, 0],
};

export const partCameraMap: Record<PartsType, GarageSceneCameraTarget> = {
  Bonnet: {
    position: [-3.171, 0.582, 1.138],
    target: [-0.121, -0.745, -0.259],
  },
  Bumper: {
    position: [-3.414, -0.247, 2.43],
    target: [-0.121, -0.745, -0.259],
  },
  Wheel: {
    position: [-1.294, -0.356, 3.303],
    target: [-0.448, -0.459, -0.145],
  },
  "Head light": {
    position: [-3.016, 0.013, 2.266],
    target: [-0.49, -0.549, -0.168],
  },
  "Tail lamp": {
    position: [3.33, 0.144, -1.963],
    target: [-0.153, -0.563, 0.303],
  },
  Pattern: {
    position: [0, 0, 3],
    target: [0, 0, 0],
  },
  "Roof carrier": {
    position: [-0.432, 1.18, 2.308],
    target: [0.365, 0.5, 0.012],
  },
  Spoiler: {
    position: [4.073, 0.836, 0.535],
    target: [0.189, -0.154, -0.766],
  },
  Body: initialGarageCameraTarget,
};
