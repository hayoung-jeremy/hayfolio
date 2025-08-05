import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { CylinderGrid } from "../../assets/xperiencemor3";

const SceneEnvironment = () => {
  return (
    <>
      <fog attach="fog" args={["#0a0a0a", 1, 20]} />

      <Environment resolution={1024} files="/assets/studio_small_02_4k.hdr" near={0.8} far={1000}>
        <group rotation={[0, 0, 1]}>
          <Lightformer form="circle" intensity={0.6} scale={20} onUpdate={self => self.lookAt(0, 0, 0)} />
          <Lightformer
            color="#536677"
            intensity={1.2}
            onUpdate={self => self.lookAt(0, 0, 0)}
            position={[-5, 1, -4]}
            rotation-y={Math.PI / 2}
            scale={[50, 10, 1]}
          />
          <Lightformer
            intensity={0.1}
            onUpdate={self => self.lookAt(0, 0, 0)}
            position={[10, 1, 0]}
            rotation-y={-Math.PI / 2}
            scale={[50, 10, 1]}
          />
          <Lightformer
            color="#7e7e7e"
            intensity={0.2}
            onUpdate={self => self.lookAt(0, 0, 0)}
            position={[0, 1, 0]}
            scale={[10, 100, 1]}
          />
        </group>
      </Environment>

      <EffectComposer>
        <Bloom
          mipmapBlur
          luminanceThreshold={1}
          luminanceSmoothing={0.55}
          intensity={0.8}
          // @ts-ignore
          radius={0.2}
        />
      </EffectComposer>
      <CylinderGrid />
    </>
  );
};

export default SceneEnvironment;
