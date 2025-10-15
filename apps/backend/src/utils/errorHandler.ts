import { Response } from "express";

export function handleError(res: Response, error: any, fallbackMessage: string) {
  console.error(fallbackMessage, error);
  res.status(500).json({
    message: fallbackMessage,
    error: error?.message ?? "Error desconocido",
  });
}
