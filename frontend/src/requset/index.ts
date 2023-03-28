import axios from "axios";

const service = axios.create({
  baseURL: "/api",
  timeout: 60000,
});

export default service;
