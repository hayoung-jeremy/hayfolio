import { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/types/3d-model";
import { useGLTFWithDispose } from "@/hooks/useGLTFWithDispose";

export default function Text_ETECH({ ...rest }: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTFWithDispose(
    "/api/model-url?name=xperiencemor3/text_etech.glb"
  ) as unknown as GLTFResult;
  return (
    <group {...rest} dispose={null}>
      <mesh
        geometry={nodes.XM3_etech.geometry}
        material={materials["1"]}
        rotation={[0, 1.571, 0]}
        scale={0.01}
        material-transparent
        // material-opacity={isSelected ? 1 : 0.05}
        material-metalness={0.8}
        material-roughness={0.2}
        material-color="#afbdcf"
      />
    </group>
  );
}

useGLTF.preload("/api/model-url?name=xperiencemor3/text_etech.glb");
