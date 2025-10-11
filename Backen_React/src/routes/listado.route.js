import express from 'express';
import Reactivos from '../models/registro.model.js';
import User from '../models/user.model.js';
import Herramienta from '../models/Herramienta.model.js';



const router = express.Router();

router.get('/Registro_Herramienta', async (req, res) => {
  try {
    const herramienta= await Herramienta.find();
    res.json(herramienta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener todos los reactivos
router.get('/reactivos', async (req, res) => {
  try {
    const reactivos = await Reactivos.find();
    res.json(reactivos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/usuarios', async (req, res) => {
  try {
    const users = await User.find({}, 'fullName controlNumber profilePic'); // Trae los dos campos en una sola consulta

    const data = users.map(user => ({
      fullName: user.fullName,
      controlNumber: user.controlNumber,
      profilePic: user.profilePic
    }));

    res.json(data); // Envía un solo JSON con nombre y número de control juntos
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;