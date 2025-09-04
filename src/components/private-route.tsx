import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/" replace />;
  return <>{<Outlet />}</>;
};
