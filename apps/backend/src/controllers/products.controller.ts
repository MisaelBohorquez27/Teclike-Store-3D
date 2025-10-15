import { Request, Response } from "express";
import {
  getPaginatedProducts,
  getProductByIdService,
  getProductBySlugService,
} from "../services/products.service";
import { handleError } from "../utils/errorHandler";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getPaginatedProducts(req.query);
    res.json(products);
  } catch (error) {
    handleError(res, error, "Error al obtener productos");
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(Number(id));
    res.json(product);
  } catch (error) {
    handleError(res, error, "Error al obtener el producto");
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await getProductBySlugService(slug);
    res.json(product);
  } catch (error) {
    handleError(res, error, "Error al obtener el producto");
  }
};
