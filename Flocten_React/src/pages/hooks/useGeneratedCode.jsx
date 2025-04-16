import { useState, useEffect } from "react";

const useGeneratedCode = () => {
  const [codigo, setCodigo] = useState("");

  const generarCodigo = () => {
    const digitos = Math.floor(100 + Math.random() * 900);
    const letras = Array(4).fill().map(() => {
      const charCode = Math.random() < 0.5
        ? Math.floor(Math.random() * 26) + 65
        : Math.floor(Math.random() * 26) + 97;
      return String.fromCharCode(charCode);
    }).join("");
    
    const caracteresEspeciales = "!@#$%^&*()-_=+[]{}<>?";
    const caracterAleatorio = caracteresEspeciales[
      Math.floor(Math.random() * caracteresEspeciales.length)
    ];
    
    setCodigo(`${digitos}${letras}${caracterAleatorio}`);
  };
  
  useEffect(() => { generarCodigo(); }, []);
  
  return { codigo, generarCodigo };
};

export default useGeneratedCode;