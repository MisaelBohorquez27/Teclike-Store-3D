import prisma from "../prisma";
import type { ProductImage } from "@prisma/client";

/**
Este se refiere al id de la tabla ProductImage XD no sirve mucho pero dejemosla
 */

export async function getImageById(id: number): Promise<Pick<ProductImage, "id" | "productId" | "imageUrl" | "imageAlt" | "createdAt"> | null> {
  if (Number.isNaN(id) || id <= 0) throw new Error("ID inválido");
  return prisma.productImage.findUnique({
    where: { id },
    select: {
      id: true,
      productId: true,
      imageUrl: true,
      imageAlt: true,
      createdAt: true,
    },
  });
}

/**
 Esta si se refiere al id del producto, obtiene las imagenes segun el id del producto
 */
export async function getImagesByProduct(productId: number): Promise<Array<Pick<ProductImage, "id" | "imageUrl" | "imageAlt" | "createdAt">>> {
  if (Number.isNaN(productId) || productId <= 0) throw new Error("productId inválido");
  return prisma.productImage.findMany({
    where: { productId },
    select: {
      id: true,
      productId: true,
      imageUrl: true,
      imageAlt: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

/**
 * Crea una nueva imagen para un producto si no existe exactamente la misma URL.
 * Devuelve la fila creada o la existente.
 */
export async function createImageIfNotExists(productId: number, imageUrl: string, imageAlt?: string | null) {
  if (Number.isNaN(productId) || productId <= 0) throw new Error("productId inválido");
  if (!imageUrl || typeof imageUrl !== "string") throw new Error("imageUrl inválida");

  const existing = await prisma.productImage.findFirst({
    where: { productId, imageUrl },
  });
  if (existing) return existing;

  return prisma.productImage.create({
    data: {
      productId,
      imageUrl,
      imageAlt: imageAlt ?? null,
    },
  });
}