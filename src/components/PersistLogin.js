import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";
import { serverUrl } from "../urls/serverUrl";

export default function PersistLogin() {
  const REFRESH_URL = `${serverUrl}/refresh`;
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth, rememberUser } = useAuth();

  useEffect(() => {
    let isMounted = true;

    if (auth === [] || !rememberUser) {
      setIsLoading(false);
    } else {
      const refreshToken = { refreshToken: auth.refreshToken };

      const getNewAccessToken = () => {
        axios.post(REFRESH_URL, refreshToken).then(res => {
          const newAuth = { ...auth, accessToken: res.data.accessToken };

          setAuth(newAuth);
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
    }

    return () => (isMounted = false);
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
}