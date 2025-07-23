import CanvasWrapper from "../CanvasWrapper";
import CreateYourEpicCarPreviewScene from "./CreateYourEpicCarPreviewScene";

const ScenesContainer = () => {
  return (
    <div className="ScenesContainer opacity-0 h-[300vh] relative z-10">
      <div className="sticky top-0 h-screen">
        <CanvasWrapper>
          <CreateYourEpicCarPreviewScene />
        </CanvasWrapper>
      </div>
    </div>
  );
};

export default ScenesContainer;
