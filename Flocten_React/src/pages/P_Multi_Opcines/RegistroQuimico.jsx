
import ReactiveSearch from '../components/ComponetRegistro/ReactiveSearch';
import ReactiveBasicInfo from '../components/ComponetRegistro/ReactiveBasicInfo';
import ReactiveAdditionalInfo from '../components/ComponetRegistro/ReactiveAdditionalInfo';
import ImageUploader from '../components/ComponetRegistro/ImageUploader';
import TextAreaField from '../components/ComponetRegistro/TextAreaField';
import HazardPictograms from '../components/ComponetRegistro/HazardPictograms';
import HazardPhrases from '../components/ComponetRegistro/HazardPhrases';

import { useReactiveForm } from '../hooks/hooksRegistro/useReactiveForm';



const EditReactiveForm = ({ reactiveId, onClose }) => {
  const {
    // Estados
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
    
    // Handlers
    handleSearch,
    handleSelectReactive,
    handleInputChange,
    handlePictogramToggle,
    handleHazardPhraseToggle,
    handleImageUpload,
    handleSubmit,
    setSearchTerm,
    setShowSearchResults
  } = useReactiveForm(reactiveId, onClose);

  if (loading) {
    return (
      <div className="container mx-auto pt-8 max-w-7xl">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-4 text-lg">Cargando datos del reactivo...</span>
        </div>
      </div>
    );
  }

  return (

    /*  min-h-screen bg-gradient-to-br from-base-100 to-base-200 p-4 md:p-8 flex justify-center items-start
     */

    <div className="pt-8 bg-gradient-to-br from-base-100 to-base-200">
  
    <div className="container mx-auto max-w-7xl font-bold ">

      <h2 className="text-2xl font-bold mb-6">Editar Reactivo</h2>
      
      <ReactiveSearch 
        searchTerm={searchTerm}
        searchResults={searchResults}
        showSearchResults={showSearchResults}
        searchLoading={searchLoading}
        error={error}
        success={success}
        onSearchTermChange={setSearchTerm}
        onSearch={handleSearch}
        onSelectReactive={handleSelectReactive}
        onShowResultsChange={setShowSearchResults}
      />

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


      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReactiveBasicInfo 
            reactiveData={reactiveData} 
            onInputChange={handleInputChange} 
          />
          
          <ReactiveAdditionalInfo 
            reactiveData={reactiveData} 
            onInputChange={handleInputChange} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploader 
            label="Imagen del Reactivo"
            fieldName="imagenReactivo"
            imageUrl={reactiveData.imagenReactivo}
            uploadProgress={uploadProgress}
            onImageUpload={handleImageUpload}
          />
          
          <ImageUploader 
            label="Imagen del Símbolo"
            fieldName="imagenSimbolo"
            imageUrl={reactiveData.imagenSimbolo}
            uploadProgress={uploadProgress}
            onImageUpload={handleImageUpload}
          />
        </div>

        <TextAreaField 
          label="Descripción"
          name="descripcion"
          value={reactiveData.descripcion}
          onChange={handleInputChange}
          rows={3}
        />

        <TextAreaField 
          label="Primeros Auxilios"
          name="primerosAuxilios"
          value={reactiveData.primerosAuxilios}
          onChange={handleInputChange}
          rows={3}
        />

        <TextAreaField 
          label="Manejo Seguro"
          name="manejoSeguro"
          value={reactiveData.manejoSeguro}
          onChange={handleInputChange}
          rows={3}
        />

        <HazardPictograms 
          selectedPictograms={reactiveData.pictogramasPeligro}
          onPictogramToggle={handlePictogramToggle}
        />

        <HazardPhrases 
          selectedPhrases={reactiveData.frasesPeligro}
          onPhraseToggle={handleHazardPhraseToggle}
        />

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
    </div>
  );
};

export default EditReactiveForm;