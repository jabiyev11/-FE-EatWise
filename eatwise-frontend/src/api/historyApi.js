import axiosClient from "./axiosClient";

// GET /api/history -> List<PlanResponse>
export const getAllPlans = () => axiosClient.get("/api/history");

// GET /api/history/{planId} -> PlanResponse
export const getPlanById = (id) => axiosClient.get(`/api/history/${id}`);

// DELETE /api/history -> void
export const deleteAllPlans = () => axiosClient.delete("/api/history");

// DELETE /api/history/{planId} -> void
export const deletePlanById = (id) =>
  axiosClient.delete(`/api/history/${id}`);
