import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";
import { MainPage } from "./pages/MainPage/MainPage";
import { useAppDispatch } from "./hooks/storeHooks";
import { setUser } from "./store/slices/authSlice";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  if (localStorage.getItem("links_app_token")) {
    dispatch(setUser());
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};
