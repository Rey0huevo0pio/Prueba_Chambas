import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

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

const EditReactiveForm = ({ reactiveId, onClose }) => {
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
    const fetchReactiveData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.100.19:5001/api/reactivos/${reactiveId}`,
          {
            headers: {
              'Authorization': `Bearer ${authUser?.token}`
            }
          }
        );
        setReactiveData(response.data.data); // Asegúrate de acceder a response.data.data
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del reactivo');
        console.error(err);
        setLoading(false);
      }
    };
  
    fetchReactiveData();
  }, [reactiveId, authUser?.token]);

  const handleSearch = async () => {
    setSearchLoading(true);
    try {
      const response = await axios.get(
        `http://192.168.100.19:5001/api/reactivos/search?term=${searchTerm}`,
        {
          headers: {
            'Authorization': `Bearer ${authUser?.token}`
          }
        }
      );
      setSearchResults(response.data.data); // Asegúrate de acceder a response.data.data
      setShowSearchResults(true);
    } catch (err) {
      setError('Error al buscar reactivos');
      console.error(err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectReactive = (reactive) => {
    setReactiveData(reactive);
    setShowSearchResults(false);
    setSearchTerm('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReactiveData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePictogramToggle = (pictogramId) => {
    setReactiveData(prev => {
      if (prev.pictogramasPeligro.includes(pictogramId)) {
        return {
          ...prev,
          pictogramasPeligro: prev.pictogramasPeligro.filter(id => id !== pictogramId)
        };
      } else {
        return {
          ...prev,
          pictogramasPeligro: [...prev.pictogramasPeligro, pictogramId]
        };
      }
    });
  };

  const handleHazardPhraseToggle = (phraseCode) => {
    setReactiveData(prev => {
      if (prev.frasesPeligro.includes(phraseCode)) {
        return {
          ...prev,
          frasesPeligro: prev.frasesPeligro.filter(code => code !== phraseCode)
        };
      } else {
        return {
          ...prev,
          frasesPeligro: [...prev.frasesPeligro, phraseCode]
        };
      }
    });
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        'http://192.168.100.19:5001/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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

      setReactiveData(prev => ({
        ...prev,
        [fieldName]: response.data.imageUrl
      }));
    } catch (err) {
      setError('Error al subir la imagen');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      const dataToSend = {
        ...reactiveData,
        controlNumber: authUser.controlNumber
      };

      await axios.put(
        `http://192.168.100.19:5001/api/RegistroReactivo/${reactiveId}`,
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
      }, 2000);
    } catch (err) {
      setError('Error al guardar los cambios');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Cargando datos del reactivo...</div>;
  }

  return (
    <div className="container mx-auto pt-28 max-w-7xl">
      <h2 className="text-2xl font-bold mb-6">Editar Reactivo</h2>
      
      {/* Buscador de reactivos */}
      <div className="mb-6 relative">
        <div className="flex">
          <input
            type="text"
            placeholder="Buscar reactivo por código o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            className="px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {searchLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        
        {/* Resultados de búsqueda */}
        {showSearchResults && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto">
            {searchResults.length > 0 ? (
              searchResults.map((reactive) => (
                <div
                  key={reactive._id}
                  onClick={() => handleSelectReactive(reactive)}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer flex justify-between"
                >
                  <span className="font-medium">{reactive.codigo}</span>
                  <span>{reactive.nombre}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No se encontraron resultados</div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Los cambios se guardaron correctamente!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Información básica */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Código</label>
              <input
                type="text"
                name="codigo"
                value={reactiveData.codigo}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={reactiveData.nombre}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fórmula</label>
              <input
                type="text"
                name="formula"
                value={reactiveData.formula}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cantidad</label>
              <input
                type="text"
                name="cantidad"
                value={reactiveData.cantidad}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Información adicional */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Número de Lote</label>
              <input
                type="text"
                name="numeroLote"
                value={reactiveData.numeroLote}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Concentración</label>
              <input
                type="text"
                name="concentracion"
                value={reactiveData.concentracion}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha de Registro</label>
              <input
                type="text"
                value={new Date(reactiveData.createdAt).toLocaleDateString()}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Imagen del Reactivo</label>
            {reactiveData.imagenReactivo && (
              <img 
                src={reactiveData.imagenReactivo} 
                alt="Reactivo" 
                className="mt-2 h-32 object-contain border rounded"
              />
            )}
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, 'imagenReactivo')}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              accept="image/*"
            />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Imagen del Símbolo</label>
            {reactiveData.imagenSimbolo && (
              <img 
                src={reactiveData.imagenSimbolo} 
                alt="Símbolo" 
                className="mt-2 h-32 object-contain border rounded"
              />
            )}
            <input
              type="file"
              onChange={(e) => handleImageUpload(e, 'imagenSimbolo')}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              accept="image/*"
            />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={reactiveData.descripcion}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Primeros auxilios */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Primeros Auxilios</label>
          <textarea
            name="primerosAuxilios"
            value={reactiveData.primerosAuxilios}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Manejo seguro */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Manejo Seguro</label>
          <textarea
            name="manejoSeguro"
            value={reactiveData.manejoSeguro}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Pictogramas de peligro */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pictogramas de Peligro</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {HAZARD_PICTOGRAMS.map((pictogram) => (
              <div key={pictogram.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`pictogram-${pictogram.id}`}
                  checked={reactiveData.pictogramasPeligro.includes(pictogram.id)}
                  onChange={() => handlePictogramToggle(pictogram.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor={`pictogram-${pictogram.id}`} className="ml-2 flex items-center">
                  <span className="mr-1">{pictogram.icon}</span>
                  {pictogram.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Frases de peligro */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Frases de Peligro</label>
          <div className="space-y-2">
            {HAZARD_PHRASES.map((phrase) => (
              <div key={phrase.code} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id={`phrase-${phrase.code}`}
                    checked={reactiveData.frasesPeligro.includes(phrase.code)}
                    onChange={() => handleHazardPhraseToggle(phrase.code)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={`phrase-${phrase.code}`} className="font-medium text-gray-700">
                    {phrase.code}
                  </label>
                  <p className="text-gray-500">{phrase.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReactiveForm;