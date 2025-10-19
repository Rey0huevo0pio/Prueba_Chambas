export const reactivoValidator = {
  // Validar campos requeridos
  validarCamposRequeridos: (datos) => {
    const camposRequeridos = [
      "controlNumber",
      "fullName",
      "codigo",
      "imagenReactivo",
      "imagenSimbolo",
      "nombre",
      "formula",
      "cantidad",
      "numeroLote",
      "concentracion",
      "descripcion",
      "primerosAuxilios",
      "manejoSeguro",
      "pictogramasPeligro",
      "frasesPeligro",
    ];

    const camposFaltantes = camposRequeridos.filter((campo) => !datos[campo]);

    if (camposFaltantes.length > 0) {
      throw new Error(
        `Campos requeridos faltantes: ${camposFaltantes.join(", ")}`
      );
    }
  },

  // Validar término de búsqueda
  validarTerminoBusqueda: (termino) => {
    if (!termino || termino.length < 2) {
      throw new Error(
        "El término de búsqueda debe tener al menos 2 caracteres"
      );
    }
  },
};
