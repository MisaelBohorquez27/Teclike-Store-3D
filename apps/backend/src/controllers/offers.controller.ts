import { Request, Response } from "express";
import { 
  getFormattedOffers, 
  getDailyOffers, 
  getAnnualOffers,
  getAllActiveOffers 
} from "../services/offers.service";
import { handleError } from "../utils/errorHandler";

// Controlador para obtener ofertas
export const getOffers = async (req: Request, res: Response) => {
  try {
    const recurrence = req.query.recurrence as 'DAILY' | 'ANNUAL' | 'ALL' | undefined;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50); // Max 50 por seguridad
    
    const offers = await getFormattedOffers({ 
      recurrence, 
      limit 
    });

    res.json({
      success: true,
      data: offers,
      meta: {
        count: offers.length,
        recurrence: recurrence || 'ALL',
        hasDailyOffers: offers.some(o => o.recurrence === 'DAILY'),
        hasAnnualOffers: offers.some(o => o.recurrence === 'ANNUAL')
      }
    });

  } catch (err) {
    handleError(res, err, "Error al obtener ofertas");
  }
};

export const getDailyDeals = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 20);
    
    const dailyOffers = await getDailyOffers(limit);

    res.json({
      success: true,
      data: dailyOffers,
      meta: {
        count: dailyOffers.length,
        recurrence: 'DAILY',
        type: 'daily_deals'
      }
    });

  } catch (err) {
    handleError(res, err, "Error al obtener ofertas diarias");
  }
};

export const getSpecialOffers = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 20);
    
    const annualOffers = await getAnnualOffers(limit);

    res.json({
      success: true,
      data: annualOffers,
      meta: {
        count: annualOffers.length,
        recurrence: 'ANNUAL',
        type: 'special_offers'
      }
    });

  } catch (err) {
    handleError(res, err, "Error al obtener ofertas especiales");
  }
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 8, 15);
    
    const allOffers = await getAllActiveOffers(limit);

    res.json({
      success: true,
      data: allOffers,
      meta: {
        count: allOffers.length,
        type: 'featured'
      }
    });

  } catch (err) {
    handleError(res, err, "Error al obtener productos destacados");
  }
};