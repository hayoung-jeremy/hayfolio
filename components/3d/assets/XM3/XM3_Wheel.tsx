import { XM3_wheel_transparent } from "./transparent";
import {
  XM3_Wheel_Futuristic_A,
  XM3_Wheel_Futuristic_B,
  XM3_Wheel_Motorsport_A,
  XM3_Wheel_Motorsport_B,
  XM3_Wheel_Motorsport_C,
  XM3_Wheel_Offroad_A,
  XM3_Wheel_Offroad_B,
} from "./wheel";
import { useGarageStore } from "@/store/useGarageStore";

const XM3_Wheel = () => {
  const { selectedParts } = useGarageStore();
  const meta = selectedParts["Wheel"];
  const bumperMeta = selectedParts["Bumper"];

  if (!meta?.theme || !meta.variant) return <XM3_wheel_transparent />;

  const key = `${meta.theme.toLowerCase()}_${meta.variant.toLowerCase()}`;
  const commonProps = {
    carType: "XM3" as const,
    bumperMeta,
    wheelMeta: meta,
  };

  switch (key) {
    case "futuristic_a":
      return <XM3_Wheel_Futuristic_A {...commonProps} />;
    case "futuristic_b":
      return <XM3_Wheel_Futuristic_B {...commonProps} />;
    case "motorsport_a":
      return <XM3_Wheel_Motorsport_A {...commonProps} />;
    case "motorsport_b":
      return <XM3_Wheel_Motorsport_B {...commonProps} />;
    case "motorsport_c":
      return <XM3_Wheel_Motorsport_C {...commonProps} />;
    case "offroad_a":
      return <XM3_Wheel_Offroad_A {...commonProps} />;
    case "offroad_b":
      return <XM3_Wheel_Offroad_B {...commonProps} />;
    default:
      return <XM3_wheel_transparent />;
  }
};

export default XM3_Wheel;
