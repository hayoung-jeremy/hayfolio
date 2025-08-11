"use client";
import { useEffect } from "react";
import { useGarageStore } from "@/store/useGarageStore";
import { useCameraBus } from "@/store/useCameraBus";

export default function GarageCameraBridge() {
  const cameraTarget = useGarageStore(s => s.cameraTarget);
  const moveTo = useCameraBus(s => s.moveTo);

  useEffect(() => {
    if (!cameraTarget) return;
    const { position, target } = cameraTarget;
    moveTo(position, target, true);
  }, [cameraTarget, moveTo]);

  return null;
}
