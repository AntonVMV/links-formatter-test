import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { clearUser } from "../../store/slices/authSlice";
import { Button } from "../../components/Button/Button";
import { LinkCreation } from "../../pageComponents/LinkCreation/LinkCreation";
import { LinksTable } from "../../pageComponents/LinksTable/LinksTable";
import cn from "classnames";
import styles from "./MainPage.module.css";
import { useEffect, useState } from "react";
import { clearLinks, getLinks } from "../../store/slices/linksSlice";
import { Loading } from "../../components/Loading/Loading";

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { data, loading, isMoreData } = useAppSelector(
    (state) => state.linkReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLinks({ limit: 10, offset: currentPage * 10 }));
  }, [dispatch, currentPage]);

  const logoutHandler = () => {
    dispatch(clearUser());
    dispatch(clearLinks());
    localStorage.removeItem("links_app_token");
  };

  return (
    <div className={cn(styles.main_page, "container")}>
      {loading && <Loading />}

      <Button onClick={logoutHandler} className={styles.logout_btn}>
        logout
      </Button>

      <LinkCreation />

      <LinksTable data={data || []} />

      {isMoreData && (
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={styles.load_btn}
        >
          Load more
        </Button>
      )}
    </div>
  );
};
