import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { transformCart } from "../services/cart.service";

const prisma = new PrismaClient();

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = 1; // Temporal

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartProducts: {
          include: {
            product: {
              include: { inventory: true },
            },
          },
          orderBy: { id: "desc" },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    res.json(transformCart(cart));
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = 1; // Usuario temporal
    const { productId, quantity = 1 } = req.body;

    // Verificar si el producto existe
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      include: { inventory: true },
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const availableStock = product.inventory?.stock ?? 0;
    if (availableStock <= 0) {
      return res.status(400).json({ message: "Producto agotado" });
    }
    if (availableStock < quantity) {
      return res.status(400).json({
        message: `Stock insuficiente. Solo quedan ${availableStock} unidades disponibles`,
      });
    }

    // Obtener o crear carrito
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartProducts: { include: { product: { include: { inventory: true } } } },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { user: { connect: { id: userId } } },
        include: {
          cartProducts: { include: { product: { include: { inventory: true } } } },
        },
      });
    }

    // Si ya existe el producto, actualizar cantidad
    const existingItem = cart.cartProducts.find((item) => item.productId === parseInt(productId));
    if (existingItem) {
      const newQuantity = existingItem.quantity + parseInt(quantity);
      if (newQuantity > availableStock) {
        return res.status(400).json({
          message: `No hay suficiente stock. Máximo disponible: ${availableStock} unidades`,
        });
      }
      await prisma.cartProduct.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      // Si no existe, agregarlo
      await prisma.cartProduct.create({
        data: {
          cart: { connect: { id: cart.id } },
          product: { connect: { id: parseInt(productId) } },
          quantity: parseInt(quantity),
        },
      });
    }

    // Obtener carrito actualizado y transformarlo
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        cartProducts: { include: { product: { include: { inventory: true } } } },
      },
    });

    if (!updatedCart) {
      return res.status(404).json({ error: "Cart not found or update failed." });
    }

    res.json(transformCart(updatedCart));
  } catch (error: any) {
    console.error("Error al agregar al carrito:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Actualizar cantidad de un producto
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = 1;
    const { productId, quantity } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      include: { inventory: true },
    });

    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    const availableStock = product.inventory?.stock ?? 0;
    if (parseInt(quantity) > availableStock) {
      return res.status(400).json({
        message: `Stock insuficiente. Solo quedan ${availableStock} unidades disponibles`,
      });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartProducts: { include: { product: { include: { inventory: true } } } },
      },
    });

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    const cartItem = cart.cartProducts.find((item) => item.productId === parseInt(productId));
    if (!cartItem) return res.status(404).json({ message: "Producto no encontrado en el carrito" });

    if (parseInt(quantity) <= 0) {
      await prisma.cartProduct.delete({ where: { id: cartItem.id } });
    } else {
      await prisma.cartProduct.update({
        where: { id: cartItem.id },
        data: { quantity: parseInt(quantity) },
      });
    }

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        cartProducts: { include: { product: { include: { inventory: true } } } },
      },
    });

    if (!updatedCart) return res.status(404).json({ message: "Carrito no encontrado" });

    res.json(transformCart(updatedCart));
  } catch (error: any) {
    console.error("Error al actualizar el carrito:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Eliminar producto
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = 1;
    const { productId } = req.body;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartProducts: { include: { product: { include: { inventory: true } } } },
      },
    });

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    const cartItem = cart.cartProducts.find((item) => item.productId === parseInt(productId));
    if (!cartItem) return res.status(404).json({ message: "Producto no encontrado en el carrito" });

    await prisma.cartProduct.delete({ where: { id: cartItem.id } });

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        cartProducts: { include: { product: { include: { inventory: true } } } },
      },
    });

    if (!updatedCart) return res.status(404).json({ error: "Cart not found or update failed." });

    res.json(transformCart(updatedCart));
  } catch (error: any) {
    console.error("Error al eliminar del carrito:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

// Vaciar carrito
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = 1;
    const cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    await prisma.cartProduct.deleteMany({ where: { cartId: cart.id } });

    // Devolver carrito vacío transformado
    const emptyCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        cartProducts: { include: { product: { include: { inventory: true } } } },
      },
    });

    res.json(transformCart(emptyCart));
  } catch (error: any) {
    console.error("Error al vaciar el carrito:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

{/* Usar la api de formateo de moneda en un futuro
  // En tu archivo de utilidades o servicio de formato
const formatCurrency = (amountInCents, currencyCode) => {
  // `Intl.NumberFormat` maneja los decimales y el símbolo
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amountInCents / 100);
};

// En tu controller del backend
// ...
const cartWithFormattedPrices = {
  ...cart,
  items: cart.cartProducts.map((item) => ({
    // ...
    product: {
      ...item.product,
      // Usar la función centralizada para formatear
      price: formatCurrency(item.product.priceCents, item.product.currencyCode),
    },
  })),
}; */}