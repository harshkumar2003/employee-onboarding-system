import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_STORAGE_KEY = "auth_state";

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const storedAuth =
      window.localStorage.getItem(AUTH_STORAGE_KEY) ||
      window.sessionStorage.getItem(AUTH_STORAGE_KEY);

    if (storedAuth) {
      try {
        const auth = JSON.parse(storedAuth);

        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
      } catch {
        // Ignore malformed auth state and continue without a token.
      }
    }
  }

  return config;
});

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const logoutUser = async (refreshToken) => {
  await api.post("/auth/logout", {
    refreshToken,
  });
};
