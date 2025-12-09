import { Response } from "express";

export function handleError(
  res: Response,
  error: unknown,
  defaultMessage: string
) {
  const message =
    error instanceof Error ? error.message : defaultMessage;
  const statusCode =
    message.includes("no encontrado") || message.includes("requerido")
      ? 400
      : message.includes("incorrecta") || message.includes("inválido")
        ? 401
        : message.includes("registrado") || message.includes("ya existe")
          ? 409
          : 500;

  res.status(statusCode).json({
    success: false,
    message,
  });
}
