import axios from "axios";
import { apiRefreshToken } from "./Auth";

export const http = axios.create({
  baseURL: "http://localhost:8080/api",
});

http.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
      try {
        const data = { refreshToken: refreshToken };
        const response = await apiRefreshToken(data);
        sessionStorage.setItem("accessToken", response?.data?.accessToken);
        sessionStorage.setItem("refreshToken", response?.data?.refreshToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${response?.data?.accessToken}`;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(http(originalRequest));
          }, 100);
        });
      } catch (err) {
        console.log(">>>ERR: ", err);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
