import React, { useState } from "react";
import { FaExclamationTriangle, FaTimes, FaCheck, FaPlus, FaMinus, FaInfoCircle } from "react-icons/fa";

import axios from "axios";
import { useAuthStore } from "../../store/useAuthStore";

const CustomFormInput = ({ 
  label, 
  type = "text", 
  error, 
  success,
  textarea, 
  customClass, 
  required = false,
  placeholder,
  value,
  onChange,
  ...props 
}) => {
  const inputId = label.replace(/\s+/g, '-').toLowerCase();
  
  return (
    <div className={`form-control ${customClass}`}>
      <label htmlFor={inputId} className="label">
        <span className="label-text">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
      
      {textarea ? (
        <textarea
          id={inputId}
          className={`textarea textarea-bordered ${error ? 'textarea-error' : ''} ${success ? 'textarea-success' : ''}`}
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
          {...props}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          className={`input input-bordered ${error ? 'input-error' : ''} ${success ? 'input-success' : ''}`}
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
      
      {error && (
        <div className="text-error text-sm mt-1 flex items-center">
          <FaExclamationTriangle className="inline mr-1" />
          {error}
        </div>
      )}
      
      {success && !error && (
        <div className="text-success text-sm mt-1 flex items-center">
          <FaCheck className="inline mr-1" />
          {success}
        </div>
      )}
    </div>
  );
};

const DangerPictogram = ({ selected, onClick, children }) => (
  <div 
    className={`avatar cursor-pointer transition-all ${selected ? 'ring-2 ring-primary' : ''}`}
    onClick={onClick}
  >
    <div className={`w-16 rounded p-2 border ${selected ? 'bg-primary/10 border-primary' : 'bg-base-100 border-base-300'}`}>
      <div className="w-full h-full flex items-center justify-center text-3xl">
        {children}
      </div>
    </div>
  </div>
);

const FormPage = () => {
  const { authUser } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    formula: '',
    quantity: '',
    lotNumber: '',
    concentration: '',
    description: '',
    firstAid: '',
    safeHandling: '',
    hazardPictograms: [],
    hazardPhrases: []
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const hazardPictograms = [
    { id: 'explosive', icon: '💥', label: 'Explosivo' },
    { id: 'flammable', icon: '🔥', label: 'Inflamable' },
    { id: 'oxidizing', icon: '⚡', label: 'Oxidante' },
    { id: 'corrosive', icon: '⚠️', label: 'Corrosivo' },
    { id: 'toxic', icon: '☠️', label: 'Tóxico' },
    { id: 'health-hazard', icon: '💀', label: 'Peligro para la salud' },
    { id: 'environment', icon: '🌍', label: 'Peligro ambiental' },
  ];
  
  const hazardPhrases = [
    { code: 'H301', text: 'Toxicidad aguda oral' },
    { code: 'H314', text: 'Quemaduras graves' },
    { code: 'P280', text: 'Usar guantes/ropa protectora' },
    { code: 'H318', text: 'Daño ocular grave' },
    { code: 'H335', text: 'Irritación respiratoria' },
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const togglePictogram = (id) => {
    setFormData(prev => ({
      ...prev,
      hazardPictograms: prev.hazardPictograms.includes(id)
        ? prev.hazardPictograms.filter(p => p !== id)
        : [...prev.hazardPictograms, id]
    }));
  };
  
  const toggleHazardPhrase = (code) => {
    setFormData(prev => ({
      ...prev,
      hazardPhrases: prev.hazardPhrases.includes(code)
        ? prev.hazardPhrases.filter(h => h !== code)
        : [...prev.hazardPhrases, code]
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validación
    const newErrors = {};
    if (!formData.name) newErrors.name = 'El nombre del reactivo es requerido';
    if (!formData.formula) newErrors.formula = 'La fórmula química es requerida';
    if (!formData.firstAid) newErrors.firstAid = 'Los primeros auxilios son requeridos';
    if (!formData.safeHandling) newErrors.safeHandling = 'Las instrucciones de manejo seguro son requeridas';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      try {
        // Prepara los datos con el número de control del usuario
        const dataToSend = {
          ...formData,
          controlNumber: authUser?.controlNumber
        };

        // Envía los datos al backend
        const response = await axios.post('/api/RegistroReactivo', dataToSend);
        
        setSuccess(true);
        console.log('Reactivo registrado:', response.data);
        
        // Limpiar el formulario después del éxito
        setFormData({
          name: '',
          formula: '',
          quantity: '',
          lotNumber: '',
          concentration: '',
          description: '',
          firstAid: '',
          safeHandling: '',
          hazardPictograms: [],
          hazardPhrases: []
        });
      } catch (error) {
        console.error('Error al registrar:', error);
        setErrors({
          submit: error.response?.data?.message || 'Error al registrar el reactivo'
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-11">
        <CustomFormInput 
          label="Nombre del Reactivo" 
          name="name"
          placeholder="Ej: Cloruro de sodio"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <CustomFormInput 
          label="Fórmula Química" 
          name="formula"
          placeholder="Ej: NaCl"
          value={formData.formula}
          onChange={handleChange}
          error={errors.formula}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <CustomFormInput 
          label="Cantidad" 
          name="quantity"
          placeholder="Ej: 5 frascos"
          value={formData.quantity}
          onChange={handleChange}
        />
        <CustomFormInput 
          label="Número de Lote" 
          name="lotNumber"
          placeholder="Ej: Lote-2023-001"
          value={formData.lotNumber}
          onChange={handleChange}
        />
        <CustomFormInput 
          label="Concentración" 
          name="concentration"
          placeholder="Ej: 1M, 0.5% w/v"
          value={formData.concentration}
          onChange={handleChange}
        />
      </div>

      <CustomFormInput 
        label="Descripción" 
        name="description"
        placeholder="Descripción detallada del reactivo, apariencia, usos comunes..."
        textarea 
        value={formData.description}
        onChange={handleChange}
      />

      <div className="grid grid-cols-1 md:grid-cols-1 gap-0.5">
        <CustomFormInput 
          label="Primeros Auxilios" 
          name="firstAid"
          placeholder="Procedimiento en caso de exposición o emergencia"
          textarea 
          required 
          customClass="min-h-40"
          value={formData.firstAid}
          onChange={handleChange}
          error={errors.firstAid}
        />
        <CustomFormInput 
          label="Manipulación Segura" 
          name="safeHandling"
          placeholder="Instrucciones para manejo seguro, EPP requerido..."
          textarea 
          required 
          customClass="min-h-40"
          value={formData.safeHandling}
          onChange={handleChange}
          error={errors.safeHandling}
        />
      </div>

      <div className="collapse collapse-plus bg-base-200">
        <input type="checkbox" defaultChecked />
        <div className="collapse-title text-xl font-medium flex items-center">
          <FaInfoCircle className="mr-2 text-primary" />
          Información Adicional de Peligros
        </div>
        <div className="collapse-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Pictogramas de Peligro</span>
              </label>
              <div className="flex flex-wrap gap-4">
                {hazardPictograms.map((pictogram) => (
                  <div key={pictogram.id} className="tooltip" data-tip={pictogram.label}>
                    <DangerPictogram
                      selected={formData.hazardPictograms.includes(pictogram.id)}
                      onClick={() => togglePictogram(pictogram.id)}
                    >
                      {pictogram.icon}
                    </DangerPictogram>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Frases de Peligro (H/P)</span>
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto p-2 border rounded-lg">
                {hazardPhrases.map((phrase) => (
                  <div key={phrase.code} className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input 
                        type="checkbox" 
                        className="checkbox checkbox-sm" 
                        checked={formData.hazardPhrases.includes(phrase.code)}
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
      </div>

      <div className="flex flex-col md:flex-row justify-end gap-4 pt-6">
        <button 
          type="button" 
          className="btn btn-outline btn-error btn-lg"
          onClick={() => {
            if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
              setFormData({
                name: '',
                formula: '',
                quantity: '',
                lotNumber: '',
                concentration: '',
                description: '',
                firstAid: '',
                safeHandling: '',
                hazardPictograms: [],
                hazardPhrases: []
              });
              setErrors({});
            }
          }}
        >
          <FaTimes className="mr-2" /> Cancelar
        </button>
        <button 
          type="submit" 
          className={`btn btn-primary btn-lg ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting || success}
        >
          {!isSubmitting && <FaCheck className="mr-2" />}
          {success ? '¡Registrado!' : 'Registrar Reactivo'}
        </button>
      </div>
      
      {success && (
        <div className="alert alert-success shadow-lg mt-6">
          <div>
            <FaCheck className="text-xl" />
            <span>Reactivo registrado exitosamente!</span>
          </div>
        </div>
      )}

      {errors.submit && (
        <div className="alert alert-error shadow-lg mt-6">
          <div>
            <FaTimes className="text-xl" />
            <span>{errors.submit}</span>
          </div>
        </div>
      )}
    </form>
  );
};


export default FormPage;