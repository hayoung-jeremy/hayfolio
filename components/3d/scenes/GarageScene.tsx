import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import EnvironmentSettings from "../EnvironmentSettings";
import { XM3_Container } from "../assets/XM3";
import { QM6_Container } from "../assets/QM6";
import { SM6_Container } from "../assets/SM6";
import { useGarageStore } from "@/store/useGarageStore";

const GarageScene = () => {
  const { selectedBody } = useGarageStore();

  const renderContainer = () => {
    switch (selectedBody) {
      case "XM3":
        return <XM3_Container />;
      case "SM6":
        return <SM6_Container />;
      case "QM6":
        return <QM6_Container />;
      default:
        return null;
    }
  };
  return (
    <Canvas style={{ height: "100svh" }}>
      {renderContainer()}
      <CameraControls
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
        minDistance={1.5}
        maxDistance={4}
        smoothTime={0.5}
        draggingSmoothTime={0.5}
      />
      <EnvironmentSettings />
    </Canvas>
  );
};

export default GarageScene;
