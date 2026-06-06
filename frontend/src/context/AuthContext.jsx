import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { logoutUser } from "../services/authService";

const AUTH_STORAGE_KEY = "auth_state";

const AuthContext = createContext(null);

const clearStoredAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
};

const readStoredAuth = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedAuth =
    window.localStorage.getItem(AUTH_STORAGE_KEY) ||
    window.sessionStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedAuth) {
    return null;
  }

  try {
    return JSON.parse(storedAuth);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => readStoredAuth());

  useEffect(() => {
    if (!auth) {
      clearStoredAuth();
      return;
    }

    const storage = auth.rememberMe ? window.localStorage : window.sessionStorage;
    const otherStorage = auth.rememberMe ? window.sessionStorage : window.localStorage;

    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    otherStorage.removeItem(AUTH_STORAGE_KEY);
  }, [auth]);

  const login = (authData, rememberMe = true) => {
    setAuth({
      ...authData,
      rememberMe,
    });
  };

  const logout = async () => {
    try {
      if (auth?.refreshToken) {
        await logoutUser(auth.refreshToken);
      }
    } catch {
      // If revocation fails, still clear the local session so the user is logged out.
    } finally {
      clearStoredAuth();
      setAuth(null);
    }
  };

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated: Boolean(auth?.accessToken),
      login,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
