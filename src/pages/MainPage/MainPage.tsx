import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { useGetLinksDataQuery } from "../../store/services/links.api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearUser } from "../../store/slices/authSlice";
import { Button } from "../../components/Button/Button";
import { LinkCreation } from "../../pageComponents/LinkCreation/LinkCreation";
import { resetApi } from "../../store/services/links.api";
import { LinksTable } from "../../pageComponents/LinksTable/LinksTable";
import cn from "classnames";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  const isAuth = useAppSelector((state) => state.authReducer.logged);
  const navigate = useNavigate();
  const { data, isLoading } = useGetLinksDataQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { replace: true });
    }
  }, [isAuth, navigate]);

  const logoutHandler = () => {
    navigate("/login", { replace: true });
    dispatch(resetApi());
    dispatch(clearUser());
    localStorage.removeItem("links_app_token");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cn(styles.main_page, "container")}>
      <Button onClick={logoutHandler} className={styles.logout_btn}>
        logout
      </Button>

      <LinkCreation />

      <LinksTable data={data || []} />
    </div>
  );
};
