import express from "express";
import {
  login,
  register,
  logout,
  refreshToken,
  me,
} from "../controllers/auth.controller";
import { authMiddleware, requireAuth } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refreshToken);
router.post("/logout", authMiddleware, requireAuth, logout);
router.get("/me", authMiddleware, requireAuth, me);

export default router;
