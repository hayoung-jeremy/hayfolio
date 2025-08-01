/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";
import { useGarageStore } from "@/store/useGarageStore";

export default function QM6_Bonnet_Offroad_B({ ...props }: any) {
  const { nodes, materials } = useGLTF("/api/model-url?name=QM6/QM6_bonnet_offroad_B.glb") as any;
  const { selectedColors } = useGarageStore();
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.QM6_Bonnet_Offroad_B_1.geometry}
        material={materials.main}
        material-color={selectedColors.Bonnet}
        material-metalness={0.05}
        material-roughness={0.15}
      />
      <mesh geometry={nodes.QM6_Bonnet_Offroad_B_2.geometry} material={materials.metal} />
      <mesh geometry={nodes.QM6_Bonnet_Offroad_B_3.geometry} material={materials.out_black} />
      <mesh geometry={nodes.QM6_Bonnet_Offroad_B_4.geometry} material={materials.shade} />
    </group>
  );
}
