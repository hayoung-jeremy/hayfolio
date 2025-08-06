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

  const base = map[key] ?? 0;
  return [0, 0, side === "left" ? -base : base];
}

export function disposeGLTF(gltf: any) {
  if (!gltf || !gltf.scene) {
    return;
  }

  let geometryCount = 0;
  let materialCount = 0;

  gltf.scene.traverse((obj: any) => {
    if (obj.geometry && typeof obj.geometry.dispose === "function") {
      obj.geometry.dispose();
      geometryCount++;
    }

    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach((m: { dispose: () => void; name: any }, i: any) => {
          if (m && typeof m.dispose === "function") {
            m.dispose();
            materialCount++;
          }
        });
      } else if (typeof obj.material.dispose === "function") {
        obj.material.dispose();
        materialCount++;
      }
    }
  });
}
