// src/components/auth/LoginForm.jsx

import { useState } from "react";
import { Loader2, User } from "lucide-react";
import PasswordInput from "./PasswordInput";

const LoginForm = ({ onLogin, isLoggingIn }) => {
  const [formData, setFormData] = useState({
    controlNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    // Para que funcione, agrega el atributo 'name' a los inputs
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Número de control</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            type="text"
            name="controlNumber" // Atributo name es clave para handleChange
            className="input input-bordered w-full pl-10"
            placeholder="Ej. 21100001"
            value={formData.controlNumber}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <PasswordInput
        value={formData.password}
        // Pasamos un onChange específico para el campo de contraseña
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
        {isLoggingIn ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
};

export default LoginForm;