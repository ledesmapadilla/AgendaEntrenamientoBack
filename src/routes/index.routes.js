import { Router } from "express";
import entrenamientosRouter from "./entrenamientos.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API Agenda Entrenamiento funcionando" });
});

router.use("/entrenamientos", entrenamientosRouter);
router.use("/visitas", entrenamientosRouter); // Alias de compatibilidad

export default router;
