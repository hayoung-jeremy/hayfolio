import type { PartMeta } from "@/store/useGarageStore";

import { SM6_Spoiler_Futuristic, SM6_Spoiler_Motorsport, SM6_Spoiler_Offroad } from "./spoiler";

type Props = {
  meta?: PartMeta;
};

const SM6_Spoiler = ({ meta }: Props) => {
  if (!meta?.theme) return null;

  const key = `${meta.theme.toLowerCase()}`;

  switch (key) {
    case "futuristic":
      return <SM6_Spoiler_Futuristic />;
    case "motorsport":
      return <SM6_Spoiler_Motorsport />;
    case "offroad":
      return <SM6_Spoiler_Offroad />;
    default:
      return null;
  }
};

export default SM6_Spoiler;
