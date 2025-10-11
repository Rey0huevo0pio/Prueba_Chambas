// models/Herramienta.model.js

import mongoose from "mongoose";

const HerramientaSchema = new mongoose.Schema(
  {
    controlNumber: {
      type: String,
      required: true,
    },
      fullName: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
      unique: true,
    },
    imagenHerramienta: { // Corresponde a 'reactivoImg' del frontend
      type: String,
      required: true,
    },
    imagenAdicional: { // Corresponde a 'simboloImg' del frontend
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    tipo: { // Guardará el tipo de herramienta, incluyendo "otros"
      type: String,
      required: true,
    },
    cantidad: {
      type: String,
      required: true,
    },
    numeroLote: {
      type: String,
    },
    numeroSerie: {
      type: String,
    },
    descripcion: {
      type: String,
      required: true,
    },
    estado: { // Este campo es específico de herramientas
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Herramienta = mongoose.model("Herramienta", HerramientaSchema);

export default Herramienta;