import CanvasWrapper from "../CanvasWrapper";
import CreateYourEpicCarPreviewScene from "./CreateYourEpicCarPreviewScene";

const ScenesContainer = () => {
  return (
    <div className="ScenesContainer opacity-0 z-10">
      <CanvasWrapper>
        <CreateYourEpicCarPreviewScene />
      </CanvasWrapper>
    </div>
  );
};

export default ScenesContainer;
