import { motion } from "framer-motion";
import clsx from "clsx";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const ButtonWrapper = ({ onClick, children, className }: ButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileTap={{ scale: 0.95 }}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      whileHover={{
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderColor: "rgba(255, 255, 255, 0.4)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className={clsx(
        className,
        "w-full max-w-[88vw] md:max-w-[360px]",
        "px-10 py-4 md:py-4 rounded-md font-semibold shadow-lg",
        "backdrop-blur-md",
        "text-[18px] md:text-[20px]",
        "xl:cursor-pointer"
      )}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default ButtonWrapper;
