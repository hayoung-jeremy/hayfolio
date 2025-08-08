import { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/types/3d-model";
import { useGLTFWithDispose } from "@/hooks/useGLTFWithDispose";

export default function DecoPedal(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTFWithDispose(
    "/api/model-url?name=xperiencemor3/deco_pedal.glb?1"
  ) as unknown as GLTFResult;
  return (
    <group {...props}>
      <mesh
        geometry={nodes.PEDAL.geometry}
        material={materials["1"]}
        material-transparent
        material-opacity={0.05}
        material-metalness={0.8}
        material-roughness={0.3}
      />
    </group>
  );
}

useGLTF.preload("/api/model-url?name=xperiencemor3/deco_pedal.glb?1");
