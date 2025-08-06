import React, { useMemo, useRef, useLayoutEffect } from "react";
import { CylinderGeometry, Group, InstancedMesh, MeshBasicMaterial, Object3D, TorusGeometry } from "three";

const CylinderGrid = () => {
  const groupRef = useRef<Group>(null);
  const verticalLineRef = useRef<InstancedMesh>(null);
  const horizontalLineRef = useRef<InstancedMesh>(null);
  const tempObject = useMemo(() => new Object3D(), []);

  const radius = 10;
  const height = 100;
  const radialSegments = 64;
  const heightSegments = 64;

  const verticalGeometry = useMemo(() => {
    const geo = new CylinderGeometry(0.01, 0.01, height, 4);
    geo.computeBoundingBox();
    return geo;
  }, [height]);

  const horizontalGeometry = useMemo(() => {
    const geo = new TorusGeometry(radius, 0.01, 4, radialSegments);
    geo.computeBoundingBox();
    return geo;
  }, [radius, radialSegments]);

  const material = useMemo(
    () =>
      new MeshBasicMaterial({
        color: "#a3a3a3",
        transparent: true,
        opacity: 0.15,
        depthWrite: false,
      }),
    []
  );

  useLayoutEffect(() => {
    if (!verticalLineRef.current) return;

    for (let i = 0; i < radialSegments; i++) {
      const theta = (i / radialSegments) * Math.PI * 2;
      const x = radius * Math.sin(theta);
      const z = radius * Math.cos(theta);

      tempObject.position.set(x, 0, z);
      tempObject.rotation.set(0, theta, 0);
      tempObject.updateMatrix();
      verticalLineRef.current.setMatrixAt(i, tempObject.matrix);
    }

    verticalLineRef.current.instanceMatrix.needsUpdate = true;
  }, [radialSegments]);

  useLayoutEffect(() => {
    if (!horizontalLineRef.current) return;

    for (let i = 0; i <= heightSegments; i++) {
      const y = -height / 2 + (height / heightSegments) * i;

      tempObject.position.set(0, y, 0);
      tempObject.rotation.set(Math.PI / 2, 0, 0);
      tempObject.updateMatrix();
      horizontalLineRef.current.setMatrixAt(i, tempObject.matrix);
    }

    horizontalLineRef.current.instanceMatrix.needsUpdate = true;
  }, [heightSegments]);

  return (
    <group ref={groupRef}>
      <instancedMesh ref={verticalLineRef} args={[verticalGeometry, material, radialSegments]} />
      <instancedMesh ref={horizontalLineRef} args={[horizontalGeometry, material, heightSegments + 1]} />
    </group>
  );
};

export default CylinderGrid;
