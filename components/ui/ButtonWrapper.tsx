import { motion } from "framer-motion";
import clsx from "clsx";
import React from "react";

interface ButtonProps {
  type?: "default" | "negative" | "disabled";
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ButtonWrapper = ({ type, onClick, children, className }: ButtonProps) => {
  const isNegative = type === "negative";
  const isDisabled = type === "disabled";

  const baseBg = isDisabled
    ? "rgba(255,255,255,0.10)"
    : isNegative
    ? "rgba(255, 0, 0, 0.02)"
    : "rgba(255, 255, 255, 0.05)";

  const baseBorder = isDisabled
    ? "1px solid rgba(255,255,255,0.00)"
    : isNegative
    ? "1px solid rgba(255, 130, 130, 0.3)"
    : "1px solid rgba(255, 255, 255, 0.1)";

  const hoverBg = isNegative ? "rgba(255, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)";
  const hoverBorder = isNegative ? "rgb(255, 130, 130)" : "rgba(255, 255, 255, 0.4)";

  const textColor = isDisabled ? "rgba(255,255,255,0.30)" : isNegative ? "#ff8282" : "#ffffff";

  const handleClick = () => {
    if (isDisabled) return;
    onClick?.();
  };

  return (
    <motion.button
      type="button"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      initial={false}
      whileTap={isDisabled ? undefined : { scale: 0.96 }}
      style={{
        backgroundColor: baseBg,
        border: baseBorder,
        color: textColor,
        WebkitTextFillColor: textColor as any,
      }}
      whileHover={
        isDisabled
          ? undefined
          : {
              backgroundColor: hoverBg,
              borderColor: hoverBorder,
              transition: { duration: 0.18, ease: "easeOut" },
            }
      }
      className={clsx(
        className,
        "w-full max-w-[88vw] md:max-w-[360px]",
        "px-10 py-[14px] md:py-4 rounded-[10px] font-semibold shadow-lg",
        "backdrop-blur-md",
        "text-[18px] md:text-[20px]",
        isDisabled ? "opacity-60 select-none pointer-events-none" : "xl:cursor-pointer"
      )}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  );
};

export default React.memo(ButtonWrapper);
