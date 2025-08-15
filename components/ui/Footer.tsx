"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, MotionProps } from "framer-motion";
import clsx from "clsx";

const col = "space-y-2 text-sm text-neutral-300";
const link = "hover:text-white transition-colors";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setShowTop(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fadeIn: MotionProps = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
  };

  return (
    <footer className="relative mt-16">
      <div ref={sentinelRef} className="absolute -top-2 h-2 w-full opacity-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/90 to-transparent backdrop-blur-sm" />

      <section className="relative px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.div
          {...fadeIn}
          className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 md:p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                Let’s build something interactive.
              </h2>
              <p className="text-neutral-300 text-sm">Next.js · Three.js/R3F · GSAP/Framer · Generative AI</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                className="rounded-xl px-4 py-2 bg-white text-neutral-900 font-medium"
                href="mailto:jeremiah91@naver.com"
              >
                Email
              </a>
              <a
                className="rounded-xl px-4 py-2 border border-white/20 text-white"
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
              <Link
                className="rounded-xl px-4 py-2 border border-white/20 text-white"
                href="https://github.com/hayoung-jeremy"
                target="_blank"
              >
                GitHub
              </Link>
              <Link className="rounded-xl px-4 py-2 border border-white/20 text-white" href="/#work">
                View Work
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main footer */}
      <section className="relative px-4 sm:px-6 md:px-10 lg:px-16 mt-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div {...fadeIn} className={col}>
            <h3 className="text-white font-medium mb-2">Work</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link className={link} href="/garage">
                  Renault — Garage
                </Link>
              </li>
              <li>
                <Link className={link} href="/xperiencemor3">
                  Renault — Xperiencemor3
                </Link>
              </li>
              <li className="text-neutral-500">
                {/* <Link className={link} href="/clarins">
                  Clarins — NFT/AR
                </Link> */}
                Clarins — NFT/AR
              </li>
              <li className="text-neutral-500">
                {/* <Link className={link} href="/ai">
                  Generative 3D AI
                </Link> */}
                Generative 3D AI
              </li>
            </ul>
          </motion.div>

          <motion.div {...fadeIn} className={col}>
            <h3 className="text-white font-medium">About</h3>
            <p>4년 차 프론트엔드 · 3D/AI 인터랙션 특화</p>
            <p>Next.js · R3F · GSAP · WebGL</p>
            <p className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available now</span>
            </p>
          </motion.div>

          <motion.div {...fadeIn} className={col}>
            <h3 className="text-white font-medium">Tech</h3>
            <p>React/Next.js, TypeScript, Zustand</p>
            <p>Three.js/R3F, GLSL, Lenis</p>
            <p>Framer Motion, GSAP</p>
          </motion.div>

          <motion.div {...fadeIn} className={col}>
            <h3 className="text-white font-medium">Contact</h3>
            <a className={link} href="mailto:jeremiah91@naver.com">
              jeremiah91@naver.com
            </a>
            <p>Seoul (KST)</p>
            <div className="flex gap-3">
              <Link className={link} href="https://github.com/hayoung-jeremy" target="_blank">
                GitHub
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto max-w-6xl mt-8 border-t border-white/10 py-6 text-xs text-neutral-400 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ha Young Kim. All rights reserved.</p>
          <p className="opacity-80">Last updated: {new Date().toISOString().slice(0, 10)}</p>
          <p className="opacity-80">Fonts & assets credited where applicable.</p>
        </div>
      </section>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={clsx(
          "fixed bottom-6 xl:bottom-[85px] z-50 h-11 w-11 rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-opacity cursor-pointer",
          "right-4",
          showTop ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ right: "max(1rem, calc((100vw - 1200px)/2 + 1rem))" }}
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
}
