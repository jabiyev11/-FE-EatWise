import axiosClient from "./axiosClient";

// POST /api/plan/generate
// daysRequest: { days: number }
export const generatePlan = (days) =>
  axiosClient.post("/api/plan/generate", { days });
