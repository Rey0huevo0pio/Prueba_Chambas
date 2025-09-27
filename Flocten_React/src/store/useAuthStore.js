import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://192.168.100.16:5001" : "/";

// <<< AÑADIDO: Estado inicial del menú
const initialMenu = [
  { id: 1, name: "Registro", Link: "/" },
  { id: 2, name: "Almacen", Link: "/RegistroQuimico" },
  { id: 3, name: "Informacion", Link: "/InformacionReactivos" },
];


export const useAuthStore = create((set, get) => ({
  // Tu estado existente...
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,
  onlineUsers: [],
  socket: null,

  // <<< AÑADIDO: El menú ahora es parte del estado global
  menu: initialMenu,

  // <<< AÑADIDO: Acción para actualizar un link del menú
  updateMenuLink: (menuId, newLink) =>
    set((state) => ({
      menu: state.menu.map((item) =>
        item.id === menuId ? { ...item, Link: newLink } : item
      ),
    })),

  checkAuth: async () => {
    if (get().isCheckingAuth) return;

    set({ isCheckingAuth: true });

    try {
      const savedUser = localStorage.getItem("authUser");
      if (savedUser) {
        set({ authUser: JSON.parse(savedUser) });
        get().connectSocket();
        return;
      }

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
    } catch (error) { // ✅ --- INICIO DE LA CORRECCIÓN ---
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    } finally { // ✅ --- FIN DE LA CORRECCIÓN ---
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