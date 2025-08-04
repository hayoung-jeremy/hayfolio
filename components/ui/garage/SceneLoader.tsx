import { useProgress } from "@react-three/drei";

const SceneLoader = () => {
  const { progress } = useProgress();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white/40 font-medium text-xl xl:text-4xl">
      Loading... {Math.floor(progress >= 99 ? 99 : progress)}%
    </div>
  );
};

export default SceneLoader;
