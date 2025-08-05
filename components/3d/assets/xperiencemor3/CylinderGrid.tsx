import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CylinderGrid = () => {
  const groupRef = useRef<THREE.Group>(null);
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  useEffect(() => {
    if (!groupRef.current) return;

    const group = groupRef.current;
    const radius = 10;
    const height = 80;
    const radialSegments = 64;
    const heightSegments = 64;

    // Generate vertical lines
    for (let i = 0; i <= radialSegments; i++) {
      const theta = (i / radialSegments) * Math.PI * 2;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);

      const x1 = radius * sinTheta;
      const z1 = radius * cosTheta;

      const points = [new THREE.Vector3(x1, -height / 2, z1), new THREE.Vector3(x1, height / 2, z1)];

      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMaterial = new THREE.LineBasicMaterial({ color: "#a3a3a3", transparent: true, opacity: 0.15 });

      geometries.push(lineGeometry);
      materials.push(lineMaterial);

      const line = new THREE.Line(lineGeometry, lineMaterial);
      group.add(line);
    }

    // Generate horizontal lines
    for (let i = 0; i <= heightSegments; i++) {
      const y = -height / 2 + (height / heightSegments) * i;
      const circlePoints = [];

      for (let j = 0; j <= radialSegments; j++) {
        const theta = (j / radialSegments) * Math.PI * 2;
        const x = radius * Math.sin(theta);
        const z = radius * Math.cos(theta);
        circlePoints.push(new THREE.Vector3(x, y, z));
      }

      const circleGeometry = new THREE.BufferGeometry().setFromPoints(circlePoints);
      const circleMaterial = new THREE.LineBasicMaterial({ color: "#a3a3a3", transparent: true, opacity: 0.15 });

      geometries.push(circleGeometry);
      materials.push(circleMaterial);

      const line = new THREE.LineLoop(circleGeometry, circleMaterial);
      group.add(line);
    }

    return () => {
      group.clear();

      geometries.forEach((geo, i) => {
        geo.dispose();
      });

      materials.forEach((mat, i) => {
        mat.dispose();
      });
    };
  }, []);

  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry args={[10, 10, 100, 64, 64]} />
        <meshStandardMaterial transparent opacity={0.05} color={"#a3a3a3"} />
      </mesh>
    </group>
  );
};

export default CylinderGrid;
