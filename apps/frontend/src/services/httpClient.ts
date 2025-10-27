import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.response.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptores para errores

httpClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default httpClient;