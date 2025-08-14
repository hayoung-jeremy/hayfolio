"use client";
import { createPortal } from "react-dom";
import useIsMounted from "@/hooks/useIsMounted";

export default function Portal({ children }: { children: React.ReactNode }) {
  const mounted = useIsMounted();
  if (!mounted) return null;
  return createPortal(children, document.body);
}
