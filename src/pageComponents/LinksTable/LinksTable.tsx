import { ILinkData } from "../../types";
import { Modal } from "../../components/Modal/Modal";
import styles from "./LinksTable.module.css";
import { useState } from "react";

interface LinksTableProps {
  data: ILinkData[];
}

export const LinksTable: React.FC<LinksTableProps> = ({ data }) => {
  const [isModal, setModal] = useState<string>("");

  const copyToClipboard = (e: React.MouseEvent<HTMLParagraphElement>) => {
    navigator.clipboard
      .writeText(`http://79.143.31.216/s/${e.currentTarget.innerText}`)
      .then(() => setModal("Copied to clipboard"));
  };

  return (
    <>
      <table className={styles.links_table}>
        <thead>
          <tr className={styles.links_element}>
            <th>№</th>
            <th>Target link</th>
            <th>Short link</th>
            <th>Watches</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => {
              return (
                <tr key={item.id} className={styles.links_element}>
                  <td>{index + 1}</td>
                  <td>
                    <a
                      href={item.target}
                      className={styles.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.target}
                    </a>
                  </td>
                  <td>
                    <p className={styles.link} onClick={copyToClipboard}>
                      {item.short}
                    </p>
                  </td>
                  <td> {item.counter}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Modal closeHnd={() => setModal("")}>{isModal}</Modal>
    </>
  );
};
