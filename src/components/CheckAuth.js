import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function CheckAuth() {
  const { auth } = useAuth();

  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" />;
}
