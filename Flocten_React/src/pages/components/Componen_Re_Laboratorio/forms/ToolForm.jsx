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

        {formData.tipoHerramienta === 'otros' && (
                      <CustomFormInput 
                        label="Especificar Tipo" 
                        name="especificarTipo"
                        placeholder="Ej: Embudo de filtración"
                        value={formData.especificarTipo}
                        onChange={handleChange}
                        error={errors.especificarTipo}
                        required
                      />
                    )}

                    {/* Sección 3: Cantidad, lote, serie */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
                      <CustomFormInput 
                        label="Cantidad" 
                        name="cantidad"
                        placeholder="Ej: 10 unidades"
                        value={formData.cantidad}
                        onChange={handleChange}
                        error={errors.cantidad}
                      />
                      <CustomFormInput 
                        label="Número de Lote" 
                        name="numeroLote"
                        placeholder="Ej: Lote-2023-001"
                        value={formData.numeroLote}
                        onChange={handleChange}
                        error={errors.numeroLote}
                      />
                      <CustomFormInput 
                        label="Número de Serie" 
                        name="numeroSerie"
                        placeholder="Ej: SER-001"
                        value={formData.numeroSerie}
                        onChange={handleChange}
                        error={errors.numeroSerie}
                      />
                    </div>

                    {/* Descripción y estado */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-10 ml-1 max-w-full ">
                      <CustomFormInput 
                        label="Descripción" 
                        name="descripcion"
                        placeholder="Descripción detallada de la herramienta, material, usos..."
                        textarea 
                        value={formData.descripcion}
                        onChange={handleChange}
                        error={errors.descripcion}
                        customClass="min-h-40 min-w-full"
                        required
                      />
                      <CustomFormInput 
                        label="Descripción del Estado" 
                        name="estado"
                        placeholder="Estado actual de la herramienta, posibles daños..."
                        textarea 
                        value={formData.estado}
                        onChange={handleChange}
                        error={errors.estado}
                        customClass="min-h-40 min-w-full"
                        required
                      />
                    </div>
                  

    </>
  );
};

export default ToolForm;