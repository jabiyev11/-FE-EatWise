import axiosClient from "./axiosClient";

// All return RestResponse<T> from backend

export const getProfileStatus = () =>
  axiosClient.get("/api/profile/status");

export const getProfile = () =>
  axiosClient.get("/api/profile");

export const createProfile = (payload) =>
  axiosClient.post("/api/profile", payload);

export const updateProfile = (payload) =>
  axiosClient.put("/api/profile", payload);

export const deleteProfile = () =>
  axiosClient.delete("/api/profile");
