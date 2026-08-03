import Entrenamiento from "../models/Entrenamiento.js";

export const listar = async (req, res) => {
  try {
    const filtro = {};
    if (req.query.fecha) filtro.fecha = req.query.fecha;
    const entrenamientos = await Entrenamiento.find(filtro).sort({ fecha: 1, createdAt: 1 });
    res.json(entrenamientos);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const crear = async (req, res) => {
  try {
    const act = req.body.actividad || req.body.grupo || "";
    const data = {
      fecha: req.body.fecha,
      actividad: act,
      grupo: act,
      observaciones: req.body.observaciones || ""
    };
    const nuevo = await Entrenamiento.create(data);
    res.status(201).json(nuevo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const eliminar = async (req, res) => {
  try {
    const item = await Entrenamiento.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: "Entrenamiento no encontrado" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
