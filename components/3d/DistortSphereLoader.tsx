"use client";
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { MathUtils } from "three";

type Props = {
  color?: string;
  speed?: number;
  position?: [number, number, number];
  hoverScale?: number;
  baseDistort?: number;
  hoverDistort?: number;
};

const DistortSphereLoader = ({
  color = "#ffffff",
  speed = 5,
  position = [0, 0, 0],
  hoverScale = 1.15,
  baseDistort = 0.25,
  hoverDistort = 0.4,
}: Props) => {
  const ref = useRef<any>(null);
  const meshRef = useRef<any>(null);
  const [hovered, hover] = useState(false);
  const invalidate = useThree(s => s.invalidate);

  useFrame(() => {
    if (!ref.current || !meshRef.current) return;
    ref.current.distort = MathUtils.lerp(
      ref.current.distort,
      hovered ? hoverDistort : baseDistort,
      hovered ? 0.1 : 0.08
    );

    const targetScale = hovered ? hoverScale : 1;
    meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.y = MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
    meshRef.current.scale.z = MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);
    invalidate();
  });
  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, 0, 0]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.5, 64, 64]} />
        <MeshDistortMaterial ref={ref} speed={speed} color={color} clearcoat={1} metalness={0.8} roughness={0.6} />
      </mesh>
    </group>
  );
};

export default DistortSphereLoader;
