import { Canvas } from "@react-three/fiber";
import { Box, CameraControls } from "@react-three/drei";

const Xperiencemor3Scene = () => {
  return (
    <Canvas>
      <CameraControls
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        minDistance={1.5}
        maxDistance={4}
        smoothTime={0.5}
        draggingSmoothTime={0.5}
      />
      <Box />
    </Canvas>
  );
};

export default Xperiencemor3Scene;
