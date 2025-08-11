import { motion } from "framer-motion";

const BeginningQuestionOverlay = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-10">
        <motion.p
          initial={{ opacity: 0, scale: 0.9, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[32px] font-bold leading-[36px]"
        >
          WHICH WORD
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[32px] font-bold leading-[36px]"
        >
          DO YOU PREFER?
        </motion.p>
      </div>
      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>
        당신은 무엇을 더 선호하나요?
      </motion.span>
    </>
  );
};

export default BeginningQuestionOverlay;
