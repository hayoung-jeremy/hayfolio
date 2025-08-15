import { JSX } from "react";

import { CreateYourEpicCarPreviewScene, GarageScene } from "./garage";
import { Xperiencemor3PreviewScene, Xperiencemor3Scene } from "./xperiencemor3";
import SceneFadeWrapper from "./SceneFadeWrapper";
import DistortSphereLoader from "../DistortSphereLoader";
import useCanvasClearOnNoneScene from "@/hooks/useCanvasClearOnNoneScene";
import { useSceneStore } from "@/store/useSceneStore";

const DynamicSceneRenderer = () => {
  const { currentScene } = useSceneStore();
  useCanvasClearOnNoneScene();

  let scene: JSX.Element | null = null;

  switch (currentScene) {
    case "garage preview":
      scene = (
        <SceneFadeWrapper>
          <CreateYourEpicCarPreviewScene />
        </SceneFadeWrapper>
      );
      break;

    case "xperiencemor3 preview":
      scene = (
        <SceneFadeWrapper>
          <Xperiencemor3PreviewScene />
        </SceneFadeWrapper>
      );
      break;

    case "garage":
      scene = (
        <SceneFadeWrapper>
          <GarageScene />
        </SceneFadeWrapper>
      );
      break;

    case "xperiencemor3":
      scene = (
        <SceneFadeWrapper>
          <Xperiencemor3Scene />
        </SceneFadeWrapper>
      );
      break;

    case "clarins preview":
    case "ai preview":
      scene = (
        <SceneFadeWrapper>
          <DistortSphereLoader />
        </SceneFadeWrapper>
      );
      break;

    case "none":
    default:
      scene = null;
  }

  return scene;
};

export default DynamicSceneRenderer;
