import React, { useEffect, useRef } from "react";
import { CameraControls as CameraControlsComponent } from "@react-three/drei";
import CameraControls from "camera-controls";

import { useGarageStore } from "@/store/useGarageStore";
import { initialGarageCameraTarget } from "@/constants/partsCameraTarget";

const GarageSceneCameraController = () => {
  const cameraRef = useRef<any>(null);
  const { cameraTarget, setCameraTarget, hasReset, setHasReset } = useGarageStore();

  useEffect(() => {
    if (!cameraTarget || !cameraRef.current) return;

    const { position, target } = cameraTarget;

    cameraRef.current.setTarget(...target, true);
    cameraRef.current.setPosition(...position, true);
  }, [cameraTarget]);

  useEffect(() => {
    const controls = cameraRef.current;
    if (!controls) return;

    const handleStart = () => {
      if (!hasReset) {
        setCameraTarget(initialGarageCameraTarget);
        setHasReset(true);
      }
    };

    controls.addEventListener("controlstart", handleStart);
    controls.mouseButtons.right = 0;
    controls.touches.two = CameraControls.ACTION.TOUCH_DOLLY;
    return () => {
      controls.removeEventListener("controlstart", handleStart);
    };
  }, [hasReset, setCameraTarget, setHasReset]);

  return (
    <CameraControlsComponent
      ref={cameraRef}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 2}
      minDistance={3}
      maxDistance={6}
      smoothTime={0.28}
      draggingSmoothTime={0.28}
    />
  );
};

export default GarageSceneCameraController;
