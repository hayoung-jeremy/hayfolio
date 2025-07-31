import type { PartMeta } from "@/store/useGarageStore";

import { XM3_Roofcarrier_Futuristic, XM3_Roofcarrier_Motorsport, XM3_Roofcarrier_Offroad } from "./roof_carrier";

type Props = {
  meta?: PartMeta;
};

const XM3_Roofcarrier = ({ meta }: Props) => {
  if (!meta?.theme) return null;

  const key = `${meta.theme.toLowerCase()}`;

  switch (key) {
    case "futuristic":
      return <XM3_Roofcarrier_Futuristic />;
    case "motorsport":
      return <XM3_Roofcarrier_Motorsport />;
    case "offroad":
      return <XM3_Roofcarrier_Offroad />;
    default:
      return null;
  }
};

export default XM3_Roofcarrier;
