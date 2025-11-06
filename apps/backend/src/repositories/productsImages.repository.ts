import prisma from "../prisma";
import type { ProductImage } from "@prisma/client";

export class ProductImageRepository {
  /**
   * Obtiene una imagen por su ID (tabla ProductImage)
   */
  static async findById(id: number): Promise<ProductImage | null> {
    if (Number.isNaN(id) || id <= 0) {
      throw new Error("ID inválido");
    }

    return prisma.productImage.findUnique({
      where: { id }
    });
  }

  /**
   * Obtiene todas las imágenes de un producto por productId
   */
  static async findByProductId(productId: number): Promise<ProductImage[]> {
    if (Number.isNaN(productId) || productId <= 0) {
      throw new Error("productId inválido");
    }

    return prisma.productImage.findMany({
      where: { productId },
      orderBy: { createdAt: "asc" }
    });
  }

  /**
   * Busca una imagen existente por productId y URL
   */
  static async findByProductIdAndUrl(productId: number, imageUrl: string): Promise<ProductImage | null> {
    if (Number.isNaN(productId) || productId <= 0) {
      throw new Error("productId inválido");
    }
    if (!imageUrl || typeof imageUrl !== "string") {
      throw new Error("imageUrl inválida");
    }

    return prisma.productImage.findFirst({
      where: { productId, imageUrl }
    });
  }

  /**
   * Crea una nueva imagen para un producto
   */
  static async create(productId: number, imageUrl: string, imageAlt?: string | null): Promise<ProductImage> {
    if (Number.isNaN(productId) || productId <= 0) {
      throw new Error("productId inválido");
    }
    if (!imageUrl || typeof imageUrl !== "string") {
      throw new Error("imageUrl inválida");
    }

    return prisma.productImage.create({
      data: {
        productId,
        imageUrl,
        imageAlt: imageAlt ?? null
      }
    });
  }

  /**
   * Crea o devuelve imagen existente (upsert)
   */
  static async createIfNotExists(productId: number, imageUrl: string, imageAlt?: string | null): Promise<ProductImage> {
    const existing = await this.findByProductIdAndUrl(productId, imageUrl);
    if (existing) return existing;

    return this.create(productId, imageUrl, imageAlt);
  }

  /**
   * Elimina una imagen por ID
   */
  static async deleteById(id: number): Promise<void> {
    if (Number.isNaN(id) || id <= 0) {
      throw new Error("ID inválido");
    }

    await prisma.productImage.delete({
      where: { id }
    });
  }

  /**
   * Elimina todas las imágenes de un producto
   */
  static async deleteByProductId(productId: number): Promise<void> {
    if (Number.isNaN(productId) || productId <= 0) {
      throw new Error("productId inválido");
    }

    await prisma.productImage.deleteMany({
      where: { productId }
    });
  }
}