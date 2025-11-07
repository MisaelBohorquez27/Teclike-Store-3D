import { Router } from "express";
import { 
  getOffers, 
  getDailyDeals, 
  getSpecialOffers, 
  getFeaturedProducts 
} from "../controllers/offers.controller";

const router = Router();

// GET /api/offers?recurrence=DAILY|ANNUAL&limit=10
router.get("/", getOffers);

// GET /api/offers/daily?limit=10
router.get("/daily", getDailyDeals);

// GET /api/offers/special?limit=10
router.get("/special", getSpecialOffers);

// GET /api/offers/featured?limit=8
router.get("/featured", getFeaturedProducts);

export default router;