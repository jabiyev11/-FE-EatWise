import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

// Attach JWT on each request if available
axiosClient.interceptors.request.use((config) => {
  const authRaw = localStorage.getItem("auth");
  if (authRaw) {
    try {
      const auth = JSON.parse(authRaw);
      if (auth?.accessToken) {
        const type = auth.tokenType || "Bearer";
        config.headers["Authorization"] = `${type} ${auth.accessToken}`;
      }
    } catch (e) {
      console.error("Failed to parse auth from localStorage", e);
    }
  }
  return config;
});

export default axiosClient;
