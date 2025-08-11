import { AnimatePresence, motion, Variants } from "framer-motion";

type Props = {
  startsFrom: "top" | "bottom";
  isSelected: boolean;
  size?: number;
  stroke?: number;
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.2, bounce: 0, delay: 0.4 },
      opacity: { duration: 0.01, delay: 0.4 },
    },
  },
};

const OptionSelectorCircleAnimation = ({ startsFrom, isSelected, size = 30, stroke = 1.5 }: Props) => {
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <motion.svg
      className={startsFrom === "top" ? "" : "rotate-180"}
      initial="hidden"
      animate="visible"
      height={size}
      width={size}
      fill="none"
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 링: circle + pathLength 애니메이션 */}
      <motion.circle cx={cx} cy={cy} r={r} stroke="white" strokeWidth={stroke} variants={draw} />

      {/* 선택 점 */}
      <AnimatePresence mode="wait">
        {isSelected && (
          <motion.circle
            key="dot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            cx={cx}
            cy={cy}
            r={size * 0.2}
            fill="white"
          />
        )}
      </AnimatePresence>
    </motion.svg>
  );
};

export default OptionSelectorCircleAnimation;
