"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraControls as DreiCameraControls } from "@react-three/drei";
import CameraControls from "camera-controls";

import useDisplay from "@/hooks/useDisplay";
import { useInteractionLayerStore } from "@/store/useInteractionLayerStore";
import { useCameraBus } from "@/store/useCameraBus";
import { useSceneStore } from "@/store/useSceneStore";
import { useGarageStore } from "@/store/useGarageStore";
import { initialGarageCameraTarget } from "@/constants/partsCameraTarget";

const GlobalCameraController = () => {
  const ref = useRef<CameraControls>(null);
  const isInteractingRef = useRef(false);

  const setRef = useCameraBus(s => s.setRef);
  const { autoRotate, autoRotateSpeed } = useCameraBus();
  const { isDesktop } = useDisplay();
  const domElement = useInteractionLayerStore(s => s.domElement);
  const currentScene = useSceneStore(s => s.currentScene);
  const glDom = useThree(state => state.gl.domElement);

  const isPreview = currentScene === "garage preview" || currentScene === "xperiencemor3 preview";

  useLayoutEffect(() => {
    if (!ref.current) return;
    setRef(ref.current);
    ref.current.saveState();
    return () => setRef(null);
  }, [setRef]);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;

    c.azimuthRotateSpeed = 1;
    c.polarRotateSpeed = 1;
    c.truckSpeed = 2;
  }, [currentScene]);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;

    const onStart = () => {
      isInteractingRef.current = true;

      if (currentScene === "garage") {
        const { shouldResetOnFirstInteract, setShouldResetOnFirstInteract } = useGarageStore.getState();

        if (shouldResetOnFirstInteract) {
          const { position, target } = initialGarageCameraTarget;
          c.setLookAt(position[0], position[1], position[2], target[0], target[1], target[2], true);
          c.saveState();
          setShouldResetOnFirstInteract(false);
        }
      }
    };
    const onEnd = () => (isInteractingRef.current = false);

    c.addEventListener("controlstart", onStart);
    c.addEventListener("controlend", onEnd);

    return () => {
      c.removeEventListener("controlstart", onStart);
      c.removeEventListener("controlend", onEnd);
    };
  }, []);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;

    const wantsCustom = isPreview && isDesktop && !!domElement;

    c.disconnect();
    c.connect(wantsCustom ? (domElement as HTMLElement) : glDom);

    let prevTouchAction: string | undefined;
    let prevUserSelect: string | undefined;
    let prevCursor: string | undefined;

    if (wantsCustom && domElement) {
      prevTouchAction = domElement.style.touchAction;
      prevUserSelect = domElement.style.userSelect;
      prevCursor = domElement.style.cursor;

      domElement.style.touchAction = "none";
      domElement.style.userSelect = "none";
      domElement.style.cursor = "grab";
    }

    return () => {
      c.disconnect();
      c.connect(glDom);
      if (wantsCustom && domElement) {
        domElement.style.touchAction = prevTouchAction ?? "";
        domElement.style.userSelect = prevUserSelect ?? "";
        domElement.style.cursor = prevCursor ?? "";
      }
    };
  }, [isPreview, isDesktop, domElement, glDom]);

  // auto-rotate
  useFrame((_, dt) => {
    const c = ref.current;
    if (!c) return;
    if (autoRotate && !isInteractingRef.current) {
      c.rotate(dt * autoRotateSpeed, 0, true);
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
    />
  );
};

export default GlobalCameraController;
