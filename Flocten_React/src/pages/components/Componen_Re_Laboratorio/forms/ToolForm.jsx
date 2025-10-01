// src/pages/components/Componen_Re_Laboratorio/forms/ToolForm.jsx

import CustomFormInput from '../CustomFormInput'; // Asegúrate que la ruta sea correcta
import { TOOL_TYPES } from '../constants/laboratoryConstants'; // Asumiendo que moviste las constantes a un archivo

const ToolForm = ({ formData, handleChange, errors }) => {
  return (
    <>
      {/* Nombre de la Herramienta */}
      <CustomFormInput
        label="Nombre de la Herramienta"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        error={errors.nombre}
        required
      />

      {/* Tipo de Herramienta */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Tipo de Herramienta</span>
        </label>
        <select
          name="tipoHerramienta"
          className="select select-bordered w-full"
          value={formData.tipoHerramienta}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un tipo</option>
          {TOOL_TYPES.map((tool) => (
            <option key={tool.id} value={tool.id}>
              {tool.label}
            </option>
          ))}
        </select>
        {errors.tipoHerramienta && <span className="text-error">{errors.tipoHerramienta}</span>}
      </div>

      {/* Campo para especificar "Otros" */}
      {formData.tipoHerramienta === 'otros' && (
        <CustomFormInput
          label="Especificar Tipo"
          name="especificarTipo"
          value={formData.especificarTipo}
          onChange={handleChange}
          error={errors.especificarTipo}
          required
        />
      )}

      {/* Otros campos como cantidad, número de serie, descripción y estado */}
       <CustomFormInput
          label="Descripción"
          name="descripcion"
          textarea
          value={formData.descripcion}
          onChange={handleChange}
          error={errors.descripcion}
          required
        />
        <CustomFormInput
          label="Estado"
          name="estado"
          textarea
          value={formData.estado}
          onChange={handleChange}
          error={errors.estado}
          required
        />
    </>
  );
};

export default ToolForm;