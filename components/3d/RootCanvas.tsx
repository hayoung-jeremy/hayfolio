import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { DynamicSceneRenderer } from "./scenes";
import { DynamicEnvironmentRenderer } from "./envs";
import { SceneLoader } from "../ui";
import GlobalCameraController from "./GlobalCameraController";
import { useInteractionLayerStore } from "@/store/useInteractionLayerStore";

const RootCanvas = () => {
  const eventSource = useInteractionLayerStore(s => s.domElement);

  return (
    <>
      <Canvas
        shadows
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 65 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
        frameloop="demand"
        eventSource={eventSource ?? undefined}
      >
        <Suspense fallback={null}>
          <DynamicSceneRenderer />
          <DynamicEnvironmentRenderer />
          <GlobalCameraController />
        </Suspense>
      </Canvas>
      <SceneLoader />
    </>
  );
};

export default RootCanvas;
