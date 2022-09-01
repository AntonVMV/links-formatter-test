import { Form } from "../../components/Form/Form";
import { RedirectLink } from "../../components/RedirectLink/RedirectLink";
import { IForm } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { loginUser } from "../../store/slices/authSlice";
import styles from "./Login.module.css";
import { useEffect } from "react";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector((state) => state.authReducer.logged);

  useEffect(() => {
    if (isLogged) {
      console.log("Redirect");
    }
  }, [isLogged]);

  const loginHandler = (data: IForm) => {
    dispatch(loginUser(data));
  };

  return (
    <div className={styles.login}>
      <h2 className={styles.title}>Login</h2>
      <Form submit={loginHandler} />
      <div className={styles.redirect}>
        <p>Not registered yet?</p>
        <RedirectLink href="/register">Register</RedirectLink>
      </div>
    </div>
  );
};
