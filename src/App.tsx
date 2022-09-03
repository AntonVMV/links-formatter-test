import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { Layout } from "./pages/Layout";
import { MainPage } from "./pages/MainPage/MainPage";
import { useAppDispatch, useAppSelector } from "./hooks/storeHooks";
import { clearUser, setUser } from "./store/slices/authSlice";
import { ProtectedRoute } from "./pageComponents/ProtectedRoute/ProtectedRoute";
import { useEffect } from "react";
import { Loading } from "./components/Loading/Loading";

export const App: React.FC = () => {
  const { logged, loading } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("links_app_token")) {
      dispatch(setUser());
    } else {
      dispatch(clearUser());
    }
  }, [dispatch, logged]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute isAllow={logged} isLoading={loading}>
                <MainPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
