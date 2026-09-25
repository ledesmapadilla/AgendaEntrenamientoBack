import Plan from "../models/Plan.js";

export const obtenerPlan = async (req, res) => {
  try {
    let plan = await Plan.findOne({ key: "default" });
    if (!plan) {
      plan = await Plan.create({ key: "default", metrosSemanal: 0, kmSemanal: 0 });
    }
    res.json(plan);
  } catch (e) {
    console.error("Error al obtener plan:", e);
    res.status(500).json({ error: e.message });
  }
};

export const actualizarPlan = async (req, res) => {
  try {
    const metros = Number(req.body.metrosSemanal) || 0;
    const km = Number(req.body.kmSemanal) || 0;
    const plan = await Plan.findOneAndUpdate(
      { key: "default" },
      { metrosSemanal: metros, kmSemanal: km },
      { new: true, upsert: true }
    );
    res.json(plan);
  } catch (e) {
    console.error("Error al actualizar plan:", e);
    res.status(500).json({ error: e.message });
  }
};
