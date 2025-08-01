import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { Vector3 } from "three";

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

  useFrame(() => {
    if (!cameraRef.current) return;
    const pos = cameraRef.current.camera.position;
    const tgt = new Vector3();
    cameraRef.current.getTarget(tgt);

    console.log("position:", [pos.x.toFixed(3), pos.y.toFixed(3), pos.z.toFixed(3)]);
    console.log("target:", [tgt.x.toFixed(3), tgt.y.toFixed(3), tgt.z.toFixed(3)]);
  });

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
