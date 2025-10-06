import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { AnimatePresence } from "framer-motion"; // <-- 1. Importa AnimatePresence
import AnimatedPage from "./components/AnimatedPage"; // <-- 2. Importa tu componente de animación


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

      {/* 3. Envuelve tu componente Routes con AnimatePresence */}
      <AnimatePresence mode="wait">
        {/* 4. Añade una 'key' a Routes usando la ruta actual */}
        <Routes location={location} key={location.pathname}>
          
          {/* 5. Envuelve cada componente de página con AnimatedPage */}
          <Route path="/" element={authUser ? <AnimatedPage><Home_Page /></AnimatedPage> : <Navigate to="/login" />} />
          <Route path="/signup" element={!authUser ? <AnimatedPage><SignUpPage /></AnimatedPage> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <AnimatedPage><LoginPage /></AnimatedPage> : <Navigate to="/" />} />
          <Route path="/settings" element={<AnimatedPage><SettingsPage /></AnimatedPage>} />
          <Route path="/profile" element={authUser ? <AnimatedPage><ProfilePage /></AnimatedPage> : <Navigate to="/login" />} />
          
          {/* ... y así sucesivamente para todas tus rutas ... */}
          <Route path="/InformacionReactivos" element={authUser ? <AnimatedPage><Inf_Readaptivos /></AnimatedPage> : <Navigate to="/" />} />
          <Route path="/Re_Laboratorio" element={authUser ? <AnimatedPage><Re_Laboratorio /></AnimatedPage> : <Navigate to="/"/> }/>
          <Route path="/RegistroQuimico" element={authUser ? <AnimatedPage><ReagentDetailPage /></AnimatedPage> : <Navigate to="/" />} />
          <Route path="/Re_Mecatronica" element={authUser ? <AnimatedPage><Re_Mecatronica /></AnimatedPage> : <Navigate to="/" />} />
          <Route path="/Re_Software" element={authUser ? <AnimatedPage><Re_Software /></AnimatedPage> : <Navigate to="/" />} />
          <Route path="/Registro_General" element={authUser ? <AnimatedPage><Registro_General /></AnimatedPage> : <Navigate to="/" />} />
      
        </Routes>
      </AnimatePresence>

      <Toaster />
    </div>
  );
};
64

export default App;