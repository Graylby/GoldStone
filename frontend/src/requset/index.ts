import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookie from "js-cookie";

const service = axios.create({
  baseURL: "/api",
  timeout: 60000,
  headers: { Authorization: "Bearer eyJhbGciOiJIU" },
});

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = Cookie.get("token");
  console.log(config);
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  if (config.headers.noToken) {
    delete config.headers.Authorization;
  }
  return config;
});

service.interceptors.response.use((res: AxiosResponse) => {
  if (res.data.msg === "token错误" || res.data.msg === "登录过期") {
    Cookie.remove("token");
  }
  return res;
});
export default service;
