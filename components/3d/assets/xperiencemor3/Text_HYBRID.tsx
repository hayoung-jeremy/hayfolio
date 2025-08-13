import { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/types/3d-model";
import { useGLTFWithDispose } from "@/hooks/useGLTFWithDispose";

export default function Text_HYBRID(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTFWithDispose(
    "/api/model-url?name=xperiencemor3/text_hybrid.glb?1"
  ) as unknown as GLTFResult;
  return (
    <group {...props}>
      <mesh
        geometry={nodes.XM3_hybrid.geometry}
        material={materials["1"]}
        rotation={[0, 1.571, 0]}
        scale={0.01}
        material-transparent
        material-opacity={0.05}
        material-metalness={0.8}
        material-roughness={0.3}
      />
    </group>
  );
}
