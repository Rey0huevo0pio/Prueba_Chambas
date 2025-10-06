// src/components/auth/LoginHeader.jsx

import LaBoritiLog from "../../../public/img/LaBoritiLog.png"; // Asegúrate de que la ruta sea correcta

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex flex-col items-center gap-2 group">
        <div className="w-28 h-28 rounded-full flex items-center justify-center">
          <img src={LaBoritiLog} className="w-28 h-28 text-primary" alt="Logo" />
        </div>
        <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
        <p className="text-base-content/60">Sign in to your account</p>
      </div>
    </div>
  );
};

export default LoginHeader;