import CustomFormInput from '../CustomFormInput';
import { TOOL_TYPES } from '../constants/constants';

const ToolForm = ({ formData, handleChange, errors }) => {
  return (
    <>
      <CustomFormInput label="Nombre de la Herramienta" name="nombre" value={formData.nombre} onChange={handleChange} error={errors.nombre} required />
      
      {/* Select para tipo de herramienta */}
      <div className="form-control">
        <label className="label"><span className="label-text">Tipo de Herramienta</span></label>
        <select className="select select-bordered w-full" name="tipoHerramienta" value={formData.tipoHerramienta} onChange={handleChange} required>
          <option value="">Seleccione un tipo</option>
          {TOOL_TYPES.map(tool => <option key={tool.id} value={tool.id}>{tool.label}</option>)}
        </select>
        {errors.tipoHerramienta && <span className="text-error">{errors.tipoHerramienta}</span>}
      </div>

      {/* ... otros campos del formulario para herramientas ... */}
    </>
  );
};

export default ToolForm;