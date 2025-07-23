"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";

export default function Providers({ children }: { children: React.ReactNode }) {
  useLenis();
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative z-10">
        {children}
      </div>
    </AnimatePresence>
  );
}
