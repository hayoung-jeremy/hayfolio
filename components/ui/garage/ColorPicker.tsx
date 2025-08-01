import { HexColorPicker } from "react-colorful";
import { motion } from "framer-motion";
import { useGarageStore } from "@/store/useGarageStore";

const ColorPicker = () => {
  const { selectedColor, setSelectedColor, setColorPickerOpen, setPartPanelOpen } = useGarageStore();

  return (
    <motion.div
      className="w-full p-5 garage-colorpicker h-[calc(29dvh)] relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
      <div className="flex items-center justify-center w-full gap-5 mt-5">
        <button
          onClick={() => {
            setColorPickerOpen(false);
            setPartPanelOpen(true);
          }}
          className="flex-1 w-12 h-12 rounded-lg border border-white/20"
        >
          닫기
        </button>
        <button className="flex-1 w-12 h-12 rounded-lg border border-white/20">전체에 적용</button>
      </div>
    </motion.div>
  );
};

export default ColorPicker;
