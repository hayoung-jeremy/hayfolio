import { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/types/3d-model";
import { useGLTFWithDispose } from "@/hooks/useGLTFWithDispose";

export default function DecoTire_0(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTFWithDispose(
    "/api/model-url?name=xperiencemor3/deco_tire_0.glb?1"
  ) as unknown as GLTFResult;
  return (
    <group {...props}>
      <mesh
        geometry={nodes.TIRE0.geometry}
        material={materials["1"]}
        material-transparent
        material-opacity={0.05}
        material-metalness={0.8}
        material-roughness={0.3}
      />
    </group>
  );
}

useGLTF.preload("/api/model-url?name=xperiencemor3/deco_tire_0.glb?1");
