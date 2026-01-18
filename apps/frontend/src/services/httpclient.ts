import axios from "axios";
import { AuthService } from "./auth.service";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: any; reject: any }> = [];

const processQueue = (error: any, token?: string) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
  isRefreshing = false;
};

// ✅ Interceptor de REQUEST
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Interceptor de RESPONSE
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // ❌ No reintentar si es refresh-token o si ya reintenté
    if (originalRequest.url?.includes('/auth/refresh-token') || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Si es 401, intenta refrescar token
    if (error.response?.status === 401) {
      if (isRefreshing) {
        // Si ya se está refrescando, encolar la petición
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return httpClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('🔄 Refrescando token...');
        const newToken = await AuthService.refreshToken();
        console.log('✅ Token refrescado:', newToken.slice(0, 20) + '...');
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        console.error('❌ Error refrescando token:', refreshError);
        processQueue(refreshError);
        AuthService.clearTokens();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;