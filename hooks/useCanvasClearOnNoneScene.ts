"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useSceneStore } from "@/store/useSceneStore";

const useCanvasClearOnNoneScene = () => {
  const { gl } = useThree();
  const { currentScene } = useSceneStore();
  const lastSceneRef = useRef<string | null>(null);

  useEffect(() => {
    if (lastSceneRef.current !== currentScene) {
      gl.autoClear = true;
      lastSceneRef.current = currentScene;
    }
  }, [currentScene, gl]);
};

export default useCanvasClearOnNoneScene;
