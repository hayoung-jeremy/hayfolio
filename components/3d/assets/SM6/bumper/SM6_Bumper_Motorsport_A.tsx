/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useGarageStore } from "@/store/useGarageStore";

export default function SM6_Bumper_Motorsport_A({ ...props }: any) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("/api/model-url?name=SM6/SM6_bumper_motorsport_A.glb") as any;
  const { selectedColors } = useGarageStore();
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.SM6_Bumper_Motorsport_A_1.geometry} material={materials.Silver} />
      <mesh geometry={nodes.SM6_Bumper_Motorsport_A_2.geometry} material={materials.chrome_black} />
      <mesh geometry={nodes.SM6_Bumper_Motorsport_A_3.geometry} material={materials.light_led} />
      <mesh
        geometry={nodes.SM6_Bumper_Motorsport_A_4.geometry}
        material={materials.main}
        material-color={selectedColors.Bumper}
        material-metalness={0.05}
        material-roughness={0.15}
      />
      <mesh geometry={nodes.SM6_Bumper_Motorsport_A_5.geometry} material={materials.metal} />
      <mesh geometry={nodes.SM6_Bumper_Motorsport_A_6.geometry} material={materials.metal_matt} />
      <mesh geometry={nodes.SM6_Bumper_Motorsport_A_7.geometry} material={materials.out_black} />
      <mesh geometry={nodes.SM6_Bumper_Motorsport_A_8.geometry} material={materials.plastic_gloss} />
      <mesh geometry={nodes.SM6_Bumper_Motorsport_A_9.geometry} material={materials.shade} />
      <mesh geometry={nodes.SM6_Bumper_Motorsport_A_10.geometry} material={materials.white} />
    </group>
  );
}
