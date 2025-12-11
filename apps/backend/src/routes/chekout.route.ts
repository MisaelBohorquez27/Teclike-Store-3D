import { Router } from "express";
import { getCheckoutSummary } from "../controllers/chekout.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Proteger la ruta con autenticación
router.get("/", authMiddleware, getCheckoutSummary);

export default router;