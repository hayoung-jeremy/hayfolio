import { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/types/3d-model";
import { useGLTFWithDispose } from "@/hooks/useGLTFWithDispose";

export default function DecoPedal(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTFWithDispose("/assets/models/deco_pedal.glb") as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.PEDAL.geometry}
        material={materials["1"]}
        material-transparent
        material-opacity={0.05}
        material-metalness={0.8}
        material-roughness={0.3}
        material-wireframe={true}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/deco_pedal.glb");
