import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer (almacena el archivo en memoria)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Subir imagen a Cloudinary
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" });
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "teclike-image" }, // carpeta en la cuenta Cloudinary
      (error, result) => {
        if (error || !result) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ error: "Error al subir la imagen" });
        }
        return res.json({ url: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al subir la imagen" });
  }
};
