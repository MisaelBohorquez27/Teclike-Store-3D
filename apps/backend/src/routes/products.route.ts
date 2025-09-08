import { Router } from "express";
import { getPaginatedProducts, getProductById, getProductBySlug, getProducts } from "../controllers/products.controller";

const router = Router();

router.get("/", getProducts);
router.get('/id/:id', getProductById);
router.get('/slug/:slug', getProductBySlug);
router.get("/products/paginated", getPaginatedProducts); 

export default router;
