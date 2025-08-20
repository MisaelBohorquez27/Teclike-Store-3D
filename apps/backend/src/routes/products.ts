import { Router } from "express";
import { listProducts, getProduct } from "../controllers/products.controller";

const router = Router();

router.get("/", listProducts);
router.get("/:slug", getProduct);

export default router;
