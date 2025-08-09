import { Suspense } from "react";
import { CameraControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { CylinderGrid } from "../../assets/xperiencemor3";
import DecoModelsContainer from "./DecoModelsContainer";
import MainModelsContainer from "./MainModelsContainer";

const Xperiencemor3Scene = () => {
  return (
    <Suspense fallback={null}>
      <DecoModelsContainer />
      <MainModelsContainer />

      <CylinderGrid />
      <CameraControls minDistance={1.5} maxDistance={4} smoothTime={0.5} draggingSmoothTime={0.5} />
      <Perf position="top-right" />
    </Suspense>
  );
};

export default Xperiencemor3Scene;
