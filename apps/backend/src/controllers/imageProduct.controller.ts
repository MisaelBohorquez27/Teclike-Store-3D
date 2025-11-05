import { Request, Response } from "express";
import { handleError } from "../utils/errorHandler";
import { getImageById, getImagesByProduct as svcGetImagesByProduct } from "../services/imageProduct.service";

export const getImageProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const image = await getImageById(id);
    if (!image) return res.status(404).json({ error: "Imagen no encontrada" });
    return res.json(image);
  } catch (error: any) {
    if (String(error.message).toLowerCase().includes("inválid")) {
      return res.status(400).json({ error: error.message });
    }
    return handleError(res, error, "Error al obtener la imagen del producto");
  }
};

export const getImagesByProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.productId ?? req.query.productId);
    const images = await svcGetImagesByProduct(productId);
    return res.json(images);
  } catch (error: any) {
    if (String(error.message).toLowerCase().includes("inválid")) {
      return res.status(400).json({ error: error.message });
    }
    return handleError(res, error, "Error al obtener imágenes del producto");
  }
};
