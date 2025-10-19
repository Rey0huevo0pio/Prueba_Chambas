import ReactiveSearch from "../components/ComponetRegistro/ReactiveSearch";
import ReactiveBasicInfo from "../components/ComponetRegistro/ReactiveBasicInfo";
import ReactiveAdditionalInfo from "../components/ComponetRegistro/ReactiveAdditionalInfo";
import ImageUploader from "../components/ComponetRegistro/ImageUploader";
import TextAreaField from "../components/ComponetRegistro/TextAreaField";
import HazardPictograms from "../components/ComponetRegistro/HazardPictograms";
import HazardPhrases from "../components/ComponetRegistro/HazardPhrases";
import { useReactiveForm } from "../hooks/hooksRegistro/useReactiveForm";
import Header_Ractivos from "../components/Componen_Quimico/Header_Ractivos";

const RegistroQuimico = ({ reactiveId, onClose }) => {
  const {
    // Estados
    reactiveData,
    loading,
    saving,
    deleting,
    error,
    success,
    successMessage,
    uploadProgress,
    searchTerm,
    searchResults,
    showSearchResults,
    searchLoading,
    showDeleteConfirm,

    // Handlers
    handleSearch,
    handleSelectReactive,
    handleInputChange,
    handlePictogramToggle,
    handleHazardPhraseToggle,
    handleImageUpload,
    handleSubmit,
    handleDelete,
    confirmDelete,
    cancelDelete,
    setSearchTerm,
    setShowSearchResults,
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
    <div className="pt-10 bg-gradient-to-br from-base-100 to-base-200">
      <Header_Ractivos />
      <div className="container mx-auto max-w-7xl font-bold ">
        <h2 className="text-2xl font-bold mb-6">
          {reactiveData.codigo ? 'Editar Reactivo' : 'Registrar Nuevo Reactivo'}
        </h2>

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
            {successMessage}
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

          <div className="flex justify-between items-center pt-6">
            {/* Botón de eliminar a la izquierda - solo se muestra cuando hay un reactivo cargado */}
            {reactiveData.codigo && (
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting || saving}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                {deleting ? "Eliminando..." : "Eliminar Reactivo"}
              </button>
            )}

            {/* Botones de acción a la derecha */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={saving || deleting}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving || deleting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {saving ? "Guardando..." : reactiveData.codigo ? "Guardar Cambios" : "Registrar Reactivo"}
              </button>
            </div>
          </div>
        </form>

        {/* Modal de confirmación para eliminar */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h3 className="text-lg font-bold text-red-600 mb-2">Confirmar Eliminación</h3>
              <p className="text-gray-700 mb-4">
                ¿Estás seguro de que deseas eliminar el reactivo "{reactiveData.nombre}"? 
                Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  disabled={deleting}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting ? "Eliminando..." : "Sí, Eliminar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroQuimico;