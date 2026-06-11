let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const setRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const clearRefreshToken = () => {
  localStorage.removeItem("refreshToken");
};

export const clearTokens = () => {
  clearAccessToken();
  clearRefreshToken();
};

export const getRoleFromToken = () => {
  const token = getAccessToken();

  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    return payload.role;
  } catch {
    return null;
  }
};