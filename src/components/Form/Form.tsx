import React, { DetailedHTMLProps, FormHTMLAttributes, useState } from "react";
import { ReactComponent as PassHidden } from "./passoff.svg";
import { ReactComponent as PassVisible } from "./passon.svg";
import { ReactComponent as UserIcon } from "./userIcon.svg";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { IForm } from "../../types";
import { useForm } from "react-hook-form";
import styles from "./Form.module.css";

interface FormProps
  extends DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  submit: (data: IForm) => void;
}

export const Form: React.FC<FormProps> = ({ submit }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();

  const submitHandler = (data: IForm) => {
    submit(data);
    reset();
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submitHandler)}
      autoComplete="off"
    >
      <UserIcon />
      <label className={styles.label}>
        Username:
        <Input
          placeholder="Enter user name"
          className={styles.form_input}
          {...register("username", {
            required: { value: true, message: "Username is required" },
            minLength: { value: 5, message: "Too short, min - 5 chars" },
          })}
          error={errors.username}
        />
      </label>

      <label className={styles.label}>
        Password:
        <div className={styles.pass_container}>
          <Input
            placeholder="Enter password"
            className={styles.form_input}
            type={isVisible ? "text" : "password"}
            {...register("password", {
              required: { value: true, message: "Enter password" },
              minLength: { value: 5, message: "Too short, min - 5 chars" },
            })}
            error={errors.password}
          />
          <div
            className={styles.visible_toggler}
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? <PassVisible /> : <PassHidden />}
          </div>
        </div>
      </label>

      <Button type="submit">Submit</Button>
    </form>
  );
};
