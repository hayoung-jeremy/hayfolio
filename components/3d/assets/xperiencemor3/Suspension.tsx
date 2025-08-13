import { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/types/3d-model";
import { useGLTFWithDispose } from "@/hooks/useGLTFWithDispose";

export default function Suspension({ ...rest }: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTFWithDispose(
    "/api/model-url?name=xperiencemor3/suspension.glb?1"
  ) as unknown as GLTFResult;
  return (
    <group {...rest}>
      <mesh
        geometry={nodes.SUSPENSION.geometry}
        material={materials["1"]}
        material-transparent
        // material-opacity={isSelected ? 1 : 0.05}
        material-metalness={1}
        material-roughness={0.2}
        material-color="#afbdcf"
        material-envMapIntensity={0.5}
      />
    </group>
  );
}

// useGLTF.preload("/api/model-url?name=xperiencemor3/suspension.glb?1");
