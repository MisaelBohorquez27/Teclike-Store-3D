import { Router } from "express";
import { getPaginatedProducts } from "../controllers/products.controller";

const router = Router();

router.get("/", getPaginatedProducts);

export default router;
