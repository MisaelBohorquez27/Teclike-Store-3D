import { Router } from "express";
import { getImageProduct, getImagesByProduct } from "../controllers/imageProduct.controller";

const router = Router();

router.get("/:id", getImageProduct);

router.get("/:productId/images", getImagesByProduct);

export default router;