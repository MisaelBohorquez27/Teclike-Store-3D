import { Request, Response } from "express";
import { getBestSellerWeekService } from "../services/bestSellerWeek.service";
import { handleError } from "../utils/errorHandler";

export const getBestSellerWeek = async (_req: Request, res: Response) => {
  try {
    const result = await getBestSellerWeekService();
    res.json(result);
  } catch (error) {
    handleError(res, error, "Error al obtener productos más vendidos");
  }
};
