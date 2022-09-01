import { Form } from "../../components/Form/Form";
import { RedirectLink } from "../../components/RedirectLink/RedirectLink";
import { IForm } from "../../types";
import styles from "./Register.module.css";

export const Register: React.FC = () => {
  const registerHandler = async (data: IForm) => {
    // try {
    //   const response = await axios.post("http://79.143.31.216/register", null, {
    //     params: data,
    //   });
    // } catch (e) {
    //   if (e instanceof AxiosError) {
    //     console.log(e.response?.data.detail);
    //   }
    // }
  };

  return (
    <div className={styles.register}>
      <h2 className={styles.title}>Registration</h2>
      <Form submit={registerHandler} />
      <div className={styles.redirect}>
        <p>Already registered?</p>
        <RedirectLink href="/login">Login</RedirectLink>
      </div>
    </div>
  );
};
