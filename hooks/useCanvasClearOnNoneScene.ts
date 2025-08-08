import { useThree, useFrame } from "@react-three/fiber";
import { useSceneStore } from "@/store/useSceneStore";

const useCanvasClearOnNoneScene = () => {
  const { gl } = useThree();
  const { currentScene } = useSceneStore();

  useFrame(() => {
    if (currentScene === "none") {
      gl.autoClear = true;
      gl.clear();
    }
  });
};

export default useCanvasClearOnNoneScene;
