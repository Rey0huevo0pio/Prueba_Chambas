import React from 'react';
import { FaSync } from "react-icons/fa";
import axios from 'axios';

import LogUp from "../../public/img/LogUp.png";
import LaBoritiLog from "../../public/img/LaBoritiLog.png";
import useGeneratedCode from '../hooks/useGeneratedCode';
import useImageModal from '../hooks/useImageModal';

import ImageDisplay from '../components/ImageDisplay';
import { useAuthStore } from '../../store/useAuthStore';
import { User2 } from 'lucide-react';

const Al_Readaptivos = () => {
  const { authUser } = useAuthStore();
  const { codigo, generarCodigo } = useGeneratedCode();
  const { modalOpen, selectedImage, closeModal } = useImageModal();

  // 👉 Handler para enviar a la base de datos
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/RegistroReactivo", {
        controlNumber: authUser?.controlNumber,
        codigo: codigo
      });

      alert("✅ Reactivo registrado correctamente");
      console.log(response.data);
    } catch (error) {
      console.error("❌ Error al registrar reactivo:", error);
      alert("❌ Error al registrar reactivo");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-base-100 rounded-xl shadow-2xl overflow-hidden">
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
                  <img src={LaBoritiLog} alt="Logo Laboratorio" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-base-100">
                Registro de Nuevo Reactivo
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="badge badge-lg badge-accent font-mono max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                Código: {codigo}
              </div>
              <button onClick={generarCodigo} className="btn btn-outline btn-primary">
                <FaSync className="mr-2" /> Refrescar Código
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="px-4 py-2.5 bg-base-200 rounded-lg border flex items-center gap-2">
            <User2 className="w-4 h-4" />
            Número de Control: {authUser?.controlNumber}
          </p>
        </div>

        {/* Contenido del formulario */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Imágenes */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-6 bg-base-200 p-6 rounded-box">
            <ImageDisplay src={LogUp} alt="Reactivo" label="Imagen del Reactivo" />
            <ImageDisplay src={LaBoritiLog} alt="Símbolo de Reactivo" label="Símbolo de Peligro" ringColor="secondary" />
          </div>

          {/* Modal para imagen ampliada */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
              <div className="relative max-w-4xl max-h-full">
                <img 
                  src={selectedImage} 
                  alt="Ampliación" 
                  className="max-w-full max-h-[90vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <button 
                  className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          {/* Inputs adicionales */}


          {/* Botón de envío */}
          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-4"
          >
            Enviar Registro
          </button>
        </div>
      </div>
    </div>
  );
};

export default Al_Readaptivos;
