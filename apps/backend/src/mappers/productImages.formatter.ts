import type { ProductImage } from "@prisma/client";

export interface ProductImageDTO {
  id: number;
  productId: number;
  imageUrl: string;
  imageAlt: string | null;
  createdAt: string;
}

export interface ProductImageResponse {
  id: number;
  url: string;
  alt: string | null;
  createdAt: string;
  productId: number;
}

export class formatProductImage {
  /**
   * Mapea una entidad ProductImage a DTO para uso interno
   */
  static toDTO(productImage: ProductImage): ProductImageDTO {
    return {
      id: productImage.id,
      productId: productImage.productId,
      imageUrl: productImage.imageUrl,
      imageAlt: productImage.imageAlt,
      createdAt: productImage.createdAt.toISOString()
    };
  }

  /**
   * Mapea una entidad ProductImage a Response para el frontend
   */
  static toResponse(productImage: ProductImage): ProductImageResponse {
    return {
      id: productImage.id,
      url: productImage.imageUrl,
      alt: productImage.imageAlt,
      createdAt: productImage.createdAt.toISOString(),
      productId: productImage.productId
    };
  }

  /**
   * Mapea un array de entidades ProductImage a Response
   */
  static toResponseArray(productImages: ProductImage[]): ProductImageResponse[] {
    return productImages.map(image => this.toResponse(image));
  }

  /**
   * Mapea un array de entidades ProductImage a DTO
   */
  static toDTOArray(productImages: ProductImage[]): ProductImageDTO[] {
    return productImages.map(image => this.toDTO(image));
  }

  /**
   * Valida y sanitiza los datos de entrada para crear una imagen
   */
  static validateCreateInput(productId: number, imageUrl: string, imageAlt?: string | null): { 
    productId: number; 
    imageUrl: string; 
    imageAlt: string | null 
  } {
    if (Number.isNaN(productId) || productId <= 0) {
      throw new Error("productId inválido");
    }
    
    if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim().length === 0) {
      throw new Error("imageUrl inválida");
    }

    // Sanitizar URL
    const sanitizedUrl = imageUrl.trim();
    
    // Validar formato básico de URL
    if (!sanitizedUrl.startsWith('http://') && !sanitizedUrl.startsWith('https://')) {
      throw new Error("imageUrl debe ser una URL válida");
    }

    return {
      productId,
      imageUrl: sanitizedUrl,
      imageAlt: imageAlt?.trim() || null
    };
  }
}