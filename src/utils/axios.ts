import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://79.143.31.216",
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.headers) config.headers = {};

  const token = localStorage.getItem("links_app_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
