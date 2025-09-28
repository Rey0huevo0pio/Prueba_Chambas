import React, { useState } from 'react';
import { Link } from "react-router"
const Re_Software= () => {
  const [itemType, setItemType] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [randomCode, setRandomCode] = useState('');
  const [photos, setPhotos] = useState(null);
  const [accessories, setAccessories] = useState({
    mouse: false,
    keyboard: false,
    none: false,
  });

  // Función para generar código aleatorio (ejemplo simple)
  const generateRandomCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setRandomCode(code);
  };

  // Manejar cambios en accesorios
  const handleAccessoryChange = (e) => {
    const { name, checked } = e.target;
    setAccessories((prev) => ({ ...prev, [name]: checked }));
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos, por ejemplo, a una API
    console.log({
      itemType,
      name,
      description,
      serialNumber,
      randomCode,
      photos,
      ...(itemType === 'computadora' && { accessories }),
    });
    // Resetear formulario si es necesario
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-primary-content shadow-md rounded-lg">
   <div className='pt-32' >
        <Link to="/Registro_General">
        regresa
      </Link>
    </div>
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario de Registro de Equipos</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selección de tipo de ítem */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tipo de Equipo</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="computadora">Computadora</option>
            <option value="regulador">Regulador</option>
            <option value="clima">Clima (Aire Acondicionado)</option>
            <option value="proyector">Proyector</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        {/* Campos comunes */}
        {itemType && (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nombre</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Descripción del Estado</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Número de Serie</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Código Aleatorio</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={randomCode}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={generateRandomCode}
                >
                  Generar
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Fotos</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                multiple
                onChange={(e) => setPhotos(e.target.files)}
              />
            </div>

            {/* Campos específicos por tipo */}
            {itemType === 'computadora' && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Accesorios</span>
                </label>
                <div className="space-y-2">
                  <label className="cursor-pointer label">
                    <span className="label-text">Ratón</span>
                    <input
                      type="checkbox"
                      name="mouse"
                      checked={accessories.mouse}
                      onChange={handleAccessoryChange}
                      className="checkbox checkbox-primary"
                    />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text">Teclado</span>
                    <input
                      type="checkbox"
                      name="keyboard"
                      checked={accessories.keyboard}
                      onChange={handleAccessoryChange}
                      className="checkbox checkbox-primary"
                    />
                  </label>
                  <label className="cursor-pointer label">
                    <span className="label-text">Ninguno</span>
                    <input
                      type="checkbox"
                      name="none"
                      checked={accessories.none}
                      onChange={handleAccessoryChange}
                      className="checkbox checkbox-primary"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Para otros tipos, puedes agregar campos específicos si es necesario */}
            {/* Por ahora, solo campos comunes para regulador, clima, proyector, otro */}

            <button type="submit" className="btn btn-primary w-full mt-4">
              Registrar
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Re_Software;