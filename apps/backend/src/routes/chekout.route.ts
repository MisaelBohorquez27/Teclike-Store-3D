import { Router } from "express";
import { getCheckoutSummary } from "../controllers/chekout.controller";

const router = Router();

router.get("/", getCheckoutSummary);

export default router;