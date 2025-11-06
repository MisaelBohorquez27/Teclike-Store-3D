import { Router } from "express";
import { 
  getImageById, 
  getImagesByProductId, 
  createImage 
} from "../controllers/productImages.controller";

const router = Router();

// GET /api/product-images/:id
router.get("/:id", getImageById);

// GET /api/product-images/product/:productId
router.get("/product/:productId", getImagesByProductId);

// POST /api/product-images
router.post("/", createImage);

export default router;