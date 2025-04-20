import Reactivos from "../models/registro.model.js";

// Registrar nuevo reactivo (ya lo tenías)
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
    
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: errores
      });
    }

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

// Obtener todos los reactivos
// Buscar reactivos por término (código o nombre)
export const buscarReactivos = async (req, res) => {
  try {
    const { term } = req.query;
    
    if (!term || term.length < 2) {
      return res.status(400).json({
        success: false,
        message: "El término de búsqueda debe tener al menos 2 caracteres"
      });
    }
    
    const reactivos = await Reactivos.find({
      $or: [
        { codigo: { $regex: term, $options: 'i' } },
        { nombre: { $regex: term, $options: 'i' } }
      ]
    }).limit(10); // Limita los resultados
    
    res.status(200).json({
      success: true,
      count: reactivos.length,
      data: reactivos
    });
  } catch (error) {
    console.error("Error al buscar reactivos:", error);
    res.status(500).json({
      success: false,
      message: "Error al buscar reactivos",
      error: error.message
    });
  }
};

// Obtener un reactivo por código
export const obtenerReactivoPorCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    
    const reactivo = await Reactivos.findOne({ codigo });
    
    if (!reactivo) {
      return res.status(404).json({
        success: false,
        message: "Reactivo no encontrado"
      });
    }
    
    res.status(200).json({
      success: true,
      data: reactivo
    });
  } catch (error) {
    console.error("Error al obtener reactivo:", error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el reactivo",
      error: error.message
    });
  }
};

// Actualizar un reactivo por código
export const actualizarReactivo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const datosActualizados = req.body;
    
    // Verificar si el reactivo existe
    const reactivoExistente = await Reactivos.findOne({ codigo });
    if (!reactivoExistente) {
      return res.status(404).json({
        success: false,
        message: "Reactivo no encontrado"
      });
    }
    
    // Verificar si se intenta cambiar el código a uno que ya existe
    if (datosActualizados.codigo && datosActualizados.codigo !== codigo) {
      const codigoExistente = await Reactivos.findOne({ codigo: datosActualizados.codigo });
      if (codigoExistente) {
        return res.status(400).json({
          success: false,
          message: "El nuevo código ya está en uso por otro reactivo"
        });
      }
    }
    
    // Actualizar el reactivo
    const reactivoActualizado = await Reactivos.findOneAndUpdate(
      { codigo },
      datosActualizados,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: "Reactivo actualizado correctamente",
      data: reactivoActualizado
    });
  } catch (error) {
    console.error("Error al actualizar reactivo:", error);
    
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Error de validación",
        errors: errores
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Error al actualizar el reactivo",
      error: error.message
    });
  }
};

// Eliminar un reactivo por código
export const eliminarReactivo = async (req, res) => {
  try {
    const { codigo } = req.params;
    
    const reactivoEliminado = await Reactivos.findOneAndDelete({ codigo });
    
    if (!reactivoEliminado) {
      return res.status(404).json({
        success: false,
        message: "Reactivo no encontrado"
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Reactivo eliminado correctamente",
      data: reactivoEliminado
    });
  } catch (error) {
    console.error("Error al eliminar reactivo:", error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el reactivo",
      error: error.message
    });
  }
};


