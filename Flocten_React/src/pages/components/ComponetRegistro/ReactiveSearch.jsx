const ReactiveSearch = ({
    searchTerm,
    searchResults,
    showSearchResults,
    searchLoading,
    onSearchTermChange,
    onSearch,
    onSelectReactive,
    onShowResultsChange
  }) => (
    <div className="mb-6 relative ">
      <div className="flex font-bold ">
        <input
          type="text"
          placeholder="Buscar reactivo por código o nombre..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          className="flex-1 border  border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={onSearch}
          disabled={searchLoading || !searchTerm.trim()}
          className="px-4 py-2 font-bold border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {searchLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      
      {showSearchResults && (
        <div className="absolute z-10 mt-1 w-full bg-secondary-content shadow-lg rounded-md py-1 max-h-60 overflow-auto border border-gray-200">
          {searchResults.length > 0 ? (
            searchResults.map((reactive) => (
              <div
                key={reactive._id}
                onClick={() => {
                  onSelectReactive(reactive);
                  onShowResultsChange(false);
                }}
                className="px-4 py-2 hover:bg-primary-content cursor-pointer flex justify-between"
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
  );
  
  export default ReactiveSearch;