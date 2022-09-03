import { Form } from "../../components/Form/Form";
import { RedirectLink } from "../../components/RedirectLink/RedirectLink";
import { IForm } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { loginUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import styles from "./Login.module.css";

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { logged, loading } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (logged) {
      navigate("/", { replace: true });
    }
  }, [logged, navigate]);

  const loginHandler = (data: IForm) => {
    dispatch(loginUser(data));
  };

  return (
    <>
      <div className={styles.login}>
        <h2 className={styles.title}>Login</h2>
        <Form submit={loginHandler} />
        <div className={styles.redirect}>
          <p>Not registered yet?</p>
          <RedirectLink href="/register">Register</RedirectLink>
        </div>
      </div>
    </>
  );
};
