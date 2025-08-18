import { Suspense, useEffect } from "react";

import { XM3_Container, XM3_Transparent_Container } from "../../assets/XM3";
import { SM6_Container } from "../../assets/SM6";
import { QM6_Container } from "../../assets/QM6";
import { BackgroundContainer } from "../../assets";
import { GarageEnvironments } from "../../envs";
import GarageCameraBridge from "./GarageCameraBridge";
import MuteSceneOverlay from "../MuteSceneOverlay";

import { useGarageStore } from "@/store/useGarageStore";
import { useCameraBus } from "@/store/useCameraBus";

const GarageScene = () => {
  const { cameraTarget, selectedBody, setShouldResetOnFirstInteract } = useGarageStore();
  const { moveTo, setConstraints, setAutoRotate } = useCameraBus();

  const renderContainer = () => {
    switch (selectedBody) {
      case "XM3":
        return <XM3_Container />;
      case "SM6":
        return <SM6_Container />;
      case "QM6":
        return <QM6_Container />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setConstraints({ minDistance: 3, maxDistance: 6, polar: [Math.PI / 3, Math.PI / 2], fov: 65 });
    setAutoRotate(false);
    moveTo([0, 0, 5], [0, 0, 0], true);
  }, [moveTo, setConstraints, setAutoRotate]);

  useEffect(() => {
    setShouldResetOnFirstInteract(true);
  }, [setShouldResetOnFirstInteract]);

  return (
    <>
      <Suspense
        fallback={
          <>
            <XM3_Transparent_Container />
            <MuteSceneOverlay />
          </>
        }
      >
        {renderContainer()}
      </Suspense>
      <GarageEnvironments />
      <BackgroundContainer />
      <GarageCameraBridge />
    </>
  );
};

export default GarageScene;
