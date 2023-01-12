import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function CheckAuth() {
    const { auth, rememberUser } = useAuth();

    return (
        auth?.accessToken
            ? <Outlet />
            : <Navigate to="/login" />
    )
}
