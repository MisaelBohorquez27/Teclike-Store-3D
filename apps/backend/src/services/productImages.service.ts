import { ProductImageRepository } from "../repositories/productsImages.repository";
import { formatProductImage, ProductImageResponse } from "../mappers/productImages.formatter";

export class ProductImageService {
  /**
   * Obtiene una imagen por ID de la tabla ProductImage
   */
  static async getImageById(id: number): Promise<ProductImageResponse | null> {
    const image = await ProductImageRepository.findById(id);
    return image ? formatProductImage.toResponse(image) : null;
  }

  /**
   * Obtiene todas las imágenes de un producto por productId
   */
  static async getImagesByProductId(productId: number): Promise<ProductImageResponse[]> {
    const images = await ProductImageRepository.findByProductId(productId);
    return formatProductImage.toResponseArray(images);
  }

  /**
   * Crea una nueva imagen para un producto si no existe
   */
  static async createImageIfNotExists(
    productId: number, 
    imageUrl: string, 
    imageAlt?: string | null
  ): Promise<ProductImageResponse> {
    // Validar y sanitizar inputs
    const validatedInput = formatProductImage.validateCreateInput(productId, imageUrl, imageAlt);
    
    const image = await ProductImageRepository.createIfNotExists(
      validatedInput.productId,
      validatedInput.imageUrl,
      validatedInput.imageAlt
    );
    
    return formatProductImage.toResponse(image);
  }

  /**
   * Crea múltiples imágenes para un producto
   */
  static async createMultipleImages(
    productId: number, 
    images: Array<{ url: string; alt?: string }>
  ): Promise<ProductImageResponse[]> {
    const createdImages: any[] = [];

    for (const image of images) {
      try {
        const validatedInput = formatProductImage.validateCreateInput(productId, image.url, image.alt);
        const createdImage = await ProductImageRepository.createIfNotExists(
          validatedInput.productId,
          validatedInput.imageUrl,
          validatedInput.imageAlt
        );
        createdImages.push(createdImage);
      } catch (error) {
        console.error(`Error creando imagen para producto ${productId}:`, error);
        // Continuar con las siguientes imágenes
      }
    }

    return formatProductImage.toResponseArray(createdImages);
  }

  /**
   * Elimina una imagen por ID
   */
  static async deleteImageById(id: number): Promise<void> {
    await ProductImageRepository.deleteById(id);
  }

  /**
   * Elimina todas las imágenes de un producto
   */
  static async deleteImagesByProductId(productId: number): Promise<void> {
    await ProductImageRepository.deleteByProductId(productId);
  }
}