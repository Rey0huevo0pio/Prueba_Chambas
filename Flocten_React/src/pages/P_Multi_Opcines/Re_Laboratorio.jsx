import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

// Hooks
import useGeneratedCode from '../components/Componen_Re_Laboratorio/Hooks/useGeneratedCode';
import { useLabForm } from '../components/Componen_Re_Laboratorio/Hooks/useLabForm';

// Componentes de UI
import LabItemHeader from '../components/Componen_Re_Laboratorio/ui/LabItemHeader';
import ImageUploadSection from '../components/Componen_Re_Laboratorio/ui/ImageUploadSection';
import ActionButtons from '../components/Componen_Re_Laboratorio/ui/ActionButtons';
import ReagentForm from '../components/Componen_Re_Laboratorio/forms/ReagentForm';
import ToolForm from '../components/Componen_Re_Laboratorio/forms/ToolForm';

// Imágenes
import LogUp from "../../public/img/LogUp.png"
import LaBoritiLog from "../../public/img/LaBoritiLog.png";

const Re_Laboratorio = () => {
  const { authUser } = useAuthStore();
  const { codigo, generarCodigo } = useGeneratedCode();
  
  const [itemType, setItemType] = useState('');
  const [reactivoImg, setReactivoImg] = useState(LogUp);
  const [simboloImg, setSimboloImg] = useState(LaBoritiLog);

  // Usamos nuestro nuevo hook para toda la lógica del formulario
  const {
    formData,
    errors,
    isSubmitting,
    uploadProgress,
    handleChange,
    toggleSelection,
    handleSubmit,
    handleCancel
  } = useLabForm(itemType, codigo, generarCodigo); // Le pasamos la función para generar código al tener éxito

  if (!authUser?.controlNumber) {
    return <div>Verificando autenticación...</div>; // O un componente de carga más elaborado
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-8 flex justify-center">
      <div className="max-w-5xl bg-base-100 rounded-xl shadow-2xl overflow-hidden">
        
        <LabItemHeader
            logo={LaBoritiLog}
            codigo={codigo}
            generarCodigo={generarCodigo}
            userControlNumber={authUser.controlNumber}
        />

        <div className="p-6 md:p-8 space-y-6">
          {/* Selector de Tipo */}
          <div className="form-control">
            <label className="label"><span className="label-text">Tipo de Item</span></label>
            <select className="select select-bordered w-full" value={itemType} onChange={(e) => setItemType(e.target.value)}>
              <option value="">Seleccione un tipo</option>
              <option value="reactivo">Reactivo</option>
              <option value="herramienta">Herramienta Química</option>
            </select>
          </div>

          {itemType && (
            <form onSubmit={(e) => handleSubmit(e, reactivoImg, simboloImg)} className="space-y-8">
              <ImageUploadSection
                itemType={itemType}
                reactivoImg={reactivoImg}
                simboloImg={simboloImg}
                onReactivoImgChange={setReactivoImg}
                onSimboloImgChange={setSimboloImg}
              />

              {/* Renderizado condicional del formulario */}
              {itemType === 'reactivo' && (
                <ReagentForm
                  formData={formData}
                  handleChange={handleChange}
                  toggleSelection={toggleSelection}
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

              <ActionButtons
                isSubmitting={isSubmitting}
                uploadProgress={uploadProgress}
                onCancel={handleCancel}
                itemType={itemType}
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Re_Laboratorio;