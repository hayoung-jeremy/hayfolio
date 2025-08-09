import { Suspense } from "react";

import { XM3_Container } from "../../assets/XM3";
import { SM6_Container } from "../../assets/SM6";
import { QM6_Container } from "../../assets/QM6";
import { BackgroundContainer } from "../../assets";
import { GarageEnvironments } from "../../envs";
import GarageSceneCameraController from "./GarageSceneCameraController";
import { useGarageStore } from "@/store/useGarageStore";

const GarageScene = () => {
  const { selectedBody } = useGarageStore();

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

  return (
    <>
      <Suspense fallback={null}>
        {renderContainer()}
        <GarageSceneCameraController />
        <GarageEnvironments />
        <BackgroundContainer />
      </Suspense>
    </>
  );
};

export default GarageScene;
