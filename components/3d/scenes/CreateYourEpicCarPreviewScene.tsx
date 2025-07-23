import { useRef } from "react";
import { Group, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { KernelSize } from "postprocessing";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { animated, useSpring } from "@react-spring/three";

import { XM3_container } from "../assets/XM3";
import useDisplay from "@/hooks/useDisplay";
import { SceneProps } from "@/types/scene";

const CreateYourEpicCarPreviewScene = ({ visible }: SceneProps) => {
  const groupRef = useRef<Group>(null);

  const { isDesktop } = useDisplay();

  const { opacity, scale } = useSpring({
    opacity: visible ? 0.2 : 0,
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

      <Environment>
        <Lightformer intensity={1.2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
        <Lightformer intensity={1.2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
        <Lightformer intensity={1.2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
        <Lightformer intensity={1.2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
        <Lightformer intensity={1.2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
        <Lightformer intensity={1.2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
        <Lightformer intensity={1.2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
        <Lightformer intensity={1.2} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
        <Lightformer intensity={1.2} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
      </Environment>

      <EffectComposer multisampling={10}>
        <Bloom kernelSize={KernelSize.HUGE} luminanceThreshold={0} luminanceSmoothing={0.85} intensity={0.5} />
      </EffectComposer>
    </>
  );
};

export default CreateYourEpicCarPreviewScene;
