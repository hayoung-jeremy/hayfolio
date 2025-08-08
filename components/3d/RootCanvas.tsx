import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { SceneLoader } from "../ui";
import { DynamicSceneRenderer } from "./scenes";
import { DynamicEnvironmentRenderer } from "./envs";

const RootCanvas = () => {
  return (
    <>
      <Canvas
        shadows
        gl={{ antialias: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <Suspense fallback={<SceneLoader />}>
          <DynamicSceneRenderer />
          <DynamicEnvironmentRenderer />
        </Suspense>
      </Canvas>
    </>
  );
};

export default RootCanvas;
