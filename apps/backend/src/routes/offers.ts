import { Router } from "express";
import { getFeaturedOffers } from "../controllers/offer.controller";

const router = Router();

router.get("/", getFeaturedOffers);

export default router;
