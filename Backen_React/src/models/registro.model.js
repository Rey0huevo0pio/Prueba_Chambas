//  Reactivos.model.js
import mongoose from "mongoose";
import { type } from "os";

const  ReactivosSchema = new mongoose.Schema(
  {
    controlNumber: {
      type: String,
      require: true,

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
    imagenReactivo:{
      type: String,
      require:true,

    },
    imagenSimbolo:{
      type: String,
      require:true,
    },
    nombre:{
      require: true,
      type: String,
    },

    formula:{
        require: true,
      type: String,
    },
    cantidad:{
        require: true,
      type: String,
    },
    numeroLote:{
        require: true,
      type: String,
    },
    concentracion:{
        require: true,
      type: String,
    },
    descripcion:{
        require: true,
      type: String,
    },
    primerosAuxilios:{
        require: true,
      type: String,
    },
    manejoSeguro:{
        require: true,
      type: String,
    },
    pictogramasPeligro:{
        require: true,
      type: [String],
    },
    frasesPeligro:{
        require: true,
      type: [String],
    }

  },

  { timestamps: true }
);

const Reactivos = mongoose.model("Reactivos",  ReactivosSchema);

export default  Reactivos;
