import { useLayoutEffect } from "react";
import { Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import { useCameraBus } from "@/store/useCameraBus";

const PreviewSceneEnvironments = () => {
  const { moveTo, setConstraints, setAutoRotate } = useCameraBus();

  useLayoutEffect(() => {
    setConstraints({ minDistance: 1.5, maxDistance: 4.5, polar: [Math.PI / 3, Math.PI / 2], fov: 65 });
    setAutoRotate(true, 0.3);
    moveTo([0, 0, 5.0], [0, 0, 0], true);
    return () => setAutoRotate(false);
  }, [moveTo, setConstraints, setAutoRotate]);

  return (
    <>
      <fog attach="fog" args={["#0a0a0a", 1, 20]} />

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
