import express from 'express';
import Reactivos from '../models/registro.model.js';

const router = express.Router();

// Ruta para obtener todos los reactivos
router.get('/reactivos', async (req, res) => {
  try {
    const reactivos = await Reactivos.find();
    res.json(reactivos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;