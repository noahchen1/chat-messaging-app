import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useLocalStorage("user", []);
  const [rememberUser, setRememberUser] = useLocalStorage(
    "remember-user",
    false
  );

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, rememberUser, setRememberUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
