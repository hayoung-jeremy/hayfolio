import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { MathUtils } from "three";

const DistortSphereLoader = () => {
  const ref = useRef<any>(null);
  const meshRef = useRef<any>(null);
  const [hovered, hover] = useState(false);

  useFrame(() => {
    if (!ref.current || !meshRef.current) return;
    ref.current.distort = MathUtils.lerp(ref.current.distort, hovered ? 0.4 : 0.25, hovered ? 0.05 : 0.01);

    const targetScale = hovered ? 1.15 : 1;
    meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.y = MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
    meshRef.current.scale.z = MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);
  });
  return (
    <group position={[0, 0, -2]}>
      <mesh ref={meshRef} position={[0, 0, 0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <MeshDistortMaterial ref={ref} speed={5} clearcoat={1} metalness={0.2} roughness={0.6} />
      </mesh>
    </group>
  );
};

export default DistortSphereLoader;
