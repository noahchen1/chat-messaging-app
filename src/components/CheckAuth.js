import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function CheckAuth() {
    const { auth } = useAuth();
    const location = useLocation()

    return (
        auth.accessToken
            ? <Outlet />
            : <Navigate to="/login" />
    )
}
