import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  closeHnd: () => void;
}

const bgMotion = {
  hidden: {
    x: 500,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const Modal: React.FC<ModalProps> = ({ children, closeHnd }) => {
  useEffect(() => {
    if (!children) return;

    setTimeout(() => {
      closeHnd();
    }, 2500);
  }, [closeHnd, children]);

  return (
    <AnimatePresence>
      {!!children && (
        <motion.div
          className={styles.modal}
          variants={bgMotion}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
