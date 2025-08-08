"use client";
import { createPortal } from "react-dom";
import { RootCanvas } from "../3d";
import useIsMounted from "@/hooks/useIsMounted";

export default function RootCanvasPortal() {
  const ismounted = useIsMounted();
  if (!ismounted) return null;

  return createPortal(<RootCanvas />, document.body);
}
