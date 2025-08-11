import { useEffect } from "react";

import { CylinderGrid } from "../../assets/xperiencemor3";
import DecoModelsContainer from "./DecoModelsContainer";
import MainModelsContainer from "./MainModelsContainer";
import { useCameraBus } from "@/store/useCameraBus";

const Xperiencemor3Scene = () => {
  const { moveTo, setConstraints, setAutoRotate } = useCameraBus();

  useEffect(() => {
    setConstraints({ minDistance: 1.5, maxDistance: 4, fov: 65 });
    setAutoRotate(false);
    moveTo([0, 0, 5], [0, 0, 0], true);
  }, [moveTo, setConstraints, setAutoRotate]);
  return (
    <>
      <DecoModelsContainer />
      <MainModelsContainer />

      <CylinderGrid />
    </>
  );
};

export default Xperiencemor3Scene;
