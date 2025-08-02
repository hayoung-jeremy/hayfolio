import { Environment, Lightformer, MeshReflectorMaterial } from "@react-three/drei";
import { KernelSize } from "postprocessing";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const EnvironmentSettings = () => {
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
      <fog attach="fog" args={["#111111", 8, 30]} />
      <color attach="background" args={["#111111"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.02, 0]} receiveShadow>
        <circleGeometry args={[50, 128]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          depthScale={1}
          minDepthThreshold={1.000001}
          color="#151515"
          metalness={0.6}
          roughness={1}
          reflectorOffset={0}
        />
      </mesh>
    </>
  );
};

export default EnvironmentSettings;
