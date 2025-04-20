import express from 'express';
import {
  Registro_Reactivo,
  buscarReactivos,
  obtenerReactivoPorCodigo,
  actualizarReactivo,
  eliminarReactivo
} from '../controller/Registro.controller.js';

const router = express.Router();

// Rutas para reactivos
router.post('/reactivos', Registro_Reactivo);
router.get('/reactivos/search', buscarReactivos);
router.get('/reactivos/:codigo', obtenerReactivoPorCodigo);
router.put('/reactivos/:codigo', actualizarReactivo);
router.delete('/reactivos/:codigo', eliminarReactivo);

export default router;