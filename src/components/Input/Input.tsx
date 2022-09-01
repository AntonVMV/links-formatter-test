import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./Input.module.css";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input className={cn(styles.input, className)} {...props} />;
};
