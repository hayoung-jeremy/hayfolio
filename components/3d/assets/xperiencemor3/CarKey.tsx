import { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/types/3d-model";
import { useGLTFWithDispose } from "@/hooks/useGLTFWithDispose";

export default function CarKey({ ...rest }: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTFWithDispose(
    "/api/model-url?name=xperiencemor3/carkey.glb"
  ) as unknown as GLTFResult;
  return (
    <group {...rest}>
      <mesh
        geometry={nodes.LJL_Key_PH1_Domestic.geometry}
        material={materials["1"]}
        material-transparent
        // material-opacity={isSelected ? 1 : 0.05}
        material-metalness={1}
        material-roughness={0.2}
        material-color="#afbdcf"
      />
      <mesh
        geometry={nodes.LJL_Key_PH1_Domestic_1.geometry}
        material={materials["1"]}
        material-transparent
        // material-opacity={isSelected ? 1 : 0.05}
        material-metalness={1}
        material-roughness={0.2}
        material-color="#afbdcf"
      />
    </group>
  );
}

useGLTF.preload("/api/model-url?name=xperiencemor3/carkey.glb");
