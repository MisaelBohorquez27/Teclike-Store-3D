import { Router } from "express";
import { getBestSellerWeek } from "../controllers/BestSellerWeek.controller";

const router = Router();

router.get("/", getBestSellerWeek);


export default router;
