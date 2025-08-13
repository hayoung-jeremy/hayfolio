import { motion } from "framer-motion";
import clsx from "clsx";

interface ButtonProps {
  type?: "default" | "negative";
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ButtonWrapper = ({ type, onClick, children, className }: ButtonProps) => {
  const isNegative = type === "negative";

  const baseBg = isNegative ? "rgba(255, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.05)";
  const baseBorder = isNegative ? "1px solid rgba(255, 130, 130, 0.3)" : "1px solid rgba(255, 255, 255, 0.1)";

  const hoverBg = isNegative ? "rgba(255, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)";
  const hoverBorder = isNegative ? "rgb(255, 130, 130)" : "rgba(255, 255, 255, 0.4)";

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileTap={{ scale: 0.95 }}
      style={{
        backgroundColor: baseBg,
        border: baseBorder,
      }}
      whileHover={{
        backgroundColor: hoverBg,
        borderColor: hoverBorder,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={clsx(
        className,
        "w-full max-w-[88vw] md:max-w-[360px]",
        "px-10 py-[14px] md:py-4 rounded-[10px] font-semibold shadow-lg",
        "backdrop-blur-md",
        "text-[18px] md:text-[20px]",
        "xl:cursor-pointer",
        { "text-[rgb(255,130,130)]": isNegative }
      )}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default ButtonWrapper;
