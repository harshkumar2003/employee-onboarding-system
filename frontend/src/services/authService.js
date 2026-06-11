import api from "../api/api";

import {
  setAccessToken,
  setRefreshToken,
  getRefreshToken,
  clearTokens,
} from "./tokenService";

export const loginUser = async (
  email,
  password
) => {
  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  const {
    accessToken,
    refreshToken,
  } = response.data;

  setAccessToken(accessToken);
  setRefreshToken(refreshToken);

  return response.data;
};

export const refreshAccessToken =
  async () => {
    const refreshToken =
      getRefreshToken();

    if (!refreshToken) {
      throw new Error(
        "No refresh token found"
      );
    }

    const response =
      await api.post(
        "/auth/refresh",
        {
          refreshToken,
        }
      );

    setAccessToken(
      response.data.accessToken
    );

    return response.data;
  };

export const logoutUser =
  async () => {
    try {
      const refreshToken =
        getRefreshToken();

      if (refreshToken) {
        await api.post(
          "/auth/logout",
          {
            refreshToken,
          }
        );
      }
    } finally {
      clearTokens();
    }
  };