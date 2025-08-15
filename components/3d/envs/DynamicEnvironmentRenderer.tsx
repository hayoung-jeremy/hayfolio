import PreviewSceneEnvironments from "./PreviewSceneEnvironments";
import GarageEnvironments from "./GarageEnvironments";
import Xperiencemor3Environments from "./Xperiencemor3Environments";
import { useSceneStore } from "@/store/useSceneStore";

const DynamicEnvironmentRenderer = () => {
  const { currentScene } = useSceneStore();

  switch (currentScene) {
    case "garage preview":
    case "xperiencemor3 preview":
    case "clarins preview":
    case "ai preview":
      return <PreviewSceneEnvironments />;
    case "garage":
      return <GarageEnvironments />;
    case "xperiencemor3":
      return <Xperiencemor3Environments />;
    default:
      return null;
  }
};

export default DynamicEnvironmentRenderer;
