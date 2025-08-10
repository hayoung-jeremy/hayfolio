"use client";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CameraControls as DreiCameraControls } from "@react-three/drei";
import CameraControls from "camera-controls";

import useDisplay from "@/hooks/useDisplay";
import { useInteractionLayerStore } from "@/store/useInteractionLayerStore";
import { useCameraBus } from "@/store/useCameraBus";
import { useSceneStore } from "@/store/useSceneStore";

const GlobalCameraController = () => {
  const ref = useRef<CameraControls>(null);
  const setRef = useCameraBus(s => s.setRef);
  const { autoRotate, autoRotateSpeed } = useCameraBus();
  const { isDesktop } = useDisplay();
  const domElement = useInteractionLayerStore(s => s.domElement);
  const currentScene = useSceneStore(s => s.currentScene);

  const isPreview = currentScene === "garage preview" || currentScene === "xperiencemor3 preview";

  useEffect(() => {
    if (!ref.current) return;
    setRef(ref.current);
    ref.current.saveState();
    return () => setRef(null);
  }, [setRef]);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;

    c.minAzimuthAngle = -Infinity;
    c.maxAzimuthAngle = Infinity;

    c.minPolarAngle = Math.PI / 3;
    c.maxPolarAngle = Math.PI / 2;

    c.azimuthRotateSpeed = 1;
    c.polarRotateSpeed = 1;
    c.truckSpeed = 2;
  }, [currentScene]);

  // auto-rotate
  useFrame((_, dt) => {
    const c = ref.current;
    if (!c) return;
    if (autoRotate) {
      c.azimuthAngle += dt * autoRotateSpeed;
      c.update(dt);
    }
  });

  return (
    <DreiCameraControls
      ref={ref as any}
      makeDefault
      smoothTime={0.35}
      draggingSmoothTime={0.35}
      mouseButtons={{
        left: CameraControls.ACTION.ROTATE,
        right: 0,
        middle: CameraControls.ACTION.DOLLY,
        wheel: isPreview ? 0 : CameraControls.ACTION.DOLLY,
      }}
      touches={{
        one: CameraControls.ACTION.TOUCH_ROTATE,
        two: CameraControls.ACTION.TOUCH_DOLLY,
        three: CameraControls.ACTION.TOUCH_TRUCK,
      }}
      minAzimuthAngle={-Infinity}
      maxAzimuthAngle={Infinity}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 2}
      minDistance={isPreview ? 1.5 : 3}
      maxDistance={isPreview ? 4 : 6}
    />
  );
};

export default GlobalCameraController;
