import express from 'express';

import {
  Registro_Reactivo,
  buscarReactivos,
  obtenerReactivoPorCodigo,
  actualizarReactivo,
  eliminarReactivo

} from '../controller/Registro.controller.js';

import { checkPermissions } from '../middleware/checkPermissions.js';

const router = express.Router();

// Rutas para reactivos
router.post('/reactivos', checkPermissions({ registro: true }), Registro_Reactivo);
router.get('/reactivos/search', checkPermissions({ registro: true }), buscarReactivos);
router.get('/reactivos/:codigo', checkPermissions({ registro: true }), obtenerReactivoPorCodigo);

router.put('/reactivos/:codigo', checkPermissions({ registro: true }), actualizarReactivo);


router.delete('/reactivos/:codigo', checkPermissions({ registro: true }), eliminarReactivo);


export default router;