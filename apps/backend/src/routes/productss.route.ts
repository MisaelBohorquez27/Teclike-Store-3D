import { Router } from "express";
import { getProductss } from "../controllers/products.controller";

const router = Router();

router.get("/", getProductss);

export default router;