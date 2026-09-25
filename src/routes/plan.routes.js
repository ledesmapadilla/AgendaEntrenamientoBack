import { Router } from "express";
import { obtenerPlan, actualizarPlan } from "../controllers/plan.controller.js";

const router = Router();

router.get("/", obtenerPlan);
router.post("/", actualizarPlan);
router.put("/", actualizarPlan);

export default router;
