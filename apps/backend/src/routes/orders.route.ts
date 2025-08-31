import { Router } from "express";
import { getTopSellingProducts } from "../controllers/topSellingProd.controller";

const router = Router();

router.get("/", getTopSellingProducts);


export default router;
