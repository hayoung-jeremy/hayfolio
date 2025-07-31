import type { PartMeta } from "@/store/useGarageStore";

import { QM6_Roofcarrier_Futuristic, QM6_Roofcarrier_Motorsport, QM6_Roofcarrier_Offroad } from "./roof_carrier";

type Props = {
  meta?: PartMeta;
};

const QM6_Roofcarrier = ({ meta }: Props) => {
  if (!meta?.theme) return null;

  const key = `${meta.theme.toLowerCase()}`;

  switch (key) {
    case "futuristic":
      return <QM6_Roofcarrier_Futuristic />;
    case "motorsport":
      return <QM6_Roofcarrier_Motorsport />;
    case "offroad":
      return <QM6_Roofcarrier_Offroad />;
    default:
      return null;
  }
};

export default QM6_Roofcarrier;
