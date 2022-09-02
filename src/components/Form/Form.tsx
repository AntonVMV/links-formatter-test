import React, { DetailedHTMLProps, FormHTMLAttributes, useState } from "react";
import { ReactComponent as PassHidden } from "./passoff.svg";
import { ReactComponent as PassVisible } from "./passon.svg";
import { ReactComponent as UserIcon } from "./userIcon.svg";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { IForm } from "../../types";
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
  const [formData, setFormData] = useState<IForm>({
    username: "",
    password: "",
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(formData);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler} autoComplete="off">
      <UserIcon />
      <label className={styles.label}>
        Username:
        <Input
          placeholder="Enter user name"
          className={styles.form_input}
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      </label>

      <label className={styles.label}>
        Password:
        <div className={styles.pass_container}>
          <Input
            placeholder="Enter password"
            className={styles.form_input}
            type={isVisible ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
