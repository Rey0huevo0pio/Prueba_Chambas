import { useState } from 'react';
import axios from 'axios';
import { INITIAL_FORM_DATA } from '../constants/constants';

const useLabForm = (authUser, codigo, itemType, reactivoImg, simboloImg) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePictogram = (pictogramId) => {
    setFormData(prev => ({
      ...prev,
      pictogramasPeligro: prev.pictogramasPeligro.includes(pictogramId)
        ? prev.pictogramasPeligro.filter(id => id !== pictogramId)
        : [...prev.pictogramasPeligro, pictogramId]
    }));
  };

  const toggleHazardPhrase = (phraseCode) => {
     setFormData(prev => ({
      ...prev,
      frasesPeligro: prev.frasesPeligro.includes(phraseCode)
        ? prev.frasesPeligro.filter(code => code !== phraseCode)
        : [...prev.frasesPeligro, phraseCode]
    }));
  };
  
  const resetForm = () => {
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
  };

  // La función ya no recibe 'e' porque el componente padre se encarga del preventDefault
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    // Lógica de validación
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
    if (!authUser?.controlNumber) newErrors.general = "No se pudo obtener el número de control";
    if (!authUser?.fullName) newErrors.general = "No se pudo obtener el Nombre del usuario";

    // Aquí puedes agregar el resto de tus validaciones...
    if (itemType === 'reactivo') {
      if (!formData.formula) newErrors.formula = "Fórmula es requerida";
      if (!formData.primerosAuxilios) newErrors.primerosAuxilios = "Primeros auxilios es requerido";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return false; // Detiene la ejecución si hay errores
    }

    try {
      let dataToSend;
      let endpoint = '';
      
      const baseData = {
        controlNumber: authUser.controlNumber,
        fullName: authUser.fullName,
        codigo: codigo,
        nombre: formData.nombre,
        cantidad: formData.cantidad || "No especificado",
        numeroLote: formData.numeroLote || "No especificado",
        descripcion: formData.descripcion || "No especificado",
      };

      if (itemType === 'reactivo') {
        endpoint = "/api/reactivos";
        dataToSend = {
          ...baseData,
          imagenReactivo: reactivoImg,
          imagenSimbolo: simboloImg,
          formula: formData.formula,
          concentracion: formData.concentracion || "No especificado",
          primerosAuxilios: formData.primerosAuxilios,
          manejoSeguro: formData.manejoSeguro,
          pictogramasPeligro: formData.pictogramasPeligro,
          frasesPeligro: formData.frasesPeligro
        };
      } else if (itemType === 'herramienta') {
        endpoint = "/api/herramientas";
        dataToSend = {
          ...baseData,
          imagenHerramienta: reactivoImg,
          imagenAdicional: simboloImg,
          estado: formData.estado,
          numeroSerie: formData.numeroSerie || "No especificado",
          tipo: formData.tipoHerramienta === 'otros' ? formData.especificarTipo : formData.tipoHerramienta,
        };
      } else {
        setIsSubmitting(false);
        return false;
      }
      
      const response = await axios.post(`http://192.168.100.16:5001${endpoint}`, dataToSend, {
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser?.token}` 
          },
          onUploadProgress: (progressEvent) => {
             const total = progressEvent.total || 0;
             const progress = total > 0 ? Math.round((progressEvent.loaded * 100) / total) : 0;
             setUploadProgress(progress);
          }
      });

      if (response.data.success) {
        alert(`✅ ${itemType} registrado correctamente`);
        resetForm();
        return true; // Indicar éxito
      } else {
        throw new Error(response.data.message || "Error desconocido del servidor");
      }

    } catch (error) {
      console.error(`❌ Error al registrar ${itemType}:`, error);
      alert(`❌ Error al registrar ${itemType}: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
    return false; // Indicar fallo
  };

  return {
    formData,
    errors,
    isSubmitting,
    uploadProgress,
    handleChange,
    togglePictogram,
    toggleHazardPhrase,
    handleSubmit,
    resetForm,
  };
};

export default useLabForm;