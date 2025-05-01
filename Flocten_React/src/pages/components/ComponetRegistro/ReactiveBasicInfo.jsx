const ReactiveBasicInfo = ({ reactiveData, onInputChange }) => (
    <div className="space-y-4 font-bold">
      <div>
        <label className="block text-lg font-bold text-base-content">Código*</label>
        <input
          type="text"
          name="codigo"
          value={reactiveData.codigo}
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
  
      <div>
        <label className="block text-lg font-bold text-base-content">Nombre*</label>
        <input
          type="text"
          name="nombre"
          value={reactiveData.nombre}
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
  
      <div>
        <label className="block text-lg font-bold text-base-content">Fórmula</label>
        <input
          type="text"
          name="formula"
          value={reactiveData.formula}
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
  
      <div>
        <label className="block text-lg font-bold text-base-content">Cantidad</label>
        <input
          type="text"
          name="cantidad"
          value={reactiveData.cantidad}
          onChange={onInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
  
  export default ReactiveBasicInfo;