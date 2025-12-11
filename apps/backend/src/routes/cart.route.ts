import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.simple";
import { authMiddleware, requireAuth } from "../middleware/auth.middleware";

const router = express.Router();

// Aplicar autenticación a todas las rutas del carrito
router.use(authMiddleware);
router.use(requireAuth);

// Obtener carrito del usuario
router.get("/", getCart);

// Agregar producto al carrito
router.post("/add", addToCart);

// Actualizar cantidad de producto en carrito
router.put("/update", updateCartItem);

// Eliminar producto del carrito
router.delete("/remove", removeFromCart);

// Vaciar todo el carrito
router.delete("/clear", clearCart);

export default router;