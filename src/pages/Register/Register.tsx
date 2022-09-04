import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import { Loading } from "../../components/Loading/Loading";
import { RedirectLink } from "../../components/RedirectLink/RedirectLink";
import { isAuthError } from "../../helpers/helpers";
import { useAppDispatch } from "../../hooks/storeHooks";
import { useCreateUserMutation } from "../../store/services/links.api";
import { setModal } from "../../store/slices/modalSlice";
import { IForm } from "../../types";
import styles from "./Register.module.css";

export const Register: React.FC = () => {
  const [createUser, { data, error, isLoading }] = useCreateUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const registerHandler = (formData: IForm) => {
    createUser(formData);
  };

  useEffect(() => {
    if (data) {
      dispatch(setModal("Registered. Now you can log in"));
      navigate("/login", {});
    }

    if (error && "data" in error) {
      if (isAuthError(error.data)) {
        const { detail } = error.data;
        dispatch(
          setModal(typeof detail === "string" ? detail : "Unknown Error")
        );
      } else {
        dispatch(setModal("Server Error"));
      }
    }
  }, [data, error, navigate, dispatch]);

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles.register}>
        <h2 className={styles.title}>Registration</h2>
        <Form submit={registerHandler} />
        <div className={styles.redirect}>
          <p>Already registered?</p>
          <RedirectLink href="/login">Login</RedirectLink>
        </div>
      </div>
    </>
  );
};
