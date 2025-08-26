import { Router } from "express";
import { listProducts, getProduct, getTrendingProducts } from "../controllers/products.controller";

const router = Router();

router.get("/", listProducts);
router.get("/:slug", getProduct);
router.get("/trending", getTrendingProducts);

export default router;
