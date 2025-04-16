import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "http://192.168.100.19:5001/api", // Asegúrate de que esta URL sea la correcta
  withCredentials: true,  // Asegura que las cookies se incluyan en cada solicitud
});