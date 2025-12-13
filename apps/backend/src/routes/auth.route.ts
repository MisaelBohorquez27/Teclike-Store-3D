import express, { Router } from "express";
import {
  login,
  register,
  logout,
  refreshToken,
  me,
} from "../controllers/auth.controller";
import { authMiddleware, requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { loginLimiter, registerLimiter } from "../middleware/rateLimiter.middleware";
import { z } from "zod";

const router = Router();

// Esquemas de validación
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  username: z.string().min(3, "Mínimo 3 caracteres"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  confirmPassword: z.string().min(8, "Mínimo 8 caracteres"),
});

// Rutas de autenticación
router.post("/login", loginLimiter, validate(loginSchema), login);

router.post(
  "/register",
  registerLimiter,
  validate(registerSchema),
  register
);

router.post("/logout", authMiddleware, requireAuth, logout);

router.post("/refresh-token", refreshToken);

router.get("/me", authMiddleware, requireAuth, me);

export default router;