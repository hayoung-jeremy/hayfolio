"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { useProgress } from "@react-three/drei";
import clsx from "clsx";
import { useOverlayLoader } from "@/store/useOverlayLoader";

const SceneLoader = () => {
  const { progress, active } = useProgress();
  const { enabled, suppressedCount } = useOverlayLoader();

  const [visible, setVisible] = useState(false);

  const maxSeenRef = useRef(0);
  const monotonic = useMemo(() => {
    const raw = Math.max(0, Math.min(100, progress));
    const next = Math.max(maxSeenRef.current, raw);
    maxSeenRef.current = next;
    return next;
  }, [progress]);

  const spring = useSpring(0, { stiffness: 120, damping: 20, mass: 0.6 });
  useEffect(() => {
    spring.set(monotonic);
  }, [monotonic, spring]);

  const size = 120,
    stroke = 6;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const [dash, setDash] = useState(C);
  useEffect(() => {
    const unsub = spring.on("change", (v: number) => {
      const ratio = v / 100;
      setDash(C * (1 - ratio));
    });
    return () => unsub();
  }, [C, spring]);

  const prevActive = useRef(false);

  const cycleSuppressedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    if (active && !prevActive.current) {
      maxSeenRef.current = 0;
      spring.set(0);
      setDash(C);

      cycleSuppressedRef.current = suppressedCount > 0;
      setVisible(!cycleSuppressedRef.current);
    }
    prevActive.current = active;
  }, [active, enabled, suppressedCount, C, spring]);

  useEffect(() => {
    if (!enabled) return;
    if (active && suppressedCount > 0 && !cycleSuppressedRef.current) {
      cycleSuppressedRef.current = true;
      if (visible) setVisible(false);
    }
  }, [active, enabled, suppressedCount, visible]);

  useEffect(() => {
    if (!enabled) return;

    if (!active && maxSeenRef.current >= 100) {
      spring.set(100);
      const t = setTimeout(() => {
        setVisible(false);
        cycleSuppressedRef.current = false;
      }, 350);
      return () => clearTimeout(t);
    }
  }, [active, enabled, spring]);

  const shouldShow = enabled && visible;

  return (
    <AnimatePresence mode="wait">
      {shouldShow && (
        <motion.div
          className={clsx(
            "fixed inset-0 z-[9999] w-screen h-dvh xl:w-full xl:h-screen flex items-center justify-center bg-black"
          )}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center gap-5 min-w-[320px]">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={stroke}
                fill="none"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke="white"
                strokeWidth={stroke}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={C}
                strokeDashoffset={dash}
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                  transition: "stroke-dashoffset 0.12s linear",
                }}
              />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="18"
                style={{ fontFamily: "inherit" }}
              >
                {Math.floor(Math.min(maxSeenRef.current, 99))}%
              </text>
            </svg>
            <p className="text-white/60 text-sm md:text-base text-center">Loading assets...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SceneLoader;
