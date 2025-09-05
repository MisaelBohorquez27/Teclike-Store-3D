import { Router } from "express";
import { getProductById, getProductBySlug, getProducts } from "../controllers/products.controller";
import { getSearchSuggestions, searchProducts } from "../controllers/search.controller";

const router = Router();

router.get("/", getProducts);
router.get('/id/:id', getProductById);
router.get('/slug/:slug', getProductBySlug); 

export default router;
