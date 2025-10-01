// src/pages/components/Componen_Re_Laboratorio/ui/LabItemHeader.jsx

import { FaSync } from "react-icons/fa";
import { User2 } from 'lucide-react';

const LabItemHeader = ({ logo, codigo, generarCodigo, userControlNumber }) => {
  return (
    <>
      <div className="bg-gradient-to-r from-primary to-base-content p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
                <img src={logo} alt="Logo Laboratorio" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-base-100">
              Registro de Nuevo Item de Laboratorio
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-5 py-2 bg-blue-50 rounded-full inline-flex items-center gap-2 border border-blue-100">
              <span className="text-blue-600 text-base font-black">Codigo:</span>
              <span className="font-mono font-bold text-blue-800">{codigo}</span>
            </div>
            <button onClick={generarCodigo} className="btn btn-outline btn-primary">
              <FaSync className="mr-2" /> Refrescar
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="px-4 py-2.5 bg-base-200 rounded-lg border flex items-center gap-2">
          <User2 className="w-4 h-4" />
          Número de Control: {userControlNumber || "No disponible"}
        </p>
      </div>
    </>
  );
};

export default LabItemHeader;