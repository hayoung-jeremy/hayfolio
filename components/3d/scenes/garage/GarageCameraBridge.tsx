"use client";
import { useEffect, useRef } from "react";
import { useGarageStore } from "@/store/useGarageStore";
import { useCameraBus } from "@/store/useCameraBus";
import { partsTypes } from "@/types/garage";

export default function GarageCameraBridge() {
  const cameraTarget = useGarageStore(s => s.cameraTarget);
  const selectedParts = useGarageStore(s => s.selectedParts);
  const activePartTabIndex = useGarageStore(s => s.activePartTabIndex);
  const moveTo = useCameraBus(s => s.moveTo);

  const activeType = partsTypes[activePartTabIndex];
  const activeOptionKey = selectedParts[activeType]?.imageUrl ?? "__none__";

  useEffect(() => {
    if (!cameraTarget) return;
    const { position, target } = cameraTarget;
    moveTo(position, target, true);
  }, [cameraTarget, moveTo]);

  const prevRef = useRef<{ type: string; key: string }>({ type: activeType, key: activeOptionKey });

  useEffect(() => {
    if (!cameraTarget) return;

    const prev = prevRef.current;
    const typeChanged = prev.type !== activeType;
    const keyChanged = prev.key !== activeOptionKey;

    if (!typeChanged && keyChanged) {
      const { position, target } = cameraTarget;
      moveTo(position, target, true);
    }

    prevRef.current = { type: activeType, key: activeOptionKey };
  }, [activeType, activeOptionKey, cameraTarget, moveTo]);

  return null;
}
