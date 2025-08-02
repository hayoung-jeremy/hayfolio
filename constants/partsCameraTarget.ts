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
    position: [-0.874, 1.656, 2.353],
    target: [0.182, 0.382, -0.149],
  },
  Spoiler: {
    position: [3.238, 1.775, 1.411],
    target: [0.324, -0.332, -0.786],
  },
  Body: initialGarageCameraTarget,
};
