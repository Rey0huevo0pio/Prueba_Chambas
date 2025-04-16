import express from "express";
import{Registro_Reactivo} from "../controller/Registro.controller.js"

const router = express.Router();

router.post("/RegistroReactivo",Registro_Reactivo);


export default router;