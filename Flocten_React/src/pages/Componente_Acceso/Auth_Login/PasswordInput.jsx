// src/components/auth/PasswordInput.jsx

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const PasswordInput = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium">Password</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-base-content/40" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          className="input input-bordered w-full pl-10"
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-base-content/40" />
          ) : (
            <Eye className="h-5 w-5 text-base-content/40" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;