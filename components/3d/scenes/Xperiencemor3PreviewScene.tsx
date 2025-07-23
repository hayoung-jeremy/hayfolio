import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import { Group, Mesh } from "three";
import { useSpring, animated } from "@react-spring/three";

import { SceneProps } from "@/types/scene";

const Xperiencemor3PreviewScene = ({ visible }: SceneProps) => {
  const groupRef = useRef<Group>(null);

  const { opacity, scale } = useSpring({
    opacity: visible ? 0.3 : 0,
    scale: visible ? 1 : 0.85,
    config: { tension: 180, friction: 26 },
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
    <animated.group ref={groupRef} scale={scale}>
      <Box />
    </animated.group>
  );
};

export default Xperiencemor3PreviewScene;
