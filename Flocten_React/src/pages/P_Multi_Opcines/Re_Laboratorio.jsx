import React, { useState, useEffect } from 'react';
import { FaSync, FaInfoCircle, FaTimes } from "react-icons/fa";
import axios from 'axios';
import LogUp from "../../public/img/LogUp.png";
import LaBoritiLog from "../../public/img/LaBoritiLog.png";
import useGeneratedCode from '../hooks/useGeneratedCode';
import useImageModal from '../hooks/useImageModal';
import ImageDisplay from '../components/ImageDisplay';
import { useAuthStore } from '../../store/useAuthStore';
import { User2 } from 'lucide-react';
import CustomFormInput from '../components/CustomFormInput';
import DangerPictogram from '../components/DangerPictogram';

const HAZARD_PICTOGRAMS = [
  { id: 'flammable', label: 'Inflamable', icon: '🔥' },
  { id: 'toxic', label: 'Tóxico', icon: '☠️' },
  { id: 'corrosive', label: 'Corrosivo', icon: '⚠️' },
  { id: 'explosive', label: 'Explosivo', icon: '💥' },
  { id: 'oxidizing', label: 'Oxidante', icon: '⚡' },
  { id: 'health-hazard', label: 'Peligro para la salud', icon: '🚑' },
  { id: 'environment', label: 'Peligro ambiental', icon: '🌍' },
];

const HAZARD_PHRASES = [
  { code: 'H315', text: 'Causa irritación cutánea' },
  { code: 'H318', text: 'Provoca graves lesiones oculares' },
  { code: 'H335', text: 'Puede irritar las vías respiratorias' },
  { code: 'H301', text: 'Tóxico en caso de ingestión' },
  { code: 'H311', text: 'Tóxico en contacto con la piel' },
  { code: 'H370', text: 'Provoca daños en los órganos' },
];

