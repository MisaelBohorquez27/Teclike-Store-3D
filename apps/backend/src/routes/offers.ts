import { Router } from "express";
import { getOffers } from "../controllers/offers.controller";

const router = Router();

router.get("/", getOffers);

export default router;
