import { Schema, model } from "mongoose";

const PlanSchema = new Schema(
  {
    key:           { type: String, default: "default", unique: true },
    metrosSemanal: { type: Number, default: 0 },
    kmSemanal:     { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model("Plan", PlanSchema);
