import { Router } from "express";
import { getTopSellingProducts } from "../controllers/BestSellerWeek.controller";

const router = Router();

router.get("/", getTopSellingProducts);


export default router;
