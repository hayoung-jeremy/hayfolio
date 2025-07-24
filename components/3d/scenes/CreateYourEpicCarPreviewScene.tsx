import { useRef } from "react";
import { Group, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { animated, useSpring, config } from "@react-spring/three";

import { XM3_container } from "../assets/XM3";
import EnvironmentSettings from "../EnvironmentSettings";
import useDisplay from "@/hooks/useDisplay";
import { SceneProps } from "@/types/scene";

const CreateYourEpicCarPreviewScene = ({ visible }: SceneProps) => {
  const groupRef = useRef<Group>(null);

  const { isDesktop } = useDisplay();

  const { opacity, scale } = useSpring({
    opacity: visible ? 0.2 : 0,
    scale: visible ? 1 : 0.85,
    config: config.gentle,
  });

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.traverse(child => {
      if ("material" in child) {
        const mesh = child as Mesh;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

        materials.forEach(mat => {
          mat.transparent = true;
          mat.opacity = opacity.get();
        });
      }
    });
  });

  if (!visible && opacity.get() < 0.01) return null;

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={isDesktop ? 0.5 : 0.8}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      <animated.group ref={groupRef} scale={scale}>
        <XM3_container />
      </animated.group>

      <EnvironmentSettings />
    </>
  );
};

export default CreateYourEpicCarPreviewScene;
