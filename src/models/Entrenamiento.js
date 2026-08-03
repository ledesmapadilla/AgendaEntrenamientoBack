import { Schema, model } from "mongoose";

const EntrenamientoSchema = new Schema(
  {
    fecha:         { type: String, required: true, trim: true }, // formato YYYY-MM-DD
    actividad:     { type: String, trim: true, default: "" },    // Natación pileta, Gimnasio, etc.
    grupo:         { type: String, trim: true, default: "" },    // alias para compatibilidad
    observaciones: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

EntrenamientoSchema.index({ fecha: 1 });

export default model("Entrenamiento", EntrenamientoSchema);
