import { Request, Response } from "express";
import { getFormattedOffers } from "../services/offers.service";
import { handleError } from "../utils/errorHandler";

export const getOffers = async (req: Request, res: Response) => {
  try {
    const recurrence = req.query.recurrence as string | null;
    const limit = parseInt(req.query.limit as string) || 6;
    const offers = await getFormattedOffers({ recurrence, limit });
    res.json(offers);
  } catch (err) {
    handleError(res, err, "Error al obtener ofertas");
  }
};
