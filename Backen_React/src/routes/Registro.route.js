import express from 'express';
import {
  Registro_Reactivo,
  buscarReactivos,
  obtenerReactivoPorCodigo,
  actualizarReactivo,
  eliminarReactivo,
  listaReactivos
} from '../controller/Registro.controller.js';

const router = express.Router();

// Rutas para reactivos
router.post('/reactivos', Registro_Reactivo);
router.get('/reactivos/search', buscarReactivos);
router.get('/reactivos/:codigo', obtenerReactivoPorCodigo);
router.get('/reactivos/lista', listaReactivos);
router.put('/reactivos/:codigo', actualizarReactivo);


router.delete('/reactivos/:codigo', eliminarReactivo);


export default router;