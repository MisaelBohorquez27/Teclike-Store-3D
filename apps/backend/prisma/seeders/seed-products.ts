// seeders/seed-products.ts
import { PrismaClient } from "@prisma/client";
import products from "../data/products.json";

export async function seedProducts(prisma: PrismaClient) {
  console.log("🛍️ Insertando productos...");

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        brand: productData.brand,
        slug: productData.slug,
        name: productData.name,
        description: productData.description,
        priceCents: productData.priceCents,
        imageUrl: productData.imageUrl,
      },
    });

    // Ejemplo de actualización de un producto específico
    {
      /*await prisma.product.update({
      where: {
        slug: "mouse-x11", // Usas el slug para encontrar el producto
      },
      data: {
        imageUrl: "https://res.cloudinary.com/dwewy8c7p/image/upload/v1759415343/teclike-image/mewvnmlrl1dnf37ijslt.png", // Nuevo nombre
      },
    });*/
    }

    await prisma.product.update({
      where: {
        slug: "razer-kraken-v3", // Usas el slug para encontrar el producto
      },
      data: {
        imageUrl:
          "https://res.cloudinary.com/dwewy8c7p/image/upload/v1759718809/razer-KrakenV3-HyperSense_ctrspf.png", // Nuevo nombre
      },
    });

    // Crear inventario
    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: {},
      create: {
        productId: product.id,
        stock: productData.inventory.stock,
        isNew: productData.inventory.isNew,
      },
    });

    console.log(`✅ Producto: ${product.name}`);
  }
}
