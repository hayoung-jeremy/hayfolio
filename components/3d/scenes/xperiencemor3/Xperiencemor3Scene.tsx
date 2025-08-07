import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { Xperiencemor3Environments } from "../../envs";
import { CylinderGrid } from "../../assets/xperiencemor3";
import DecoModelsContainer from "./DecoModelsContainer";
import MainModelsContainer from "./MainModelsContainer";

const Xperiencemor3Scene = () => {
  return (
    <Canvas camera={{ fov: 60 }}>
      <Suspense>
        <DecoModelsContainer />
        <MainModelsContainer />

        <CylinderGrid />
        <CameraControls minDistance={1.5} maxDistance={4} smoothTime={0.5} draggingSmoothTime={0.5} />
        <Xperiencemor3Environments />
        <Perf position="top-right" />
      </Suspense>
    </Canvas>
  );
};

export default Xperiencemor3Scene;
