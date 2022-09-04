import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { clearUser } from "../../store/slices/authSlice";
import { Button } from "../../components/Button/Button";
import { LinkCreation } from "../../pageComponents/LinkCreation/LinkCreation";
import { LinksTable } from "../../pageComponents/LinksTable/LinksTable";
import { useEffect, useState } from "react";
import { clearLinks, getLinks } from "../../store/slices/linksSlice";
import { Loading } from "../../components/Loading/Loading";
import { SortElement } from "../../pageComponents/SortElement/SortElement";
import cn from "classnames";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortMethod, setSortMethod] = useState<string[]>([]);
  const { data, loading, isMoreData } = useAppSelector(
    (state) => state.linkReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getLinks({ limit: 10, offset: currentPage * 10, order: sortMethod })
    );
  }, [dispatch, currentPage, sortMethod]);

  useEffect(() => {});

  const logoutHandler = () => {
    dispatch(clearUser());
    dispatch(clearLinks());
    localStorage.removeItem("links_app_token");
  };

  const sortHandler = (data: Record<string, string>) => {
    const options = [];
    for (let option in data) {
      if (data[option]) {
        options.push(data[option]);
      }
    }
    setSortMethod(options);
    dispatch(clearLinks());
    setCurrentPage(0);
  };

  return (
    <div className={cn(styles.main_page, "container")}>
      {loading && <Loading />}

      <Button onClick={logoutHandler} className={styles.logout_btn}>
        logout
      </Button>

      <LinkCreation />

      <SortElement submitHandler={sortHandler} />

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
