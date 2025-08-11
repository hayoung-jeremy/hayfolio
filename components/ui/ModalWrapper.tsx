import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import useIsMounted from "@/hooks/useIsMounted";

type ModalProps = {
  closeModal?: () => void;
  children: React.ReactNode;
};

const ModalWrapper = ({ closeModal, children }: ModalProps) => {
  const ref = useRef<Element | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (document) {
      const dom = document.getElementById("root-modal");
      ref.current = dom;
    }
  }, []);

  if (ref.current && isMounted) {
    return createPortal(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
        onClick={closeModal}
        className="fixed top-0 right-0 bg-black/70 w-screen h-[100dvh] flex flex-col justify-center items-center z-[9999] overflow-y-auto p-5 xl:p-0"
      >
        {children}
      </motion.div>,
      ref.current
    );
  }

  return null;
};

export default ModalWrapper;
