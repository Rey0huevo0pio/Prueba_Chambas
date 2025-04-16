import Reactivos from "../models/registro.model.js";

export const Registro_Reactivo = async (req, res) => {
  const {
    controlNumber,
    codigo,
    name,
    formula,
    quantity,
    lotNumber,
    concentration,
    description,
    firstAid,
    safeHandling,
    hazardPictograms,
    hazardPhrases,


  } = req.body;

  try {
    // Validación de campos
    if (
      !controlNumber ||
      !codigo ||
      !name ||
      !formula ||
      !quantity ||
      !lotNumber ||
      !concentration ||
      !description ||
      !firstAid ||
      !safeHandling ||
      !hazardPictograms ||
      !hazardPhrases
    ) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
     // Verificar si ya existe un reactivo con ese código
     const existe = await Reactivos.findOne({ codigo });
     if (existe) {
       return res.status(400).json({ message: "El código ya está registrado" });
     }

    // Crear nuevo reactivo
    const nuevoReactivo = new Reactivos({
        controlNumber,
        codigo,
        name,
        formula,
        quantity,
        lotNumber,
        concentration,
        description,
        firstAid,
        safeHandling,
        hazardPictograms,
        hazardPhrases
    
    });

    // Guardar en la base de datos
    await nuevoReactivo.save();

    res.status(201).json({ message: "Reactivo registrado correctamente" });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

