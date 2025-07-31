import type { PartMeta } from "@/store/useGarageStore";

import { QM6_Spoiler_Futuristic, QM6_Spoiler_Motorsport, QM6_Spoiler_Offroad } from "./spoiler";

type Props = {
  meta?: PartMeta;
};

const QM6_Spoiler = ({ meta }: Props) => {
  if (!meta?.theme) return null;

  const key = `${meta.theme.toLowerCase()}`;

  switch (key) {
    case "futuristic":
      return <QM6_Spoiler_Futuristic />;
    case "motorsport":
      return <QM6_Spoiler_Motorsport />;
    case "offroad":
      return <QM6_Spoiler_Offroad />;
    default:
      return null;
  }
};

export default QM6_Spoiler;
