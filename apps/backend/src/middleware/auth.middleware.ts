import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { JWTPayload } from "../types/auth.types";

export interface AuthRequest extends Request {
  user?: JWTPayload;
  userId?: number;
  isAuthenticated?: boolean;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.isAuthenticated = false;
      return next();
    }

    const token = authHeader.substring(7);
    
    // Validar que el token no esté vacío
    if (!token || token.length === 0) {
      req.isAuthenticated = false;
      return next();
    }
    
    const payload = authService.verifyAccessToken(token);

    req.user = payload;
    req.userId = payload.userId;
    req.isAuthenticated = true;

    next();
  } catch (error) {
    // No revelar detalles del error
    req.isAuthenticated = false;
    next();
  }
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.isAuthenticated || !req.userId) {
    return res.status(401).json({
      success: false,
      message: "Autenticación requerida",
    });
  }
  next();
}
