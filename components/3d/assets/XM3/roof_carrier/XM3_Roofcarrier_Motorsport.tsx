/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";
import { useGarageStore } from "@/store/useGarageStore";

export default function XM3_Roofcarrier_Motorsport(props: any) {
  const { nodes, materials } = useGLTF("/api/model-url?name=XM3/XM3_roofcarrier.glb") as any;
  const { selectedColors } = useGarageStore();
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.XM3_Roofcarrier_Motorsport_1.geometry}
        material={materials.main}
        material-color={selectedColors.Body}
        material-metalness={0.4}
        material-roughness={0.15}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.XM3_Roofcarrier_Motorsport_2.geometry}
        material={materials.out_black}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.XM3_Roofcarrier_Motorsport_3.geometry}
        material={materials.plastic_gloss}
      />
    </group>
  );
}

useGLTF.preload("/api/model-url?name=XM3/XM3_roofcarrier.glb");
