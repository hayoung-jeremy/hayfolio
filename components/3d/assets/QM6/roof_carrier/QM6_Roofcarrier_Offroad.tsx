/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Model({ ...props }: any) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("/api/model-url?name=QM6/QM6_roofcarrier_offroad.glb") as any;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.QM6_Roofcarrier_Offroad_1.geometry} material={materials.light_led} />
      <mesh geometry={nodes.QM6_Roofcarrier_Offroad_2.geometry} material={materials.Silver} />
      <mesh geometry={nodes.QM6_Roofcarrier_Offroad_3.geometry} material={materials.metal_matt} />
      <mesh
        geometry={nodes.QM6_Roofcarrier_Offroad_4.geometry}
        material={materials.out_black}
        material-metalness={0.4}
        material-roughness={0.15}
      />
      <mesh geometry={nodes.QM6_Roofcarrier_Offroad_5.geometry} material={materials.tire_rubber} />
    </group>
  );
}
