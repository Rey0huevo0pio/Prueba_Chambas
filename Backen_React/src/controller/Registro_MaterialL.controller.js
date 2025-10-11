

import Herramienta from "../models/Herramienta.model.js"; // <--- AÑADE ESTA LÍNEA


// 2. AÑADE ESTA NUEVA FUNCIÓN para registrar herramientas

export const Registro_Herramienta = async (req, res) => {
  try {
    const {
      controlNumber,
      fullName,
      codigo,
      imagenHerramienta,
      imagenAdicional,
      nombre,
      tipo,
      cantidad,
      numeroLote,
      numeroSerie,
      descripcion,
      estado
    } = req.body;

    // Validación simple de campos requeridos
    if (!controlNumber ||!fullName || !codigo || !nombre || !tipo || !estado) {
        return res.status(400).json({
            success: false,
            message: "Faltan campos obligatorios para registrar la herramienta."
        });
    }

    // Verificar si ya existe una herramienta con ese código
    const herramientaExistente = await Herramienta.findOne({ codigo });
    if (herramientaExistente) {
      return res.status(400).json({ 
        success: false,
        message: "El código de la herramienta ya está registrado" 
      });
    }


    const nuevaHerramienta = new Herramienta({
      controlNumber,
      fullName,
      codigo,
      imagenHerramienta,
      imagenAdicional,
      nombre,
      tipo, 
      cantidad,
      numeroLote,
      numeroSerie,
      descripcion,
      estado
    });

    await nuevaHerramienta.save();

    res.status(201).json({
      success: true,
      message: "Herramienta registrada correctamente",
      data: nuevaHerramienta
    });

  } catch (error) {
    console.error("Error en registro de herramienta:", error);
    res.status(500).json({
      success: false,
      message: "Error del servidor al registrar la herramienta",
      error: error.message
    });
  }
};