import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const axiosInstance = axios.create({
  baseURL: "http://192.168.100.16:5001/api",
  withCredentials: true,
});

// Interceptor para añadir el token automáticamente
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().authUser?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Limpiar autenticación y redirigir
      useAuthStore.getState().logout();
      window.location.href = '/login'; // Ajusta según tu ruta de login
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };