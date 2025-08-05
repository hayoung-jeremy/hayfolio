import { Canvas } from "@react-three/fiber";
import { Box, CameraControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import SceneEnvironment from "./SceneEnvironment";

const Xperiencemor3Scene = () => {
  return (
    <Canvas>
      <CameraControls minDistance={1.5} maxDistance={4} smoothTime={0.5} draggingSmoothTime={0.5} />
      <Box />
      <Perf position="top-right" />
      <SceneEnvironment />
    </Canvas>
  );
};

export default Xperiencemor3Scene;
