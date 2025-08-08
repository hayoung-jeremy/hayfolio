import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import useDisplay from "@/hooks/useDisplay";
import { useInteractionLayerStore } from "@/store/useInteractionLayerStore";

const PreviewSceneEnvironments = () => {
  const { isDesktop } = useDisplay();
  const domElement = useInteractionLayerStore(s => s.domElement);

  return (
    <>
      <fog attach="fog" args={["#0a0a0a", 1, 20]} />
      {domElement && (
        <OrbitControls
          domElement={isDesktop ? domElement : undefined}
          enableZoom={false}
          enablePan={isDesktop}
          enableRotate={isDesktop}
          autoRotate
          autoRotateSpeed={isDesktop ? 0.5 : 0.8}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      )}

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

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.55} intensity={0.8} radius={0.2} />
      </EffectComposer>
    </>
  );
};

export default PreviewSceneEnvironments;
