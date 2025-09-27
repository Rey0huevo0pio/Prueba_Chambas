import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "http://192.168.100.16:5001/api",
  withCredentials: true,
});

// Interceptor para manejar errores globalmente
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Puedes manejar el logout global aquí si lo prefieres
      console.log("Sesión expirada o no autorizada");
    }
    return Promise.reject(error);
  }
);