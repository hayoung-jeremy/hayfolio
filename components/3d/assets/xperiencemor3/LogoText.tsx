import { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/types/3d-model";
import { useGLTFWithDispose } from "@/hooks/useGLTFWithDispose";

export default function LogoText({ ...rest }: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTFWithDispose("/assets/models/logo_text.glb") as unknown as GLTFResult;
  return (
    <group {...rest} dispose={null}>
      <mesh
        geometry={nodes.XM3.geometry}
        material={materials["1"]}
        scale={4.8}
        material-transparent
        // material-opacity={isSelected ? 1 : 0.05}
        material-metalness={1}
        material-roughness={0.2}
        material-color="#afbdcf"
      />
    </group>
  );
}

useGLTF.preload("/assets/models/logo_text.glb");
