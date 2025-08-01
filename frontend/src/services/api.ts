import axios from "axios";
const API_URL = "http://localhost:8000/api/";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_URL}auth/jwt/refresh/`, {
            refresh: refreshToken,
          });

          const newAccessToken = res.data.access;
          
          localStorage.setItem("token", newAccessToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;