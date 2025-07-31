import { QM6_Wheel_Transparent } from "./transparent";
import {
  QM6_Wheel_Futuristic_A,
  QM6_Wheel_Futuristic_B,
  QM6_Wheel_Motorsport_A,
  QM6_Wheel_Motorsport_B,
  QM6_Wheel_Motorsport_C,
  QM6_Wheel_Offroad_A,
  QM6_Wheel_Offroad_B,
} from "./wheel";
import { useGarageStore } from "@/store/useGarageStore";

const QM6_Wheel = () => {
  const { selectedParts } = useGarageStore();
  const meta = selectedParts["Wheel"];
  const bumperMeta = selectedParts["Bumper"];

  if (!meta?.theme || !meta.variant) return <QM6_Wheel_Transparent />;

  const key = `${meta.theme.toLowerCase()}_${meta.variant.toLowerCase()}`;
  const commonProps = {
    carType: "QM6" as const,
    bumperMeta,
    wheelMeta: meta,
  };

  switch (key) {
    case "futuristic_a":
      return <QM6_Wheel_Futuristic_A {...commonProps} />;
    case "futuristic_b":
      return <QM6_Wheel_Futuristic_B {...commonProps} />;
    case "motorsport_a":
      return <QM6_Wheel_Motorsport_A {...commonProps} />;
    case "motorsport_b":
      return <QM6_Wheel_Motorsport_B {...commonProps} />;
    case "motorsport_c":
      return <QM6_Wheel_Motorsport_C {...commonProps} />;
    case "offroad_a":
      return <QM6_Wheel_Offroad_A {...commonProps} />;
    case "offroad_b":
      return <QM6_Wheel_Offroad_B {...commonProps} />;
    default:
      return <QM6_Wheel_Transparent />;
  }
};

export default QM6_Wheel;
