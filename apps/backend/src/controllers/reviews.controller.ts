import { Request, Response } from "express";
import {
  getProductReviewsService,
  getRandomReviewsService,
  createReviewService,
} from "../services/reviews.service";
import { handleError } from "../utils/errorHandler";

export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.productId);
    const result = await getProductReviewsService(productId);
    res.json(result);
  } catch (error) {
    handleError(res, error, "Error obteniendo reseñas del producto");
  }
};

export const getRandomReviews = async (_req: Request, res: Response) => {
  try {
    const result = await getRandomReviewsService();
    res.json(result);
  } catch (error) {
    handleError(res, error, "Error obteniendo reseñas aleatorias");
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const result = await createReviewService(req.body);
    res.status(201).json(result);
  } catch (error) {
    handleError(res, error, "Error creando la reseña");
  }
};
