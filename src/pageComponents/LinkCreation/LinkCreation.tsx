import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useCreateLinkMutation } from "../../store/services/links.api";
import styles from "./LinkCreation.module.css";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/storeHooks";
import { setModal } from "../../store/slices/modalSlice";
import { addNewLink } from "../../store/slices/linksSlice";

export const LinkCreation = () => {
  const [link, setLink] = useState<string>("");
  const [createLink] = useCreateLinkMutation();
  const dispatch = useAppDispatch();

  const createLinkHandler = async () => {
    if (!link) return;

    try {
      setLink("");
      const test = await createLink(link).unwrap();
      dispatch(addNewLink(test));
      dispatch(setModal("Short link was created"));
    } catch (e) {
      dispatch(setModal("Something went wrong"));
    }
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
