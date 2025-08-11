"use client";
import { useEffect } from "react";
import { useCameraBus } from "@/store/useCameraBus";
import { QUESTION_INFO_COLLECTION } from "@/constants/xperiencemor3";
import { useGameStatus, useSelectedOptions } from "@/hooks/useXperiencemor3Game";

export default function useXperiencemor3GameCameraSync() {
  const status = useGameStatus();
  const selected = useSelectedOptions();
  const { moveTo } = useCameraBus();

  useEffect(() => {
    if (status !== "questioning") return;

    const idx = Math.min(selected.length, QUESTION_INFO_COLLECTION.length - 1);
    const q = QUESTION_INFO_COLLECTION[idx];
    moveTo(q.cameraPosition as any, q.targetPosition as any, true);
  }, [status, selected, moveTo]);
}
