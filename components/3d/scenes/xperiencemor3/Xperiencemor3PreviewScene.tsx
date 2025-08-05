import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { Group, Mesh } from "three";

import SceneEnvironment from "./SceneEnvironment";

const Xperiencemor3PreviewScene = () => {
  const groupRef = useRef<Group>(null);

  return (
    <group ref={groupRef}>
      <Box />
      <SceneEnvironment />
    </group>
  );
};

export default Xperiencemor3PreviewScene;
