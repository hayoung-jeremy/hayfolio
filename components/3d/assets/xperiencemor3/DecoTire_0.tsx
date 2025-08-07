import { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { useGLTFWithDispose } from "@/hooks/useGLTFWithDispose";

export default function DecoTire_0(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTFWithDispose("/assets/models/deco_tire_0.glb") as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.TIRE0.geometry}
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

useGLTF.preload("/assets/models/deco_tire_0.glb");
