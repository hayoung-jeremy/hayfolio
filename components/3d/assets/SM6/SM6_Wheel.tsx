import { SM6_Wheel_Transparent } from "./transparent";
import {
  SM6_Wheel_Futuristic_A,
  SM6_Wheel_Futuristic_B,
  SM6_Wheel_Motorsport_A,
  SM6_Wheel_Motorsport_B,
  SM6_Wheel_Motorsport_C,
  SM6_Wheel_Offroad_A,
  SM6_Wheel_Offroad_B,
} from "./wheel";
import { useGarageStore } from "@/store/useGarageStore";

const SM6_Wheel = () => {
  const { selectedParts } = useGarageStore();
  const meta = selectedParts["Wheel"];
  const bumperMeta = selectedParts["Bumper"];

  if (!meta?.theme || !meta.variant) return <SM6_Wheel_Transparent />;

  const key = `${meta.theme.toLowerCase()}_${meta.variant.toLowerCase()}`;
  const commonProps = {
    carType: "SM6" as const,
    bumperMeta,
    wheelMeta: meta,
  };

  switch (key) {
    case "futuristic_a":
      return <SM6_Wheel_Futuristic_A {...commonProps} />;
    case "futuristic_b":
      return <SM6_Wheel_Futuristic_B {...commonProps} />;
    case "motorsport_a":
      return <SM6_Wheel_Motorsport_A {...commonProps} />;
    case "motorsport_b":
      return <SM6_Wheel_Motorsport_B {...commonProps} />;
    case "motorsport_c":
      return <SM6_Wheel_Motorsport_C {...commonProps} />;
    case "offroad_a":
      return <SM6_Wheel_Offroad_A {...commonProps} />;
    case "offroad_b":
      return <SM6_Wheel_Offroad_B {...commonProps} />;
    default:
      return <SM6_Wheel_Transparent />;
  }
};

export default SM6_Wheel;
