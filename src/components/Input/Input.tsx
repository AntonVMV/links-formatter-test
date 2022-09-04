import { DetailedHTMLProps, ForwardedRef, InputHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./Input.module.css";
import React from "react";
import { FieldError } from "react-hook-form";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: FieldError;
}

export const Input = React.forwardRef(
  (
    { error, className, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={styles.input_container}>
        <input
          ref={ref}
          className={cn(styles.input, className, {
            [styles.incorrect]: !!error,
          })}
          {...props}
        />
        {error && <p className={styles.error}>{error.message}</p>}
      </div>
    );
  }
);
