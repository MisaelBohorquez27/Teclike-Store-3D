import { Router } from "express";
import {getRandomReviews , getProductReviews, createReview } from "../controllers/reviews.controller";

const router = Router();

router.post("/", createReview);
router.get("/", getRandomReviews);
router.get("/:productId", getProductReviews);

export default router;
