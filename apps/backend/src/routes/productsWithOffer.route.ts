// routes/productsWithOffers.routes.ts
import { Router } from "express";
import { getDailyDealProducts } from "../controllers/productsWithOffers.controller";

const router = Router();

router.get("/", getDailyDealProducts);

export default router;
