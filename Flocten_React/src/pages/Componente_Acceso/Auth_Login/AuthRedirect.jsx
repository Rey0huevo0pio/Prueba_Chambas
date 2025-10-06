// src/components/auth/AuthRedirect.jsx

import { Link } from "react-router-dom";

const AuthRedirect = () => {
  return (
    <div className="text-center">
      <p className="text-base-content/60">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="link link-primary">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default AuthRedirect;