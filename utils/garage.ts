export function getWheelXOffset({
  carType,
  bumperTheme,
  bumperVariant,
  side,
}: {
  carType: "XM3" | "SM6" | "QM6";
  bumperTheme?: string;
  bumperVariant?: string | null;
  side: "left" | "right";
}): [number, number, number] {
  const key = `${carType.toLowerCase()}_${(bumperTheme ?? "").toLowerCase()}_${(bumperVariant ?? "").toLowerCase()}`;

  const map: Record<string, number> = {
    xm3_futuristic_a: 40,
    xm3_futuristic_b: 40,
    xm3_motorsport_a: 40,
    xm3_motorsport_b: 60,
    xm3_motorsport_c: 90,
    xm3_offroad_a: 40,
    xm3_offroad_b: 40,

    sm6_futuristic_a: 30,
    sm6_futuristic_b: 40,
    sm6_motorsport_a: 35,
    sm6_motorsport_b: 50,
    sm6_motorsport_c: 80,
    sm6_offroad_a: 50,
    sm6_offroad_b: 40,

    qm6_futuristic_a: 40,
    qm6_futuristic_b: 70,
    qm6_motorsport_a: 70,
    qm6_motorsport_b: 105,
    qm6_motorsport_c: 90,
    qm6_offroad_a: 70,
    qm6_offroad_b: 70,
  };

  const base = map[key] ?? 100;
  return [0, 0, side === "left" ? -base : base];
}
