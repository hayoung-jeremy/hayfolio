import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

/**
 * 모델 로딩 상태를 반환하는 커스텀 훅
 * - progress가 100%일 때 isModelLoaded = true (300ms 지연 포함)
 */
const useModelLoadProgress = (delay: number = 300): boolean => {
  const { progress } = useProgress();
  const [isModelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => setModelLoaded(true), delay);
      return () => clearTimeout(timeout);
    }
  }, [progress, delay]);

  return isModelLoaded;
};

export default useModelLoadProgress;
