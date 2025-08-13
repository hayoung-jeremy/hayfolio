import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";

import { DynamicSceneRenderer } from "./scenes";
import { DynamicEnvironmentRenderer } from "./envs";
import { SceneLoader } from "../ui";
import GlobalCameraController from "./GlobalCameraController";

const RootCanvas = () => {
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
      >
        <Suspense
          fallback={
            <Html
              fullscreen
              wrapperClass="z-[9999]"
              transform={false}
              center={true}
              style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100dvh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0a0a0a",
                zIndex: 9999,
                WebkitOverflowScrolling: "touch",
              }}
              zIndexRange={[100, 0]}
            >
              <SceneLoader />
            </Html>
          }
        >
          <DynamicSceneRenderer />
          <DynamicEnvironmentRenderer />
          <GlobalCameraController />
        </Suspense>
      </Canvas>
    </>
  );
};

export default RootCanvas;
