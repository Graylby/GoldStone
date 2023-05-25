import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookie from "js-cookie";

const service = axios.create({
  baseURL: "/api",
  timeout: 60000,
  headers: { Authorization: "Bearer eyJhbGciOiJIU" },
});

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookie.get("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});

service.interceptors.response.use((res: AxiosResponse) => {
  return res;
});
export default service;
