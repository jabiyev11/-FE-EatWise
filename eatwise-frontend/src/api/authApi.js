import axiosClient from "./axiosClient";

// POST /api/auth/register
export const registerRequest = (payload) =>
  axiosClient.post("/api/auth/register", payload);

// POST /api/auth/login
export const loginRequest = (payload) =>
  axiosClient.post("/api/auth/login", payload);

// POST /api/auth/refresh
export const refreshTokenRequest = (refreshToken) =>
  axiosClient.post("/api/auth/refresh", { refreshToken });

// POST /api/auth/logout
export const logoutRequest = () => axiosClient.post("/api/auth/logout", {});
