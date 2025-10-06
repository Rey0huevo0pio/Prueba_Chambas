// src/pages/LoginPage.jsx

import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import LoginHeader from "./Componente_Acceso/Auth_Login/LoginHeader";
import LoginForm from "./Componente_Acceso/Auth_Login/LoginForm";
import AuthRedirect from "./Componente_Acceso/Auth_Login/AuthRedirect";
import Lab_Primero from "../public/img/Lab_Primero.png";

const LoginPage = () => {
  const { login, isLoggingIn, error } = useAuthStore();

  return (
    // 👇 CAMBIO PRINCIPAL: Volvemos a min-h-screen para permitir que el contenido crezca si es necesario.
    <div className="min-h-screen bg-base-100 lg:grid lg:grid-cols-2">

      {/* ======================================================= */}
      {/* LADO IZQUIERDO: CONTENEDOR DEL FORMULARIO              */}
      {/* ======================================================= */}
      {/* Añadimos 'w-full' para asegurar que ocupe todo el ancho disponible 
        y 'py-12' para darle espacio vertical en móviles sin que se sienta apretado.
      */}
      <div className="flex w-full flex-col justify-center px-8 py-12">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="mx-auto w-full max-w-md space-y-6" // mx-auto para centrar el contenedor del formulario
        >
          <LoginHeader />
          <LoginForm onLogin={login} isLoggingIn={isLoggingIn} error={error} />
          <AuthRedirect
            text="¿No tienes una cuenta?"
            linkText="Regístrate aquí"
            to="/register"
          />
        </motion.div>
      </div>

      {/* ======================================================= */}
      {/* LADO DERECHO: CONTENEDOR DE LA IMAGEN                  */}
      {/* ======================================================= */}
      {/* La lógica 'hidden lg:block' ya es perfecta para el diseño responsivo.
        Se oculta en móviles y aparece en pantallas grandes.
      */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        className="hidden lg:block"
      >
        <img
          src={Lab_Primero}
          alt="Equipos de laboratorio clínico"
          className="h-full w-full object-cover" // object-cover es ideal para que la imagen llene el espacio sin deformarse
        />
      </motion.div>

    </div>
  );
};

export default LoginPage;