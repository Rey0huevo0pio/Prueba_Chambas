import express from "express";

import {
  Registro_Reactivo,
  buscarReactivos,
  obtenerReactivoPorCodigo,
  actualizarReactivo,
  eliminarReactivo,
} from "../controller/Registro_Reactivos/Registro.controller.js";

import { Registro_Herramienta } from "../controller/Registro_Material/Registro_MaterialL.controller.js";

const router = express.Router();

router.post("/reactivos", Registro_Reactivo);
router.get("/reactivos/search", buscarReactivos);
router.get("/reactivos/:codigo", obtenerReactivoPorCodigo);

router.put("/reactivos/:codigo", actualizarReactivo);

router.delete("/reactivos/:codigo", eliminarReactivo);
router.post("/herramientas", Registro_Herramienta);

export default router;
