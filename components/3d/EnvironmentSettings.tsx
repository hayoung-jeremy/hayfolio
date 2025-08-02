import { ContactShadows, Environment, Lightformer, SoftShadows } from "@react-three/drei";
import { KernelSize } from "postprocessing";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { Group } from "three";

const EnvironmentSettings = () => {
  const lightRef = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!lightRef.current) return;

    // console.log("Updating light position based on pointer movement");
    easing.dampE(
      lightRef.current.rotation,
      [(state.pointer.y * Math.PI) / 50, (state.pointer.x * Math.PI) / 20, 0],
      0.2,
      delta
    );
  });
  return (
    <>
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
      <fog attach="fog" args={["#1f1d24", 8, 30]} />
      <color attach="background" args={["#1f1d24"]} />
      <SoftShadows />

      <group ref={lightRef}>
        <directionalLight
          position={[5, 5, -8]}
          castShadow
          intensity={0.1}
          shadow-mapSize={2048}
          shadow-bias={-0.001}
        ></directionalLight>
      </group>

      <ContactShadows
        opacity={1}
        position={[0, -1.02, 0]}
        scale={10}
        blur={1}
        far={10}
        resolution={256}
        color="#000000"
      />
    </>
  );
};

export default EnvironmentSettings;
