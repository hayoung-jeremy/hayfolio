import React, { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";

import { useGarageStore } from "@/store/useGarageStore";
import { initialGarageCameraTarget } from "@/constants/partsCameraTarget";

const GarageSceneCameraController = () => {
  const cameraRef = useRef<CameraControls>(null);
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
    return () => {
      controls.removeEventListener("controlstart", handleStart);
    };
  }, [hasReset, setCameraTarget, setHasReset]);

  return (
    <CameraControls
      ref={cameraRef}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 2}
      smoothTime={0.2}
      draggingSmoothTime={0.2}
    />
  );
};

export default GarageSceneCameraController;
