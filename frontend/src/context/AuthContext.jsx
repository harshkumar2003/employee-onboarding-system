// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import {
//   AUTH_STATE_CHANGED_EVENT,
//   clearStoredAuth,
//   logoutUser,
//   persistAuth,
//   readStoredAuth,
// } from "../services/authService";

// const AuthContext = createContext(null);

// const decodeBase64Url = (value) => {
//   const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
//   const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

//   return atob(padded);
// };

// const getRoleFromToken = (accessToken) => {
//   if (!accessToken) {
//     return "HR";
//   }

//   try {
//     const payload = accessToken.split(".")[1];

//     if (!payload) {
//       return "HR";
//     }

//     const decoded = JSON.parse(decodeBase64Url(payload));
//     return String(decoded.role || "HR").toUpperCase();
//   } catch {
//     return "HR";
//   }
// };

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState(() => readStoredAuth());

//   useEffect(() => {
//     const syncAuthFromStorage = () => {
//       setAuth(readStoredAuth());
//     };

//     window.addEventListener(AUTH_STATE_CHANGED_EVENT, syncAuthFromStorage);

//     return () => {
//       window.removeEventListener(
//         AUTH_STATE_CHANGED_EVENT,
//         syncAuthFromStorage
//       );
//     };
//   }, []);

//   const login = (authData, rememberMe = true) => {
//     const nextAuth = {
//       ...authData,
//       rememberMe,
//     };

//     setAuth(nextAuth);
//     persistAuth(nextAuth, { notify: false });
//   };

//   const logout = async () => {
//     try {
//       if (auth?.refreshToken) {
//         await logoutUser(auth.refreshToken);
//       }
//     } catch {
//       // If revocation fails, still clear the local session so the user is logged out.
//     } finally {
//       clearStoredAuth({ notify: false });
//       setAuth(null);
//     }
//   };

//   const role = useMemo(
//     () => getRoleFromToken(auth?.accessToken),
//     [auth?.accessToken]
//   );

//   const value = useMemo(
//     () => ({
//       auth,
//       role,
//       isAuthenticated: Boolean(auth?.accessToken),
//       login,
//       logout,
//     }),
//     [auth, role]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   return context;
// };




import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  logoutUser,
  refreshAccessToken,
} from "../services/authService";

import {
  getRefreshToken,
  clearTokens,
  getRoleFromToken
} from "../services/tokenService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

    const role = getRoleFromToken();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const refreshToken =
          getRefreshToken();

        if (!refreshToken) {
          setIsAuthenticated(false);
          return;
        }

        await refreshAccessToken();

        setIsAuthenticated(true);
      } catch (error) {
        clearTokens();
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  useEffect(() => {
    const handleForcedLogout = () => {
      clearTokens();
      setIsAuthenticated(false);
    };

    window.addEventListener(
      "auth:logout",
      handleForcedLogout
    );

    return () => {
      window.removeEventListener(
        "auth:logout",
        handleForcedLogout
      );
    };
  }, []);

  const markAuthenticated =
    useCallback(() => {
      setIsAuthenticated(true);
    }, []);

  const logout = useCallback(
    async () => {
      try {
        await logoutUser();
      } finally {
        clearTokens();
        setIsAuthenticated(false);
      }
    },
    []
  );

  const value = {
    isAuthenticated,
    loading,
    markAuthenticated,
    logout,
    role
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};