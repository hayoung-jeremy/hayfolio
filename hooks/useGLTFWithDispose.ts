import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { disposeGLTF } from "@/utils/garage";

export const useGLTFWithDispose = <T = GLTF>(url: string): T => {
  const gltf = useGLTF(url) as T;

  useEffect(() => {
    return () => {
      disposeGLTF(gltf);
    };
  }, [gltf]);

  return gltf;
};
