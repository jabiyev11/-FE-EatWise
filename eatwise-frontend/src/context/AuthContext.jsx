import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const readStoredAuth = () => {
  const raw = localStorage.getItem("auth");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => readStoredAuth());
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (auth?.accessToken) {
      try {
        setDecodedToken(jwtDecode(auth.accessToken));
      } catch (e) {
        console.error("Invalid JWT", e);
        setDecodedToken(null);
      }
    } else {
      setDecodedToken(null);
    }
  }, [auth]);

  const login = (authResponse) => {
    setAuth(authResponse);
    localStorage.setItem("auth", JSON.stringify(authResponse));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  const value = {
    auth,
    user: auth?.user || null,
    token: auth?.accessToken || null,
    refreshToken: auth?.refreshToken || null,
    decodedToken,
    isAuthenticated: !!auth?.accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
