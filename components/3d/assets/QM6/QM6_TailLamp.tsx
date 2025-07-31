import type { PartMeta } from "@/store/useGarageStore";

import { QM6_TailLamp_Transparent } from "./transparent";
import {
  QM6_TailLamp_Futuristic_A,
  QM6_TailLamp_Futuristic_B,
  QM6_TailLamp_Motorsport_A,
  QM6_TailLamp_Motorsport_B,
  QM6_TailLamp_Motorsport_C,
  QM6_TailLamp_Offroad_A,
  QM6_TailLamp_Offroad_B,
} from "./tail_lamp";

type Props = {
  meta?: PartMeta;
};

const QM6_TailLamp = ({ meta }: Props) => {
  if (!meta?.theme || !meta.variant) return <QM6_TailLamp_Transparent />;

  const key = `${meta.theme.toLowerCase()}_${meta.variant.toLowerCase()}`;

  switch (key) {
    case "futuristic_a":
      return <QM6_TailLamp_Futuristic_A />;
    case "futuristic_b":
      return <QM6_TailLamp_Futuristic_B />;
    case "motorsport_a":
      return <QM6_TailLamp_Motorsport_A />;
    case "motorsport_b":
      return <QM6_TailLamp_Motorsport_B />;
    case "motorsport_c":
      return <QM6_TailLamp_Motorsport_C />;
    case "offroad_a":
      return <QM6_TailLamp_Offroad_A />;
    case "offroad_b":
      return <QM6_TailLamp_Offroad_B />;
    default:
      return <QM6_TailLamp_Transparent />;
  }
};

export default QM6_TailLamp;
