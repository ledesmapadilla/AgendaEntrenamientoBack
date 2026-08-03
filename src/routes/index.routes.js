import { Router } from "express";
import visitasRouter from "./visitas.routes.js";
import tractoresRouter from "./tractores.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

router.use("/visitas", visitasRouter);
router.use("/tractores", tractoresRouter);

export default router;
