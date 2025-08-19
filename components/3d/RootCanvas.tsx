import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { DynamicSceneRenderer } from "./scenes";
import { DynamicEnvironmentRenderer } from "./envs";
import { SceneLoader } from "../ui";
import GlobalCameraController from "./GlobalCameraController";
import GlobalVisualDirector from "./GlobalVisualDirector";
import { useInteractionLayerStore } from "@/store/useInteractionLayerStore";

const RootCanvas = () => {
  const eventSource = useInteractionLayerStore(s => s.domElement);

  return (
    <>
      <Canvas
        shadows
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
        eventSource={eventSource ?? undefined}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          alpha: true,
          preserveDrawingBuffer: false,
        }}
      >
        <Suspense fallback={null}>
          <DynamicSceneRenderer />
          <DynamicEnvironmentRenderer />
          <GlobalCameraController />
          <GlobalVisualDirector />
        </Suspense>
      </Canvas>
      <SceneLoader />
    </>
  );
};

export default RootCanvas;
