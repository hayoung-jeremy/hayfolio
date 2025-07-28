import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import { XM3_container } from "../assets/XM3";
import EnvironmentSettings from "../EnvironmentSettings";
import useDisplay from "@/hooks/useDisplay";

const GarageScene = () => {
  const { isDesktop } = useDisplay();
  return (
    <Canvas style={{ height: "100svh" }}>
      <CameraControls
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        minDistance={1.5}
        maxDistance={4}
        smoothTime={0.5}
        draggingSmoothTime={0.5}
      />
      <XM3_container />

      <EnvironmentSettings />
    </Canvas>
  );
};

export default GarageScene;
