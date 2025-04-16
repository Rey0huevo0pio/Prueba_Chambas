//  Reactivos.model.js
import mongoose from "mongoose";

const  ReactivosSchema = new mongoose.Schema(
  {
    controlNumber: {
      type: String,
      require: true,

    },
    codigo: {
      type: String,
      required: true,
      unique: true,
    }
  },

  { timestamps: true }
);

const Reactivos = mongoose.model("Reactivos",  ReactivosSchema);

export default  Reactivos;