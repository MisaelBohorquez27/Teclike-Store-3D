// src/controllers/upload.controller.ts
import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const filePath = req.file?.path;
    if (!filePath) return res.status(400).json({ error: "No se recibió archivo" });

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "productos",
      transformation: [{ width: 800, crop: "scale" }],
    });

    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    console.error("❌ Error al subir imagen:", err);
    res.status(500).json({ error: "Error al subir imagen" });
  }
};
