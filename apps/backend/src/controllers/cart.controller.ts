import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Obtener el carrito del usuario con información de stock
const getCart = async (req: Request, res: Response) => {
  try {
    const userId = 1; // Usuario temporal hasta implementar autenticación

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartProducts: {
          include: {
            product: {
              include: {
                inventory: true, // Incluir información de inventario
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Transformar los datos para incluir información de stock
    const cartWithStockInfo = {
      ...cart,
      items: cart.cartProducts.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        product: {
          ...item.product,
          inStock: item.product.inventory
            ? item.product.inventory.stock > 0
            : false,
          stock: item.product.inventory ? item.product.inventory.stock : 0,
        },
      })),
    };

    res.json(cartWithStockInfo);
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Agregar producto al carrito con verificación de stock
const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = 1; // Usuario temporal
    const { productId, quantity = 1 } = req.body;

    // Verificar si el producto existe y tiene inventario
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      include: {
        inventory: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Verificar stock disponible
    const availableStock = product.inventory ? product.inventory.stock : 0;
    if (availableStock <= 0) {
      return res.status(400).json({ message: "Producto agotado" });
    }

    if (availableStock < quantity) {
      return res.status(400).json({
        message: `Stock insuficiente. Solo quedan ${availableStock} unidades disponibles`,
      });
    }

    // Obtener o crear el carrito del usuario
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartProducts: {
          include: {
            product: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          user: { connect: { id: userId } },
        },
        include: {
          cartProducts: {
            include: {
              product: {
                include: {
                  inventory: true,
                },
              },
            },
          },
        },
      });
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.cartProducts.find(
      (item) => item.productId === parseInt(productId)
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + parseInt(quantity);

      // Verificar si la nueva cantidad excede el stock disponible
      if (newQuantity > availableStock) {
        return res.status(400).json({
          message: `No hay suficiente stock. Máximo disponible: ${availableStock} unidades`,
        });
      }

      // Actualizar cantidad si ya existe
      await prisma.cartProduct.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      // Agregar nuevo producto al carrito
      await prisma.cartProduct.create({
        data: {
          cart: { connect: { id: cart.id } },
          product: { connect: { id: parseInt(productId) } },
          quantity: parseInt(quantity),
        },
      });
    }

    // Devolver el carrito actualizado con información de stock
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        cartProducts: {
          include: {
            product: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });

    if (!updatedCart) {
      return res
        .status(404)
        .json({ error: "Cart not found or update failed." });
    }
    // Transformar la respuesta para incluir información de stock
    const transformedCart = {
      ...updatedCart,
      items: updatedCart.cartProducts.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        product: {
          ...item.product,
          inStock: item.product.inventory
            ? item.product.inventory.stock > 0
            : false,
          stock: item.product.inventory ? item.product.inventory.stock : 0,
          // Convertir priceCents a precio normal
          price: item.product.priceCents / 100,
        },
      })),
    };

    res.json(transformedCart);
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar cantidad de un producto en el carrito con verificación de stock
const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = 1; // Usuario temporal
    const { productId, quantity } = req.body;

    // Obtener información del producto y su stock
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      include: {
        inventory: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const availableStock = product.inventory ? product.inventory.stock : 0;

    // Verificar stock si se está aumentando la cantidad
    if (parseInt(quantity) > 0 && parseInt(quantity) > availableStock) {
      return res.status(400).json({
        message: `Stock insuficiente. Solo quedan ${availableStock} unidades disponibles`,
      });
    }

    // Obtener el carrito del usuario
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartProducts: {
          include: {
            product: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Encontrar el producto en el carrito
    const cartItem = cart.cartProducts.find(
      (item) => item.productId === parseInt(productId)
    );

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    if (parseInt(quantity) <= 0) {
      // Eliminar el producto si la cantidad es 0 o menos
      await prisma.cartProduct.delete({
        where: { id: cartItem.id },
      });
    } else {
      // Actualizar la cantidad
      await prisma.cartProduct.update({
        where: { id: cartItem.id },
        data: { quantity: parseInt(quantity) },
      });
    }

    // Devolver el carrito actualizado
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        cartProducts: {
          include: {
            product: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });

    // Transformar la respuesta
    if (!updatedCart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }
    const transformedCart = {
      ...updatedCart,
      items: updatedCart.cartProducts
        ? updatedCart.cartProducts.map((item) => ({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            product: {
              ...item.product,
              inStock: item.product.inventory
                ? item.product.inventory.stock > 0
                : false,
              stock: item.product.inventory ? item.product.inventory.stock : 0,
              price: item.product.priceCents / 100,
            },
          }))
        : [],
    };

    res.json(transformedCart);
  } catch (error) {
    console.error("Error al actualizar el carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar producto del carrito
const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = 1; // Usuario temporal
    const { productId } = req.body;

    // Obtener el carrito del usuario
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartProducts: {
          include: {
            product: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Encontrar el producto en el carrito
    const cartItem = cart.cartProducts.find(
      (item) => item.productId === parseInt(productId)
    );

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado en el carrito" });
    }

    // Eliminar el producto del carrito
    await prisma.cartProduct.delete({
      where: { id: cartItem.id },
    });

    // Devolver el carrito actualizado
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        cartProducts: {
          include: {
            product: {
              include: {
                inventory: true,
              },
            },
          },
        },
      },
    });
    if (!updatedCart) {
      return res
        .status(404)
        .json({ error: "Cart not found or update failed." });
    }
    // Transformar la respuesta
    const transformedCart = {
      ...updatedCart,
      items: updatedCart.cartProducts.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        product: {
          ...item.product,
          inStock: item.product.inventory
            ? item.product.inventory.stock > 0
            : false,
          stock: item.product.inventory ? item.product.inventory.stock : 0,
          price: item.product.priceCents / 100,
        },
      })),
    };

    res.json(transformedCart);
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Vaciar el carrito
const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = 1; // Usuario temporal

    // Obtener el carrito del usuario
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    // Eliminar todos los productos del carrito
    await prisma.cartProduct.deleteMany({
      where: { cartId: cart.id },
    });

    res.json({ message: "Carrito vaciado correctamente" });
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
