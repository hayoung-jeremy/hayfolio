import type { PartMeta } from "@/store/useGarageStore";

import { QM6_Headlight_Transparent } from "./transparent";
import {
  QM6_Headlight_Futuristic_A,
  QM6_Headlight_Futuristic_B,
  QM6_Headlight_Motorsport_A,
  QM6_Headlight_Motorsport_B,
  QM6_Headlight_Motorsport_C,
  QM6_Headlight_Offroad_A,
  QM6_Headlight_Offroad_B,
} from "./headlight";

type Props = {
  meta?: PartMeta;
};

const QM6_Headlight = ({ meta }: Props) => {
  if (!meta?.theme || !meta.variant) return <QM6_Headlight_Transparent />;

  const key = `${meta.theme.toLowerCase()}_${meta.variant.toLowerCase()}`;

  switch (key) {
    case "futuristic_a":
      return <QM6_Headlight_Futuristic_A />;
    case "futuristic_b":
      return <QM6_Headlight_Futuristic_B />;
    case "motorsport_a":
      return <QM6_Headlight_Motorsport_A />;
    case "motorsport_b":
      return <QM6_Headlight_Motorsport_B />;
    case "motorsport_c":
      return <QM6_Headlight_Motorsport_C />;
    case "offroad_a":
      return <QM6_Headlight_Offroad_A />;
    case "offroad_b":
      return <QM6_Headlight_Offroad_B />;
    default:
      return <QM6_Headlight_Transparent />;
  }
};

export default QM6_Headlight;
