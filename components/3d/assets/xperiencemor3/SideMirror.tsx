import { JSX } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTFResult } from "@/types/3d-model";
import { useGLTFWithDispose } from "@/hooks/useGLTFWithDispose";

export default function SideMirror({ ...rest }: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTFWithDispose("/assets/models/side_mirror.glb") as unknown as GLTFResult;
  return (
    <group {...rest} dispose={null}>
      <mesh
        geometry={nodes.MIRROR.geometry}
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

useGLTF.preload("/assets/models/side_mirror.glb");
