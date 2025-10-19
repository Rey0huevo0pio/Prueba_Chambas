export const reactivoUtils = {
  // Manejo de errores centralizado
  manejarError: (error, res) => {
    console.error("Error:", error);

    if (error.name === "ValidationError") {
      const errores = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: errores,
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "El código del reactivo ya existe",
      });
    }

    if (error.message.includes('no encontrado')) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message.includes('ya está') || error.message.includes('faltantes')) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error.message,
    });
  },

  // Formatear respuesta exitosa
  respuestaExitosa: (res, mensaje, data = null, statusCode = 200) => {
    const respuesta = {
      success: true,
      message: mensaje,
    };

    if (data) {
      if (Array.isArray(data)) {
        respuesta.count = data.length;
        respuesta.data = data;
      } else {
        respuesta.data = data;
      }
    }

    return res.status(statusCode).json(respuesta);
  }
};