/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function QM6_TailLamp_Base(props: any) {
  const { nodes, materials } = useGLTF("/api/model-url?name=QM6/QM6_tailLamp_transparent.glb") as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.QM6_Taillamp_Base_2.geometry}
        material={materials.tail_glass}
        material-color="red"
        material-transparent
        material-opacity={0.1}
        material-metalness={0.6}
        material-roughness={0.1}
      />
    </group>
  );
}

useGLTF.preload("/api/model-url?name=QM6/QM6_tailLamp_transparent.glb");