const Re_Laboratorio = () => {
  const { authUser } = useAuthStore();
  const { codigo, generarCodigo } = useGeneratedCode();
  const { modalOpen, selectedImage, closeModal } = useImageModal();

  const [reactivoImg, setReactivoImg] = useState(LogUp);
  const [simboloImg, setSimboloImg] = useState(LaBoritiLog);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [authChecked, setAuthChecked] = useState(false);

  const initialFormData = {
    nombre: '',
    formula: '',
    cantidad: '',
    numeroLote: '',
    concentracion: '',
    descripcion: '',
    primerosAuxilios: '',
    manejoSeguro: '',
    pictogramasPeligro: [],
    frasesPeligro: []
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authUser && authUser.controlNumber) {
      setAuthChecked(true);
    }
  }, [authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validación
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
    if (!formData.formula) newErrors.formula = "Fórmula es requerida";
    if (!formData.primerosAuxilios) newErrors.primerosAuxilios = "Primeros auxilios es requerido";
    if (!formData.manejoSeguro) newErrors.manejoSeguro = "Manipulación segura es requerida";
    if (!authUser?.controlNumber) newErrors.general = "No se pudo obtener el número de control del usuario";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const dataToSend = {
        controlNumber: authUser.controlNumber, // Cambiado a controlNumber
        codigo: codigo,
        imagenReactivo: reactivoImg,
        imagenSimbolo: simboloImg,
        nombre: formData.nombre,
        formula: formData.formula,
        cantidad: formData.cantidad || "No especificado",
        numeroLote: formData.numeroLote || "No especificado",
        concentracion: formData.concentracion || "No especificado",
        descripcion: formData.descripcion || "No especificado",
        primerosAuxilios: formData.primerosAuxilios,
        manejoSeguro: formData.manejoSeguro,
        pictogramasPeligro: formData.pictogramasPeligro,
        frasesPeligro: formData.frasesPeligro
      };

      console.log("Datos a enviar:", dataToSend);

      const response = await axios.post(
        "http://192.168.100.16:5001/api/reactivos", 
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser?.token}`
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        }
      );

      if (response.data.success) {
        alert("✅ Reactivo registrado correctamente");
        setFormData(initialFormData);
        generarCodigo();
      } else {
        throw new Error(response.data.message || "Error en el servidor");
      }
    } catch (error) {
      console.error("❌ Error al registrar reactivo:", error);
      
      let errorMessage = "❌ Error al registrar reactivo";
      if (error.response) {
        console.log("Detalles del error del servidor:", error.response.data);
        if (error.response.data?.message) {
          errorMessage = `❌ ${error.response.data.message}`;
        } else if (error.response.data?.errors) {
          const validationErrors = Object.values(error.response.data.errors).join("\n");
          errorMessage = `Errores de validación:\n${validationErrors}`;
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Verificando autenticación...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-8 md:pt-24 flex justify-center items-start" >
      <div className=" max-w-5xl bg-base-100 rounded-xl shadow-2xl overflow-hidden"  >
        {/* Encabezado */}
        <div className="bg-gradient-to-r from-primary to-base-content p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-1">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-16 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
                  <img src={LaBoritiLog} alt="Logo Laboratorio" />
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-base-100">
                Registro de Nuevo Reactivo
              </h1>
            </div>
            <div className="flex items-center gap-2">
            <div className="px-5 py-2 bg-blue-50 rounded-full inline-flex items-center gap-2 border border-blue-100">
  <span className="text-blue-600 text-base font-black">Codigo:</span>
  <span className="font-mono font-bold text-blue-800">{codigo}</span>
</div>
              <button onClick={generarCodigo} className="btn btn-outline btn-primary">
                <FaSync className="mr-2" /> Refrescar Código
              </button>
            </div>
          </div>
        </div>

        {/* Número de control */}
        <div className="space-y-1.5">
          <p className="px-4 py-2.5 bg-base-200 rounded-lg border flex items-center gap-2">
            <User2 className="w-4 h-4" />
            Número de Control: {authUser?.controlNumber || "No disponible"}
          </p>
          {errors.general && (
            <div className="alert alert-error mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errors.general}</span>
            </div>
          )}
        </div>

        {/* Contenido principal */}
        <div className="p-6 md:p-8 space-y-6 font-bold">
          {/* Sección de imágenes */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-6 bg-base-200 p-6 rounded-box">
            <ImageDisplay
              src={reactivoImg}
              alt="Reactivo"
              label="Imagen del Reactivo"
              allowUpload
              onImageChange={setReactivoImg}
            />
            <ImageDisplay
              src={simboloImg}
              alt="Símbolo de Reactivo"
              label="Símbolo de Peligro"
              ringColor="secondary"
              allowUpload
              onImageChange={setSimboloImg}
            />
          </div>

          {/* Modal para vista de imágenes */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeModal}>
              <div className="relative max-w-4xl max-h-full">
                <img 
                  src={selectedImage} 
                  alt="Ampliación" 
                  className="max-w-full max-h-[90vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <button 
                  className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-8 ">
            {/* Sección 1: Nombre y fórmula */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-11 max-w-full">
              <CustomFormInput 
                label="Nombre del Reactivo" 
                name="nombre"
                placeholder="Ej: Cloruro de sodio"
                value={formData.nombre}
                onChange={handleChange}
                error={errors.nombre}
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
      
            {/* Sección 2: Cantidad, lote y concentración */}
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
      
      
            {/* Primeros auxilios y manejo seguro */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-10 ml-1 max-w-full ">


            {/* Descripción */}
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
            <div className="collapse collapse-plus bg-base-200 ">
              <input type="checkbox" defaultChecked />
              <div className="collapse-title text-xl font-medium flex items-center">
                <FaInfoCircle className="mr-2 text-primary" />
                Información Adicional de Peligros
              </div>
              <div className="collapse-content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  {/* Pictogramas de peligro */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Pictogramas de Peligro</span>
                    </label>
                    <div className="flex flex-wrap gap-4">
                      {HAZARD_PICTOGRAMS.map((pictogram) => (
                        <div key={pictogram.id} className="tooltip" data-tip={pictogram.label}>
                          <DangerPictogram
                            selected={formData.pictogramasPeligro.includes(pictogram.id)}
                            onClick={() => togglePictogram(pictogram.id)}
                          >
                            {pictogram.icon}
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
      
            {/* Botones de acción */}
            <div className="flex flex-col md:flex-row justify-end gap-4 pt-6">
              <button 
                type="button" 
                className="btn btn-outline btn-error btn-lg"
                onClick={() => {
                  if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
                    setFormData(initialFormData);
                    setErrors({});
                  }
                }}
              >
                <FaTimes className="mr-2" /> Cancelar
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    {uploadProgress > 0 && `Subiendo... ${uploadProgress}%`}
                  </>
                ) : (
                  'Guardar Reactivo'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Re_Laboratorio;