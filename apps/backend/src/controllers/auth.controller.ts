import { Request, Response } from "express";
import * as cartService from "../services/cart.service";
import * as authService from "../services/auth.service";
import { handleError } from "../utils/errorHandler";
import { AuthRequest } from "../middleware/auth.middleware";
import { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth.types";

export const loginWithCartMerge = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.body.userId;
    const localStorageCart = req.body.localStorageCart;

    if (!userId) throw new Error("userId requerido");

    // Hacer merge del carrito
    const mergedCart = await cartService.mergeCartOnLogin(userId, localStorageCart);
    
    res.json({
      success: true,
      cart: mergedCart,
      message: "Carrito sincronizado correctamente",
    });
  } catch (error) {
    handleError(res, error, "Error al sincronizar carrito en login");
  }
};

export const logoutWithCartPersist = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.body.userId;

    if (!userId) throw new Error("userId requerido");

    // Persistir carrito antes de logout
    await cartService.persistCartBeforeLogout(userId);

    res.json({
      success: true,
      message: "Carrito guardado correctamente",
    });
  } catch (error) {
    handleError(res, error, "Error al guardar carrito en logout");
  }
};

export const login = async (
  req: AuthRequest,
  res: Response<AuthResponse>
) => {
  try {
    const { email, password } = req.body as LoginRequest;

    const result = await authService.login({ email, password });

    res.json({
      success: true,
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      message: "Login exitoso",
    });
  } catch (error) {
    handleError(res, error, "Error en login");
  }
};

export const register = async (
  req: AuthRequest,
  res: Response<AuthResponse>
) => {
  try {
    const { email, username, password, confirmPassword } =
      req.body as RegisterRequest;

    const result = await authService.register({
      email,
      username,
      password,
      confirmPassword,
    });

    res.status(201).json({
      success: true,
      user: result.user,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    handleError(res, error, "Error en registro");
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    const result = await authService.logout(req.userId || 0);
    res.json({
      success: true,
      message: "Sesión cerrada correctamente",
    });
  } catch (error) {
    handleError(res, error, "Error en logout");
  }
};

export const refreshToken = async (req: AuthRequest, res: Response) => {
  try {
    const { refreshToken: token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Refresh token requerido",
      });
    }

    const tokens = await authService.refreshToken(token);

    res.json({
      success: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      message: "Token refrescado exitosamente",
    });
  } catch (error) {
    handleError(res, error, "Error al refrescar token");
  }
};

export const me = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      return res.status(401).json({
        success: false,
        message: "No autenticado",
      });
    }

    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    handleError(res, error, "Error al obtener usuario");
  }
};
