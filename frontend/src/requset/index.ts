import axios from "axios";

const service = axios.create({
  baseURL: "/api",
  timeout: 60000,
  headers: { Authorization: "Bearer eyJhbGciOiJIU" },
});

export default service;
