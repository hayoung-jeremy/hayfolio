import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";

import { XM3_Container } from "../../assets/XM3";
import { SM6_Container } from "../../assets/SM6";
import { QM6_Container } from "../../assets/QM6";
import { BackgroundContainer } from "../../assets";
import { GarageEnvironments } from "../../envs";
import GarageSceneCameraController from "./GarageSceneCameraController";
import { useGarageStore } from "@/store/useGarageStore";
import useDisplay from "@/hooks/useDisplay";

const GarageScene = () => {
  const [heightPx, setHeightPx] = useState(0);
  const { selectedBody, isPartPanelOpen, isColorPickerOpen } = useGarageStore();
  const { isDesktop } = useDisplay();

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
    const updateHeight = () => {
      const vh = window.innerHeight;
      const newHeight = isDesktop ? vh : isPartPanelOpen || isColorPickerOpen ? vh * 0.7 : vh;
      setHeightPx(newHeight);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [isDesktop, isPartPanelOpen, isColorPickerOpen]);
  return (
    <div
      className="w-full transition-[height] duration-500 ease-in-out"
      style={{ height: `${heightPx}px`, overflow: "hidden" }}
    >
      <Canvas
        style={{ height: "100%", width: "100%" }}
        resize={{ debounce: 0 }}
        camera={{
          fov: 60,
          position: [0, 0, 5],
          near: 0.1,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>{renderContainer()}</Suspense>
        <GarageSceneCameraController />
        <GarageEnvironments />
        <BackgroundContainer />
        {/* <Perf position="top-left" /> */}
      </Canvas>
    </div>
  );
};

export default GarageScene;
