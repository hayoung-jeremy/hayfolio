import { Canvas } from "@react-three/fiber";
import { Box, CameraControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Xperiencemor3Environments } from "../../envs";
import { CylinderGrid } from "../../assets/xperiencemor3";

const Xperiencemor3Scene = () => {
  return (
    <Canvas>
      <CameraControls minDistance={1.5} maxDistance={4} smoothTime={0.5} draggingSmoothTime={0.5} />
      <Box />
      <Perf position="top-right" />
      <CylinderGrid />
      <Xperiencemor3Environments />
    </Canvas>
  );
};

export default Xperiencemor3Scene;
