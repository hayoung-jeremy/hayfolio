import type { PartMeta } from "@/store/useGarageStore";

import { SM6_Bonnet_Transparent } from "./transparent";
import {
  SM6_Bonnet_Futuristic_A,
  SM6_Bonnet_Futuristic_B,
  SM6_Bonnet_Motorsport_A,
  SM6_Bonnet_Motorsport_B,
  SM6_Bonnet_Motorsport_C,
  SM6_Bonnet_Offroad_A,
  SM6_Bonnet_Offroad_B,
} from "./bonnet";

type Props = {
  meta?: PartMeta;
};

const SM6_Bonnet = ({ meta }: Props) => {
  if (!meta?.theme || !meta.variant) return <SM6_Bonnet_Transparent />;

  const key = `${meta.theme.toLowerCase()}_${meta.variant.toLowerCase()}`;

  switch (key) {
    case "futuristic_a":
      return <SM6_Bonnet_Futuristic_A />;
    case "futuristic_b":
      return <SM6_Bonnet_Futuristic_B />;
    case "motorsport_a":
      return <SM6_Bonnet_Motorsport_A />;
    case "motorsport_b":
      return <SM6_Bonnet_Motorsport_B />;
    case "motorsport_c":
      return <SM6_Bonnet_Motorsport_C />;
    case "offroad_a":
      return <SM6_Bonnet_Offroad_A />;
    case "offroad_b":
      return <SM6_Bonnet_Offroad_B />;
    default:
      return <SM6_Bonnet_Transparent />;
  }
};

export default SM6_Bonnet;
