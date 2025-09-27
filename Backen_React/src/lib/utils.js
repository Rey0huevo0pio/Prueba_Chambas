// utils.js
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  const isProduction = process.env.NODE_ENV === "production";
  
  // Define la configuración base
  const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 días en ms
    httpOnly: true, // Previene ataques XSS
  };

  if (isProduction) {
    // Configuración para Producción (Cross-site, HTTPS)
    Object.assign(cookieOptions, {
      sameSite: "none", // Obligatorio para cross-site
      secure: true,     // Obligatorio con SameSite="none"
      partitioned: true, // <-- NUEVO: Para cumplir con los requisitos de privacidad (CHIPS)
    });
  } else {
    // Configuración para Desarrollo (probablemente cross-site, p. ej., localhost:3000 a localhost:5000)
    // Usaremos "none" y "secure: true" aquí también para manejar el contexto cross-site, 
    // confiando en que tu navegador lo tolere para localhost.
    Object.assign(cookieOptions, {
      sameSite: "none", 
      secure: true, 
      partitioned: true, // <-- NUEVO: También en desarrollo para probar la configuración completa
    });
  }

  res.cookie("jwt", token, cookieOptions);
};