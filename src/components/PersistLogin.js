import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";

export default function PersistLogin() {
    const REFRESH_URL = 'http://localhost:4000/refresh';
    const [isLoading, setIsLoading] = useState(true);
    const { auth, setAuth, rememberUser } = useAuth();

    console.log(rememberUser)

    // useEffect(() => {
    //     if (auth.refreshToken) {
    //         axios.post(REFRESH_URL, refreshToken).then(res => {
    //             const newAuth = { ...auth, accessToken: res.data.accessToken };

    //             setAuth(newAuth)
    //         });
    //     }
    // }, [])

    useEffect(() => {
        let isMounted = true;
        const refreshToken = { refreshToken: auth.refreshToken }

        const getNewAccessToken = () => {
            axios.post(REFRESH_URL, refreshToken).then(res => {
                const newAuth = { ...auth, accessToken: res.data.accessToken };

                setAuth(newAuth)
            });
        };

        const verifyRefreshToken = () => {
            try {
                getNewAccessToken();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [])

    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet />
            }
        </>
    )
}
