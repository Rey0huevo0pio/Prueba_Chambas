import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://192.168.106.102:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      set({ authUser: JSON.parse(savedUser), isCheckingAuth: false });
      get().connectSocket();
      return;
    }

    try {
      const res = await axiosInstance.get("/auth/check");
      if (res.status === 200) {
        set({ authUser: res.data });
        localStorage.setItem("authUser", JSON.stringify(res.data));
        get().connectSocket();
      }
    } catch (error) {
      console.error("Error in checkAuth:", error);
      if (error.response?.status === 401) {
        toast.error("Your session has expired. Please log in again.");
        localStorage.removeItem("authUser");
        set({ authUser: null });
      } else {
        toast.error("An error occurred while checking authentication.");
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error en registro");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("authUser");
      document.cookie = "jwt=; Max-Age=0; path=/";
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al cerrar sesión");
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

  // ✅ NUEVO: Actualizar foto de perfil
  updateProfilePicture: (profilePicUrl) => {
    const { authUser } = get();
    if (!authUser) {
      toast.error("No user found to update profile picture");
      return;
    }

    const updatedUser = {
      ...authUser,
      profilePic: profilePicUrl,
    };

    set({ authUser: updatedUser });
    localStorage.setItem("authUser", JSON.stringify(updatedUser));
    toast.success("Profile picture updated successfully");
  },
}));