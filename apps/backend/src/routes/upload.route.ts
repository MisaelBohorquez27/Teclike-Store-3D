// src/routes/upload.route.ts
import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../controllers/upload.controller";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("image"), uploadImage);
export default router;
