import { useEffect, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { debounce } from "lodash";

import { useGarageStore } from "@/store/useGarageStore";
import { partsTypes } from "@/types/garage";

const ColorPicker = () => {
  const { activePartTabIndex, selectedColors, setSelectedColorByType, setColorPickerOpen, setPartPanelOpen } =
    useGarageStore();

  const currentType = partsTypes[activePartTabIndex];
  const editableTypes = ["Body", "Bonnet", "Bumper", "Wheel", "Spoiler", "Pattern"] as const;
  type EditableColorType = (typeof editableTypes)[number];
  const isEditable = editableTypes.includes(currentType as EditableColorType);
  const colorValue = isEditable ? selectedColors[currentType as EditableColorType] : "#ffffff";
  const currentKey = currentType as EditableColorType;

  const [tempColor, setTempColor] = useState<string>(isEditable ? selectedColors[currentKey] : "#ffffff");

  const debouncedSetColor = useMemo(
    () =>
      debounce((color: string) => {
        setSelectedColorByType(currentKey, color);
      }, 50),
    [currentKey, setSelectedColorByType]
  );

  useEffect(() => {
    return () => {
      debouncedSetColor.cancel();
    };
  }, [debouncedSetColor]);

  return (
    <>
      <HexColorPicker
        color={tempColor}
        onChange={(newColor: string) => {
          if (!isEditable) return;
          setTempColor(newColor);
          debouncedSetColor(newColor);
        }}
      />
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
