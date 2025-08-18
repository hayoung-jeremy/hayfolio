"use client";
import { useEffect } from "react";
import { useOverlayLoader } from "@/store/useOverlayLoader";

/** 마운트~언마운트 동안 SceneLoader를 묵음(suppress) */
export default function MuteSceneOverlay() {
  const { suppress, unsuppress } = useOverlayLoader();
  useEffect(() => {
    suppress();
    return () => unsuppress();
  }, [suppress, unsuppress]);
  return null;
}
