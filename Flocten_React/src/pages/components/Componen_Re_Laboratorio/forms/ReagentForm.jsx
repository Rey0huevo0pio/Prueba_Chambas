import CustomFormInput from '../CustomFormInput';
import DangerPictogram from '../DangerPictogram';
import { HAZARD_PICTOGRAMS, HAZARD_PHRASES } from '../constants/laboratoryConstants';
import { FaInfoCircle } from "react-icons/fa";


const ReagentForm = ({ formData, handleChange, toggleSelection, errors }) => {
  return (
    <>
      {/* Sección 1: Nombre y fórmula */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-11">
        <CustomFormInput
          label="Nombre del Reactivo"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          error={errors.nombre}
          required
        />
        <CustomFormInput
          label="Fórmula Química"
          name="formula"
          value={formData.formula}
          onChange={handleChange}
          error={errors.formula}
          required
        />
      </div>

      {/* ... otros inputs para cantidad, lote, etc. */}

      {/* Información de peligros */}
      <div className="collapse collapse-plus bg-base-200">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-xl font-medium flex items-center">
            <FaInfoCircle className="mr-2 text-primary" />
            Información Adicional de Peligros
        </div>
        <div className="collapse-content">
            {/* Pictogramas */}
            <div className="flex flex-wrap gap-4">
                {HAZARD_PICTOGRAMS.map((p) => (
                    <div key={p.id} className="tooltip" data-tip={p.label}>
                    <DangerPictogram
                        selected={formData.pictogramasPeligro.includes(p.id)}
                        onClick={() => toggleSelection('pictogramasPeligro', p.id)}
                    >
                        {p.icon}
                    </DangerPictogram>
                    </div>
                ))}
            </div>
             {/* ... mapeo de frases de peligro ... */}
        </div>
      </div>
    </>
  );
};

export default ReagentForm;