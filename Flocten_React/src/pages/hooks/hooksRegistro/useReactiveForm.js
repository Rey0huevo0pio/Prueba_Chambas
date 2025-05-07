import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../../store/useAuthStore';
import { HAZARD_PICTOGRAMS, HAZARD_PHRASES } from '../../constants/index.js';

export const useReactiveForm = (reactiveId, onClose = () => {}) => {

  const { authUser } = useAuthStore();
  const [reactiveData, setReactiveData] = useState({
    codigo: '',
    nombre: '',
    imagenReactivo: '',
    imagenSimbolo: '',
    formula: '',
    cantidad: '',
    numeroLote: '',
    concentracion: '',
    descripcion: '',
    primerosAuxilios: '',
    manejoSeguro: '',
    pictogramasPeligro: [],
    frasesPeligro: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (!reactiveId || reactiveId === '') {
     setLoading(false);
      return;
    }

    const fetchReactiveData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.106.102:5001/api/reactivos/${reactiveId}`,
          { headers: { 'Authorization': `Bearer ${authUser?.token}` } }
        );
        setReactiveData(response.data.data || response.data);
        setLoading(false);
      } catch (err) {
        setError(`Error al cargar el reactivo: ${err.response?.data?.message || err.message}`);
        console.error("Error details:", err);
        setLoading(false);
      }
    };
  
    fetchReactiveData();
  }, [reactiveId, authUser?.token]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Por favor ingrese un término de búsqueda");
      return;
    }

    setSearchLoading(true);
    try {
      const response = await axios.get(
        `http://192.168.106.102:5001/api/reactivos/search?term=${searchTerm}`,
        { headers: { 'Authorization': `Bearer ${authUser?.token}` } }
      );
      setSearchResults(response.data.data || response.data);
      setShowSearchResults(true);
      setError(null);
    } catch (err) {
      setError(`Error al buscar reactivos: ${err.response?.data?.message || err.message}`);
      console.error(err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectReactive = (reactive) => {
    setReactiveData(reactive);
    setShowSearchResults(false);
    setSearchTerm('');
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReactiveData(prev => ({ ...prev, [name]: value }));
  };

  const handlePictogramToggle = (pictogramId) => {
    setReactiveData(prev => ({
      ...prev,
      pictogramasPeligro: prev.pictogramasPeligro.includes(pictogramId)
        ? prev.pictogramasPeligro.filter(id => id !== pictogramId)
        : [...prev.pictogramasPeligro, pictogramId]
    }));
  };

  const handleHazardPhraseToggle = (phraseCode) => {
    setReactiveData(prev => ({
      ...prev,
      frasesPeligro: prev.frasesPeligro.includes(phraseCode)
        ? prev.frasesPeligro.filter(code => code !== phraseCode)
        : [...prev.frasesPeligro, phraseCode]
    }));
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploadProgress(0);
      const response = await axios.post(
        'http://192.168.100.19:5001/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${authUser?.token}`
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        }
      );

      setReactiveData(prev => ({ ...prev, [fieldName]: response.data.imageUrl }));
      setError(null);
    } catch (err) {
      setError(`Error al subir la imagen: ${err.response?.data?.message || err.message}`);
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reactiveData.codigo) {
      setError("El código del reactivo es requerido");
      return;
    }

    setSaving(true);
    setError(null);
    
    try {
      const dataToSend = {
        ...reactiveData,
        controlNumber: authUser.controlNumber
      };

      await axios.put(
        `http://192.168.100.19:5001/api/reactivos/${reactiveData.codigo}`,
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser?.token}`
          }
        }
      );

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 8000);
    } catch (err) {
      setError(`Error al guardar los cambios: ${err.response?.data?.message || err.message}`);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return {
    reactiveData,
    loading,
    saving,
    error,
    success,
    uploadProgress,
    searchTerm,
    searchResults,
    showSearchResults,
    searchLoading,
    handleSearch,
    handleSelectReactive,
    handleInputChange,
    handlePictogramToggle,
    handleHazardPhraseToggle,
    handleImageUpload,
    handleSubmit,
    setSearchTerm,
    setShowSearchResults
  };
};