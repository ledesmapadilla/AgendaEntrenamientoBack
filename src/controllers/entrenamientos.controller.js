import Entrenamiento from "../models/Entrenamiento.js";

export const listar = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.fecha) filtro.fecha = req.query.fecha;
    const entrenamientos = await Entrenamiento.find(filtro).sort({ fecha: 1, createdAt: 1 });
    res.json(entrenamientos);
  } catch (e) {
    console.error("Error al listar entrenamientos:", e);
    res.status(500).json({ error: e.message });
  }
};

export const crear = async (req, res) => {
  try {
    const act = req.body.actividad || req.body.grupo || "";
    if (!req.body.fecha || !act) {
      return res.status(400).json({ error: "Fecha y actividad son requeridas" });
    }
    const data = {
      fecha: req.body.fecha,
      actividad: act,
      grupo: act,
      observaciones: req.body.observaciones || ""
    };
    const nuevo = await Entrenamiento.create(data);
    res.status(201).json(nuevo);
  } catch (e) {
    console.error("Error al crear entrenamiento:", e);
    res.status(500).json({ error: "No se pudo guardar el entrenamiento", message: e.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    const item = await Entrenamiento.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Entrenamiento no encontrado" });
    res.json({ ok: true });
  } catch (e) {
    console.error("Error al eliminar entrenamiento:", e);
    res.status(500).json({ error: e.message });
  }
};
