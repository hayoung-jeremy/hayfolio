import { HexColorPicker } from "react-colorful";
import { useGarageStore } from "@/store/useGarageStore";

const ColorPicker = () => {
  const { selectedColor, setSelectedColor, setColorPickerOpen, setPartPanelOpen } = useGarageStore();

  return (
    <>
      <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
      <div className="flex items-center justify-center w-full gap-5 mt-5">
        <button
          onClick={() => {
            setColorPickerOpen(false);
            setPartPanelOpen(true);
          }}
          className="flex-1 w-12 h-12 rounded-lg border border-white/20 xl:bg-black/70 cursor-pointer"
        >
          닫기
        </button>
        <button className="flex-1 w-12 h-12 rounded-lg border border-white/20 xl:bg-black/70 cursor-pointer">
          전체에 적용
        </button>
      </div>
    </>
  );
};

export default ColorPicker;
