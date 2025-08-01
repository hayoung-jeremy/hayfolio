/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export default function QM6_Headlight_Offroad_A(props: any) {
  const { nodes, materials } = useGLTF("/api/model-url?name=QM6/QM6_headlight.glb") as any;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.QM6_Headlight_Offroad_A_1.geometry}
        material={materials.light_darkmetal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.QM6_Headlight_Offroad_A_2.geometry}
        material={materials.light_led}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.QM6_Headlight_Offroad_A_3.geometry}
        material={materials.light_matte}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.QM6_Headlight_Offroad_A_4.geometry}
        material={materials.light_metal}
      />
    </group>
  );
}

useGLTF.preload("/api/model-url?name=QM6/QM6_headlight.glb");
