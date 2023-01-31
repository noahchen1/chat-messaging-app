import { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function useRefreshToken() {
    const REFRESH_URL = 'http://localhost:1000/refresh';
    const { auth, setAuth } = useAuth();
    const refreshToken = { refreshToken: auth.refreshToken};

    useEffect(() => {
        axios.post(REFRESH_URL, refreshToken).then(res => {
            const newAuth = {...auth, accessToken: res.data.accessToken};
            setAuth(newAuth)
        });
    }, [auth])
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useLocalStorage('user', []);
    const [rememberUser, setRememberUser] = useLocalStorage('remember-user', false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, rememberUser, setRememberUser }}>
            {children}
        </AuthContext.Provider>
    )
}
