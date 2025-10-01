import { useState } from 'react';
import { useAuthStore } from '../../../../store/useAuthStore';
import { INITIAL_FORM_DATA } from '../constants/laboratoryConstants';
import { registerLabItem } from '../services/laboratoryService';

export const useLabForm = (itemType, codigo, onFormSuccess) => {
  const { authUser } = useAuthStore();
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSelection = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
    if (itemType === 'reactivo') {
      if (!formData.formula) newErrors.formula = "La fórmula es requerida";
      // ... más validaciones de reactivo
    } else if (itemType === 'herramienta') {
      if (!formData.descripcion) newErrors.descripcion = "La descripción es requerida";
      // ... más validaciones de herramienta
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, reactivoImg, simboloImg) => {
    e.preventDefault();
    if (!validateForm() || !authUser?.controlNumber) {
        if(!authUser?.controlNumber) alert("Error de autenticación, por favor reingresa.");
        return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    const baseData = {
      controlNumber: authUser.controlNumber,
      codigo,
      nombre: formData.nombre,
      cantidad: formData.cantidad || "N/A",
      numeroLote: formData.numeroLote || "N/A",
      descripcion: formData.descripcion || "N/A",
    };

    let dataToSend;
    if (itemType === 'reactivo') {
      dataToSend = {
        ...baseData,
        imagenReactivo: reactivoImg,
        imagenSimbolo: simboloImg,
        formula: formData.formula,
        // ... resto de campos de reactivo
      };
    } else { // 'herramienta'
      dataToSend = {
        ...baseData,
        imagenHerramienta: reactivoImg,
        imagenAdicional: simboloImg,
        estado: formData.estado,
        // ... resto de campos de herramienta
      };
    }
    
    try {
      const result = await registerLabItem({
        itemType,
        data: dataToSend,
        token: authUser.token,
        onUploadProgress: (event) => {
          const progress = event.total ? Math.round((event.loaded * 100) / event.total) : 0;
          setUploadProgress(progress);
        },
      });

      if (result.success) {
        alert(`✅ ${itemType} registrado correctamente`);
        setFormData(INITIAL_FORM_DATA);
        onFormSuccess(); // Llama a la función de éxito (ej. generar nuevo código)
      }
    } catch (error) {
      console.error(`❌ Error al registrar ${itemType}:`, error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleCancel = () => {
     if (window.confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
        setFormData(INITIAL_FORM_DATA);
        setErrors({});
      }
  }

  return {
    formData,
    errors,
    isSubmitting,
    uploadProgress,
    handleChange,
    toggleSelection,
    handleSubmit,
    handleCancel
  };
};