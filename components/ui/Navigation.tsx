import clsx from "clsx";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useMemo } from "react";

import ProjectDescription from "./ProjectDesc";
import ButtonWrapper from "./ButtonWrapper";
import { useScrollStore } from "@/store/useScrollStore";
import { getActiveByProgress, PREVIEW_SECTIONS } from "@/constants/previewSection";
import Portal from "./Portal";

const ctaVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
  show: {
    opacity: 1,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
};

const Navigation = () => {
  const progress = useScrollStore(s => s.progress);
  const router = useRouter();

  const active = useMemo(() => getActiveByProgress(progress), [progress]);

  const isVisible = !!active;
  const isDisabled = active ? !active.route : true;

  const handleClick = () => {
    if (!active?.route) return;
    router.push(active.route);
  };

  return (
    <nav className={clsx("absolute top-0 left-0 w-screen", "xl:w-[1200px] top-10 left-1/2 -translate-x-1/2")}>
      {PREVIEW_SECTIONS.map(s => (
        <ProjectDescription
          key={s.key}
          id={`desc-${s.key}`}
          title={s.title}
          description={s.description}
          visible={active?.key === s.key}
        />
      ))}

      <Portal>
        <AnimatePresence initial={false} mode="sync">
          {isVisible && (
            <motion.div
              key="cta"
              variants={ctaVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="fixed top-[80dvh] left-1/2 -translate-x-1/2 w-full pointer-events-none"
              style={{ zIndex: 50 }}
            >
              <div className="pointer-events-auto will-change-transform transform-gpu flex items-center justify-center">
                <ButtonWrapper type={isDisabled ? "disabled" : "default"} onClick={handleClick} className="">
                  {active?.cta ?? "자세히 살펴보기"}
                </ButtonWrapper>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </nav>
  );
};

export default Navigation;
