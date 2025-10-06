import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaSync, FaTimes } from "react-icons/fa";
import { User2 } from 'lucide-react';

// <-- Hooks Personalizados -->
// Ahora se importan desde una carpeta central de hooks
import { useAuthStore } from '../../store/useAuthStore';
import useGeneratedCode from '../components/Componen_Re_Laboratorio/Hooks/useGeneratedCode';
import useImageModal from '../components/Componen_Re_Laboratorio/Hooks/useImageModal';
import useLabForm from '../components/Componen_Re_Laboratorio/Hooks/useLabForm';

// <-- Componentes de UI Modulares -->
// Importamos las piezas que componen la página
import ReagentForm from '../components/Componen_Re_Laboratorio/forms/ReagentForm';
import ToolForm from '../components/Componen_Re_Laboratorio/forms/ToolForm';
import ImageDisplay from '../components/Componen_Re_Laboratorio/ImageDisplay';

// <-- Imágenes y Constantes -->
import LogUp from "../../public/img/LogUp.png";
import LaBoritiLog from "../../public/img/LaBoritiLog.png";

// Componente para el encabezado (puedes moverlo a su propio archivo si crece)
const LabItemHeader = ({ codigo, generarCodigo, authUser, errors }) => (
  <>
    <div className="bg-gradient-to-r from-primary to-base-content p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-1">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
              <img src={LaBoritiLog} alt="Logo Laboratorio" />
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
    <div className="space-y-1.5 p-4">
      <p className="px-4 py-2.5 bg-base-200 rounded-lg border flex items-center gap-2">
        <Link to="/Registro_General">Regresar</Link>
        <User2 className="w-4 h-4" />
        Número de Control: {authUser?.controlNumber || "No disponible"}
      </p>
      {errors.general && (
        <div className="alert alert-error mt-2">
          <span>{errors.general}</span>
        </div>
      )}
    </div>
  </>
);


const Re_Laboratorio = () => {
  // --- 1. INICIALIZACIÓN DE HOOKS ---
  const { authUser } = useAuthStore();
  const { codigo, generarCodigo } = useGeneratedCode();
  const { modalOpen, selectedImage, openModal, closeModal } = useImageModal();

  // --- 2. ESTADO DEL COMPONENTE PRINCIPAL ---
  // Estados que controlan la UI pero no son parte de los datos del formulario
  const [itemType, setItemType] = useState('');
  const [reactivoImg, setReactivoImg] = useState(LogUp);
  const [simboloImg, setSimboloImg] = useState(LaBoritiLog);
  const [authChecked, setAuthChecked] = useState(false);
  
  // --- 3. HOOK DE LÓGICA DEL FORMULARIO ---
  // Toda la lógica compleja (manejo de datos, errores, envío) se obtiene de este hook
  const {
    formData,
    errors,
    isSubmitting,
    uploadProgress,
    handleChange,
    togglePictogram,
    toggleHazardPhrase,
    handleSubmit,
    resetForm
  } = useLabForm(authUser, codigo, itemType, reactivoImg, simboloImg);

  // Efecto para verificar la autenticación
  useEffect(() => {
    if (authUser && authUser.controlNumber) {
      setAuthChecked(true);
    }
  }, [authUser]);

  // --- 4. MANEJADORES DE EVENTOS (HANDLERS) ---
  // Funciones "puente" que conectan la UI con la lógica de los hooks

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de la página
    const success = await handleSubmit(); // Llama a la lógica de envío desde el hook
    if (success) {
      // Si el envío es exitoso, realizar acciones adicionales
      generarCodigo();
      setItemType(''); // Regresar al selector
      setReactivoImg(LogUp);
      setSimboloImg(LaBoritiLog);
    }
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
      resetForm(); // Limpia los datos del formulario (desde el hook)
      setItemType(''); // Regresar al selector
      setReactivoImg(LogUp);
      setSimboloImg(LaBoritiLog);
    }
  };

  // --- RENDERIZADO ---

  // Estado de carga inicial
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-8 md:pt-4 flex justify-center items-start">
      <div className="max-w-5xl bg-base-100 rounded-xl shadow-2xl overflow-hidden">
        
        <LabItemHeader codigo={codigo} generarCodigo={generarCodigo} authUser={authUser} errors={errors} />

        <div className="p-6 md:p-8 space-y-6 font-bold">
          {/* Selector de tipo de item */}
          <div className="form-control">
            <label className="label"><span className="label-text">Tipo de Item a Registrar</span></label>
            <select
              className="select select-bordered w-full"
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              required
            >
              <option value="" disabled>Seleccione un tipo</option>
              <option value="reactivo">Reactivo Químico</option>
              <option value="herramienta">Herramienta de Laboratorio</option>
            </select>
          </div>

          {/* Renderizado condicional del formulario */}
          {itemType && (
            <>
              {/* Sección de Imágenes */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 bg-base-200 p-6 rounded-box">
                <ImageDisplay src={reactivoImg} onImageChange={setReactivoImg} label={`Imagen del ${itemType}`} onImageClick={openModal} allowUpload />
                <ImageDisplay src={simboloImg} onImageChange={setSimboloImg} label={itemType === 'reactivo' ? "Símbolo de Peligro" : "Imagen Adicional"} onImageClick={openModal} ringColor="secondary" allowUpload />
              </div>

              {/* Formulario Principal */}
              <form onSubmit={handleFormSubmit} className="space-y-8">
                {itemType === 'reactivo' && (
                  <ReagentForm
                    formData={formData}
                    handleChange={handleChange}
                    togglePictogram={togglePictogram}
                    toggleHazardPhrase={toggleHazardPhrase}
                    errors={errors}
                  />
                )}
                {itemType === 'herramienta' && (
                  <ToolForm
                    formData={formData}
                    handleChange={handleChange}
                    errors={errors}
                  />
                )}
                
                {/* Botones de Acción */}
                <div className="flex flex-col md:flex-row justify-end gap-4 pt-6">
                  <button type="button" onClick={handleCancel} className="btn btn-outline btn-error btn-lg">
                    <FaTimes className="mr-2" /> Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        {uploadProgress > 0 ? `Subiendo... ${uploadProgress}%` : 'Guardando...'}
                      </>
                    ) : (
                      `Guardar ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Modal para vista de imágenes */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="relative max-w-4xl max-h-full">
              <img src={selectedImage} alt="Ampliación" className="max-w-full max-h-[90vh] object-contain" onClick={(e) => e.stopPropagation()} />
              <button className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center" onClick={closeModal}>
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Re_Laboratorio;