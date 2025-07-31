import type { PartMeta } from "@/store/useGarageStore";

import { SM6_Roofcarrier_Futuristic, SM6_Roofcarrier_Motorsport, SM6_Roofcarrier_Offroad } from "./roof_carrier";

type Props = {
  meta?: PartMeta;
};

const SM6_Roofcarrier = ({ meta }: Props) => {
  if (!meta?.theme) return null;

  const key = `${meta.theme.toLowerCase()}`;

  switch (key) {
    case "futuristic":
      return <SM6_Roofcarrier_Futuristic />;
    case "motorsport":
      return <SM6_Roofcarrier_Motorsport />;
    case "offroad":
      return <SM6_Roofcarrier_Offroad />;
    default:
      return null;
  }
};

export default SM6_Roofcarrier;
