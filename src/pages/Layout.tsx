import { Outlet } from "react-router-dom";
import { Modal } from "../components/Modal/Modal";

export const Layout = () => {
  return (
    <>
      <Outlet />

      <Modal />
    </>
  );
};
