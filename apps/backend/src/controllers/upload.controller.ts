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
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      cb(new Error("Tipo de archivo no permitido. Solo JPEG, PNG y WebP"));
    } else {
      cb(null, true);
    }
  }
});

// Subir imagen a Cloudinary
export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" });
    }

    // Validar tamaño nuevamente
    if (req.file.size > MAX_FILE_SIZE) {
      return res.status(400).json({ error: "Archivo demasiado grande" });
    }

    const stream = cloudinary.uploader.upload_stream(
      { 
        folder: "teclike-image",
        resource_type: "auto",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
      },
      (error, result) => {
        if (error || !result) {
          console.error("Cloudinary error:", error);
          return res.status(500).json({ error: "Error al subir la imagen" });
        }
        return res.json({ url: result.secure_url, publicId: result.public_id });
      }
    );

    stream.on("error", (error) => {
      console.error("Stream error:", error);
      res.status(500).json({ error: "Error en la transmisión del archivo" });
    });

    stream.end(req.file.buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al subir la imagen" });
  }
};
