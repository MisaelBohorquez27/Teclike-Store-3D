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
import Joi from "joi";

const router = Router();

// Esquemas de validación
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required()
});

// Rutas de autenticación
router.post('/login', loginLimiter, validate(loginSchema), login);

router.post('/register', registerLimiter, validate(registerSchema), register);

router.post('/logout', authMiddleware, requireAuth, logout);

router.post('/refresh-token', refreshToken);

router.get('/me', authMiddleware, requireAuth, me);

export default router;