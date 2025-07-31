import type { PartMeta } from "@/store/useGarageStore";

import { XM3_Spoiler_Futuristic, XM3_Spoiler_Motorsport, XM3_Spoiler_Offroad } from "./spoiler";

type Props = {
  meta?: PartMeta;
};

const XM3_Spoiler = ({ meta }: Props) => {
  if (!meta?.theme) return null;

  const key = `${meta.theme.toLowerCase()}`;

  switch (key) {
    case "futuristic":
      return <XM3_Spoiler_Futuristic />;
    case "motorsport":
      return <XM3_Spoiler_Motorsport />;
    case "offroad":
      return <XM3_Spoiler_Offroad />;
    default:
      return null;
  }
};

export default XM3_Spoiler;
