import type { PartMeta } from "@/store/useGarageStore";

import { SM6_Headlight_Transparent } from "./transparent";
import {
  SM6_Headlight_Futuristic_A,
  SM6_Headlight_Futuristic_B,
  SM6_Headlight_Motorsport_A,
  SM6_Headlight_Motorsport_B,
  SM6_Headlight_Motorsport_C,
  SM6_Headlight_Offroad_A,
  SM6_Headlight_Offroad_B,
} from "./headlight";

type Props = {
  meta?: PartMeta;
};

const SM6_Headlight = ({ meta }: Props) => {
  if (!meta?.theme || !meta.variant) return <SM6_Headlight_Transparent />;

  const key = `${meta.theme.toLowerCase()}_${meta.variant.toLowerCase()}`;

  switch (key) {
    case "futuristic_a":
      return <SM6_Headlight_Futuristic_A />;
    case "futuristic_b":
      return <SM6_Headlight_Futuristic_B />;
    case "motorsport_a":
      return <SM6_Headlight_Motorsport_A />;
    case "motorsport_b":
      return <SM6_Headlight_Motorsport_B />;
    case "motorsport_c":
      return <SM6_Headlight_Motorsport_C />;
    case "offroad_a":
      return <SM6_Headlight_Offroad_A />;
    case "offroad_b":
      return <SM6_Headlight_Offroad_B />;
    default:
      return <SM6_Headlight_Transparent />;
  }
};

export default SM6_Headlight;
