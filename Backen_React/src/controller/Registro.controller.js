import Reactivos from "../models/registro.model.js";

export const Registro_Reactivo = async (req, res) => {
  try {
    const {
      controlNumber,
      codigo,
      imagenReactivo,
      imagenSimbolo,
      nombre,
      formula,
      cantidad,
      numeroLote,
      concentracion,
      descripcion,
      primerosAuxilios,
      manejoSeguro,
      pictogramasPeligro,
      frasesPeligro
    } = req.body;

    // Validación de campos requeridos
    const camposRequeridos = {
      controlNumber,
      codigo,
      imagenReactivo,
      imagenSimbolo,
      nombre,
      formula,
      cantidad,
      numeroLote,
      concentracion,
      descripcion,
      primerosAuxilios,
      manejoSeguro,
      pictogramasPeligro,
      frasesPeligro
    };

    for (const [campo, valor] of Object.entries(camposRequeridos)) {
      if (!valor) {
        return res.status(400).json({ 
          success: false,
          message: `El campo ${campo} es obligatorio`,
          campoFaltante: campo
        });
      }
    }

    // Verificar si ya existe un reactivo con ese código
    const reactivoExistente = await Reactivos.findOne({ codigo });
    if (reactivoExistente) {
      return res.status(400).json({ 
        success: false,
        message: "El código ya está registrado" 
      });
    }

    // Crear y guardar nuevo reactivo
    const nuevoReactivo = new Reactivos({
      controlNumber,
      codigo,
      imagenReactivo,
      imagenSimbolo,
      nombre,
      formula,
      cantidad,
      numeroLote,
      concentracion,
      descripcion,
      primerosAuxilios,
      manejoSeguro,
      pictogramasPeligro: Array.isArray(pictogramasPeligro) ? pictogramasPeligro : [pictogramasPeligro],
      frasesPeligro: Array.isArray(frasesPeligro) ? frasesPeligro : [frasesPeligro]
    });

    await nuevoReactivo.save();

    res.status(201).json({ 
      success: true,
      message: "Reactivo registrado correctamente",
      data: nuevoReactivo
    });

  } catch (error) {
    console.error("Error en registro:", error);
    
    // Manejar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: errores
      });
    }

    // Manejar errores de duplicados
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "El código del reactivo ya existe"
      });
    }

    res.status(500).json({ 
      success: false,
      message: "Error del servidor",
      error: error.message 
    });
  }
};