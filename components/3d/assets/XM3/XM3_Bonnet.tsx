import type { PartMeta } from "@/store/useGarageStore";

import { XM3_bonnet_transparent } from "./transparent";
import {
  XM3_Bonnet_Futuristic_A,
  XM3_Bonnet_Futuristic_B,
  XM3_Bonnet_Motorsport_A,
  XM3_Bonnet_Motorsport_B,
  XM3_Bonnet_Motorsport_C,
  XM3_Bonnet_Offroad_A,
  XM3_Bonnet_Offroad_B,
} from "./bonnet";

type Props = {
  meta?: PartMeta;
};

const XM3_Bonnet = ({ meta }: Props) => {
  if (!meta?.theme || !meta.variant) return <XM3_bonnet_transparent />;

  const key = `${meta.theme.toLowerCase()}_${meta.variant.toLowerCase()}`;

  switch (key) {
    case "futuristic_a":
      return <XM3_Bonnet_Futuristic_A />;
    case "futuristic_b":
      return <XM3_Bonnet_Futuristic_B />;
    case "motorsport_a":
      return <XM3_Bonnet_Motorsport_A />;
    case "motorsport_b":
      return <XM3_Bonnet_Motorsport_B />;
    case "motorsport_c":
      return <XM3_Bonnet_Motorsport_C />;
    case "offroad_a":
      return <XM3_Bonnet_Offroad_A />;
    case "offroad_b":
      return <XM3_Bonnet_Offroad_B />;
    default:
      return <XM3_bonnet_transparent />;
  }
};

export default XM3_Bonnet;
