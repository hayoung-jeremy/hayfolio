import { useLayoutEffect } from "react";

import { useCameraBus } from "@/store/useCameraBus";
import { useSceneStore } from "@/store/useSceneStore";

const PreviewSceneEnvironments = () => {
  const { moveTo, setConstraints, setAutoRotate } = useCameraBus();
  const currentScene = useSceneStore(s => s.currentScene);

  const shouldAutoRotate =
    currentScene === "garage preview" ||
    currentScene === "xperiencemor3 preview" ||
    currentScene === "clarins preview" ||
    currentScene === "ai preview";

  useLayoutEffect(() => {
    setConstraints({ minDistance: 1.5, maxDistance: 4.5, polar: [Math.PI / 3, Math.PI / 2], fov: 65 });
    setAutoRotate(shouldAutoRotate, shouldAutoRotate ? 0.3 : 0);

    moveTo([0, 0, 5.0], [0, 0, 0], true);
    return () => setAutoRotate(false);
  }, [moveTo, setConstraints, setAutoRotate, shouldAutoRotate]);

  return <fog attach="fog" args={["#0a0a0a", 1, 20]} />;
};

export default PreviewSceneEnvironments;
