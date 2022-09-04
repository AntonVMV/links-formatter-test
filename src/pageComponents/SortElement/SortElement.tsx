import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../components/Button/Button";
import { ReactComponent as Arrow } from "./button-arrow.svg";
import cn from "classnames";
import styles from "./SortElement.module.css";

interface SortElementProps {
  submitHandler: (data: Record<string, string>) => void;
}

const containerAnimate = {
  hidden: {
    height: 0,
  },
  visible: {
    height: "100%",
  },
};

const contentAnimate = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
  },
};

export const SortElement: React.FC<SortElementProps> = ({ submitHandler }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState({
    short: "",
    target: "",
    counter: "",
  });

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption({ ...sortOption, [e.target.name]: e.target.value });
  };

  const toggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.sortContainer}>
      <Button onClick={toggleHandler} className={styles.toggle_btn}>
        <p>Filter options</p>
        <Arrow
          className={cn(styles.icon, {
            [styles.active]: isOpen,
          })}
        />
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.options}
            variants={containerAnimate}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              variants={contentAnimate}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={styles.content}
            >
              {(Object.keys(sortOption) as (keyof typeof sortOption)[]).map(
                (item, index) => {
                  return (
                    <div className={styles.sort_option} key={index}>
                      <p>By {item}:</p>
                      <select
                        name={item}
                        id={item}
                        value={sortOption[item]}
                        onChange={changeHandler}
                        className={styles.select}
                      >
                        <option value="">none</option>
                        <option value={`desc_${item}`}>desc</option>
                        <option value={`asc_${item}`}>asc</option>
                      </select>
                    </div>
                  );
                }
              )}

              <Button onClick={() => submitHandler(sortOption)}>Sort</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
