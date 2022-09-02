import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useCreateLinkMutation } from "../../store/services/links.api";
import styles from "./LinkCreation.module.css";
import { useState } from "react";

export const LinkCreation = () => {
  const [link, setLink] = useState<string>("");
  const [createLink, { data }] = useCreateLinkMutation();

  const createLinkHandler = () => {
    console.log(link);
    console.log(data);
    createLink(link);
  };

  return (
    <div className={styles.create_field}>
      <p>Paste the link you want to convert:</p>
      <Input
        className={styles.input}
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <Button className={styles.button} onClick={createLinkHandler}>
        Create link
      </Button>
    </div>
  );
};
