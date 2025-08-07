import { useEffect, useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute } from "three";

const radius = 10;
const height = 100;
const radialSegments = 64;
const heightSegments = 64;

const CylinderGrid = () => {
  const geometry = useMemo(() => {
    const positions: number[] = [];

    // 수직 라인
    for (let i = 0; i < radialSegments; i++) {
      const theta = (i / radialSegments) * Math.PI * 2;
      const x = radius * Math.sin(theta);
      const z = radius * Math.cos(theta);
      positions.push(x, -height / 2, z, x, height / 2, z);
    }

    // 수평 라인
    for (let i = 0; i <= heightSegments; i++) {
      const y = -height / 2 + (height / heightSegments) * i;

      for (let j = 0; j < radialSegments; j++) {
        const theta1 = (j / radialSegments) * Math.PI * 2;
        const theta2 = ((j + 1) / radialSegments) * Math.PI * 2;

        const x1 = radius * Math.sin(theta1);
        const z1 = radius * Math.cos(theta1);
        const x2 = radius * Math.sin(theta2);
        const z2 = radius * Math.cos(theta2);

        positions.push(x1, y, z1, x2, y, z2);
      }
    }

    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  // ✅ 메모리 누수 방지용 dispose
  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#a3a3a3" transparent opacity={0.15} depthWrite={false} />
    </lineSegments>
  );
};

export default CylinderGrid;
