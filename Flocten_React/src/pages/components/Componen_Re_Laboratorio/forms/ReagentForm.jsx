import CustomFormInput from '../CustomFormInput';
import DangerPictogram from '../DangerPictogram';
import { HAZARD_PICTOGRAMS, HAZARD_PHRASES } from '../constants/constants';
import { FaInfoCircle } from "react-icons/fa";

// CORRECCIÓN 1: Recibe las props 'togglePictogram' y 'toggleHazardPhrase' en lugar de 'toggleSelection'.
const ReagentForm = ({ formData, handleChange, togglePictogram, toggleHazardPhrase, errors }) => {
  return (
    <>
      {/* ...el resto de tus CustomFormInput se queda igual... */}
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
      {/* ...otros inputs... */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
        <CustomFormInput
          label="Cantidad"
          name="cantidad"
          placeholder="Ej: 5 frascos"
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
          label="Concentración"
          name="concentracion"
          placeholder="Ej: 1M, 0.5% w/v"
          value={formData.concentracion}
          onChange={handleChange}
          error={errors.concentracion}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-10 ml-1 max-w-full ">
        <CustomFormInput
          label="Descripción"
          name="descripcion"
          placeholder="Descripción detallada del reactivo, apariencia, usos comunes..."
          textarea
          value={formData.descripcion}
          onChange={handleChange}
          error={errors.descripcion}
          customClass="min-h-40 min-w-full"
        />
        <CustomFormInput
          label="Primeros Auxilios"
          name="primerosAuxilios"
          placeholder="Procedimiento en caso de exposición o emergencia"
          textarea
          required
          customClass="min-h-40 min-w-full"
          value={formData.primerosAuxilios}
          onChange={handleChange}
          error={errors.primerosAuxilios}
        />
        <CustomFormInput
          label="Manipulación Segura"
          name="manejoSeguro"
          placeholder="Instrucciones para manejo seguro, EPP requerido..."
          textarea
          required
          customClass="min-h-40 min-w-full"
          value={formData.manejoSeguro}
          onChange={handleChange}
          error={errors.manejoSeguro}
        />
      </div>
      
      {/* Información de peligros */}
      <div className="collapse collapse-plus bg-base-200">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-xl font-medium flex items-center">
            <FaInfoCircle className="mr-2 text-primary" />
            Información Adicional de Peligros
        </div>

        <div className="collapse-content grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Pictogramas */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Pictogramas de Peligro</span>
              </label>
              <div className="flex flex-wrap gap-4">
                  {HAZARD_PICTOGRAMS.map((p) => (
                      <div key={p.id} className="tooltip" data-tip={p.label}>
                      <DangerPictogram
                          selected={formData.pictogramasPeligro.includes(p.id)}
                          // CORRECCIÓN 2: Llama directamente a la función 'togglePictogram'
                          onClick={() => togglePictogram(p.id)}
                      >
                          {p.icon}
                      </DangerPictogram>
                      </div>
                  ))}
              </div>
            </div>

            {/* Frases de peligro */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Frases de Peligro (H/P)</span>
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded-lg">
                {HAZARD_PHRASES.map((phrase) => (
                  <div key={phrase.code} className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input 
                        type="checkbox" 
                        className="checkbox checkbox-sm" 
                        checked={formData.frasesPeligro.includes(phrase.code)}
                        // Esto ya estaba bien, y ahora funcionará porque 'toggleHazardPhrase' se recibe como prop
                        onChange={() => toggleHazardPhrase(phrase.code)}
                      />
                      <span className="label-text">
                        <span className="font-bold">{phrase.code}</span> - {phrase.text}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ReagentForm;