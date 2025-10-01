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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Lógica de validación (idéntica a la tuya)
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
    if (!authUser?.controlNumber) newErrors.general = "No se pudo obtener el número de control";
    // ... más validaciones ...
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      let dataToSend;
      let endpoint = '';
      
      const baseData = {
        controlNumber: authUser.controlNumber,
        codigo: codigo,
        nombre: formData.nombre,
        // ... resto de datos base ...
      };

      if (itemType === 'reactivo') {
        endpoint = "/api/reactivos";
        dataToSend = { /* ... datos del reactivo ... */ };
      } else if (itemType === 'herramienta') {
        endpoint = "/api/herramientas";
        dataToSend = { /* ... datos de la herramienta ... */ };
      } else {
        setIsSubmitting(false);
        return;
      }
      
      const response = await axios.post(`http://192.168.100.16:5001${endpoint}`, dataToSend, {
          headers: { 'Authorization': `Bearer ${authUser?.token}` },
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
      }
    } catch (error) {
      console.error(`❌ Error al registrar ${itemType}:`, error);
      alert(`❌ Error al registrar ${itemType}`);
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