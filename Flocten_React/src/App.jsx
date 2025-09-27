import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Componentes de las páginas
import Navbar from "./components/Navbar";
import Home_Page from "./pages/Home_Page";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import Registro_General from "./pages/P_Multi_Opcines/Registro_General";

/*Component for react of Reactivios quimicos */
import ReagentDetailPage from "./pages/P_Multi_Opcines/RegistroQuimico";
import Re_Laboratorio from "./pages/P_Multi_Opcines/Re_Laboratorio.jsx";
import Inf_Readaptivos from "./pages/P_Multi_Opcines/Inf_Readaptivos";
import Re_Mecatronica from "./pages/P_Multi_Opcines/Re_Mecatronica";
import Re_Software from "./pages/P_Multi_Opcines/Re_Software"
// Store y librerías adicionales
import { useAuthStore } from "./store/useAuthStore.js";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const location = useLocation(); // Hook para obtener la ubicación actual

  // Verificar autenticación
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Cambiar el título dinámicamente según la ruta
    switch (location.pathname) {
      case "/":
        document.title = "Home - MultiPio";
        break;
      case "/signup":
        document.title = "Sign Up - MultiPio";
        break;
      case "/login":
        document.title = "Login - MultiPio";
        break;
      case "/settings":
        document.title = "Settings - MultiPio";
        break;
      case "/profile":
        document.title = "Profile - MultiPio";
        break;
      case "/Informa":
        document.title = "Información - MultiPio";
        break;
      default:
        document.title = "MultiPio";
        break;
    }
  }, [location]);

  // Cargar mientras se verifica la autenticación
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme} className="text-base-content">
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <Home_Page /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        
        <Route path="/InformacionReactivos" element={authUser ? <Inf_Readaptivos /> : <Navigate to="/" />} />
        <Route path="/Re_Laboratorio" element={authUser ? <Re_Laboratorio /> : <Navigate to="/"/> }/>
        <Route path="/RegistroQuimico" element={authUser ? <ReagentDetailPage /> : <Navigate to="/" />} />
        <Route path="/Re_Mecatronica" element={authUser ? <Re_Mecatronica /> : <Navigate to="/" />} />
        <Route path="/Re_Software" element={authUser ? <Re_Software /> : <Navigate to="/" />} />
         <Route path="/Registro_General" element={authUser ? <Registro_General /> : <Navigate to="/" />} />
    
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;