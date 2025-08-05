import { useRef } from "react";
import { Group, Mesh } from "three";
import { OrbitControls } from "@react-three/drei";

import { XM3_Transparent_Container } from "../../assets/XM3";
import EnvironmentSettings from "./EnvironmentSettings";
import useDisplay from "@/hooks/useDisplay";

const CreateYourEpicCarPreviewScene = () => {
  const groupRef = useRef<Group>(null);

  const { isDesktop } = useDisplay();

  return (
    <>
      <group ref={groupRef}>
        <XM3_Transparent_Container />
      </group>

      <>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={isDesktop ? 0.5 : 0.8}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />

        <EnvironmentSettings />
      </>
    </>
  );
};

export default CreateYourEpicCarPreviewScene;
