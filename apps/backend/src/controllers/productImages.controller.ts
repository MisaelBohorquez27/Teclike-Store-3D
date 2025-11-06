import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";
import { ProductImageService } from "../services/productImages.service";

export class ProductImageController {
  /**
   * Obtiene una imagen por ID (tabla ProductImage)
   */
  static async getImageById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const image = await ProductImageService.getImageById(id);
      
      if (!image) {
        return res.status(404).json({ 
          success: false,
          error: "Imagen no encontrada" 
        });
      }
      
      return res.json({
        success: true,
        data: image
      });
    } catch (error: any) {
      if (error.message.toLowerCase().includes("inválid")) {
        return res.status(400).json({ 
          success: false,
          error: error.message 
        });
      }
      return handleError(res, error, "Error al obtener la imagen del producto");
    }
  }

  /**
   * Obtiene todas las imágenes de un producto por productId
   */
  static async getImagesByProductId(req: Request, res: Response) {
    try {
      const productId = Number(req.params.productId ?? req.query.productId);
      const images = await ProductImageService.getImagesByProductId(productId);
      
      return res.json({
        success: true,
        data: images,
        count: images.length
      });
    } catch (error: any) {
      if (error.message.toLowerCase().includes("inválid")) {
        return res.status(400).json({ 
          success: false,
          error: error.message 
        });
      }
      return handleError(res, error, "Error al obtener imágenes del producto");
    }
  }

  /**
   * Crea una nueva imagen para un producto
   */
  static async createImage(req: Request, res: Response) {
    try {
      const { productId, imageUrl, imageAlt } = req.body;
      
      const image = await ProductImageService.createImageIfNotExists(
        Number(productId),
        imageUrl,
        imageAlt
      );
      
      return res.status(201).json({
        success: true,
        data: image,
        message: "Imagen creada exitosamente"
      });
    } catch (error: any) {
      if (error.message.toLowerCase().includes("inválid")) {
        return res.status(400).json({ 
          success: false,
          error: error.message 
        });
      }
      return handleError(res, error, "Error al crear la imagen");
    }
  }
}

// Exportar métodos individuales para compatibilidad con rutas
export const getImageById = ProductImageController.getImageById;
export const getImagesByProductId = ProductImageController.getImagesByProductId;
export const createImage = ProductImageController.createImage;