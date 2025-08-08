import { JSX, useEffect, useState } from "react";

import { useSceneStore } from "@/store/useSceneStore";
import { CreateYourEpicCarPreviewScene, GarageScene } from "./garage";
import { Xperiencemor3PreviewScene, Xperiencemor3Scene } from "./xperiencemor3";
import SceneFadeWrapper from "./SceneFadeWrapper";

const DynamicSceneRenderer = () => {
  const { currentScene } = useSceneStore();
  const [mountedScene, setMountedScene] = useState<JSX.Element | null>(null);

  useEffect(() => {
    let scene: JSX.Element | null = null;
    switch (currentScene) {
      case "garage preview":
        scene = <CreateYourEpicCarPreviewScene />;
        break;
      case "xperiencemor3 preview":
        scene = <Xperiencemor3PreviewScene />;
        break;
      case "garage":
        scene = <GarageScene />;
        break;
      case "xperiencemor3":
        scene = <Xperiencemor3Scene />;
        break;
      case "none":
      default:
        scene = null;
    }

    setMountedScene(scene ? <SceneFadeWrapper>{scene}</SceneFadeWrapper> : null);
  }, [currentScene]);

  return <group>{mountedScene}</group>;
};

export default DynamicSceneRenderer;
