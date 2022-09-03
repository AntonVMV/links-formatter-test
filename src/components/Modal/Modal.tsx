import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { setModal } from "../../store/slices/modalSlice";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

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

export const Modal: React.FC = () => {
  const { modal } = useAppSelector((state) => state.modalReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!modal) return;

    setTimeout(() => {
      dispatch(setModal(null));
    }, 2500);
  }, [modal, dispatch]);

  return (
    <>
      {ReactDOM.createPortal(
        <AnimatePresence mode="wait">
          {!!modal && (
            <motion.div
              className={styles.modal}
              variants={bgMotion}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {modal}
            </motion.div>
          )}
        </AnimatePresence>,
        document.querySelector("body")!
      )}
    </>
  );
};
