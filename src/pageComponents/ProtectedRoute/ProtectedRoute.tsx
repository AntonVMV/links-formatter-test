import { ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";

interface ProtectedRouteProps {
  children: ReactElement;
  isAllow: boolean;
  isLoading: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAllow,
  isLoading,
}) => {
  if (!isAllow && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return children;
};
