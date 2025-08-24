// seeders/seed-products.ts
import { PrismaClient } from '@prisma/client';

export async function seedProducts(prisma: PrismaClient) {
  console.log('🛍️ Insertando productos...');

  const products = [
    {
      brand: 'Razer',
      slug: 'razer-kraken-v3',
      name: 'Razer Kraken V3 HyperSense',
      description: 'Gaming headset with haptic technology and immersive 7.1 surround sound',
      priceCents: 12999,
      imageUrl: '/products/razer-kraken.png',
      categories: ['Headsets'],
      inventory: { stock: 25, isNew: true }
    },
    {
      brand: 'Logitech',
      slug: 'logitech-g502-x',
      name: 'Logitech G502 X PLUS',
      description: 'Wireless gaming mouse with HERO 25K sensor and LIGHTSPEED technology',
      priceCents: 15999,
      imageUrl: '/products/logitech-g502.png',
      categories: ['Mice'],
      inventory: { stock: 30, isNew: true }
    },
    {
      brand: 'Corsair',
      slug: 'corsair-k95-rgb',
      name: 'Corsair K95 RGB Platinum',
      description: 'Mechanical gaming keyboard with Cherry MX switches and per-key RGB',
      priceCents: 19999,
      imageUrl: '/products/corsair-k95.png',
      categories: ['Keyboards'],
      inventory: { stock: 15, isNew: false }
    },
    {
      brand: 'SteelSeries',
      slug: 'steelseries-arctis-pro',
      name: 'SteelSeries Arctis Pro Wireless',
      description: 'High-fidelity gaming headset with dual wireless technology',
      priceCents: 34999,
      imageUrl: '/products/arctis-pro.png',
      categories: ['Headsets'],
      inventory: { stock: 10, isNew: false }
    },
    {
      brand: 'Samsung',
      slug: 'samsung-odyssey-g7',
      name: 'Samsung Odyssey G7',
      description: '32" QHD 240Hz curved gaming monitor with HDR600',
      priceCents: 69999,
      imageUrl: '/products/samsung-odyssey.png',
      categories: ['Monitors'],
      inventory: { stock: 8, isNew: true }
    },
    {
      brand: 'HyperX',
      slug: 'hyperx-cloud-alpha',
      name: 'HyperX Cloud Alpha Wireless',
      description: 'Wireless gaming headset with 300-hour battery life',
      priceCents: 17999,
      imageUrl: '/products/hyperx-cloud.png',
      categories: ['Headsets'],
      inventory: { stock: 20, isNew: false }
    },
    {
      brand: 'ASUS',
      slug: 'asus-rog-azoth',
      name: 'ASUS ROG Azoth',
      description: '75% wireless mechanical keyboard with OLED display',
      priceCents: 24999,
      imageUrl: '/products/rog-azoth.png',
      categories: ['Keyboards'],
      inventory: { stock: 12, isNew: true }
    },
    {
      brand: 'LG',
      slug: 'lg-ultragear-48',
      name: 'LG UltraGear 48GQ900',
      description: '48" 4K OLED gaming monitor with 120Hz refresh rate',
      priceCents: 129999,
      imageUrl: '/products/lg-ultragear.png',
      categories: ['Monitors'],
      inventory: { stock: 5, isNew: true }
    }
  ];

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
        imageUrl: productData.imageUrl
      }
    });

    // Crear inventario
    await prisma.inventory.upsert({
      where: { productId: product.id },
      update: {},
      create: {
        productId: product.id,
        stock: productData.inventory.stock,
        isNew: productData.inventory.isNew
      }
    });

    // Conectar categorías
    for (const categoryName of productData.categories) {
      const category = await prisma.category.findUnique({
        where: { slug: categoryName }
      });

      if (category) {
        await prisma.categoryProduct.upsert({
          where: {
            categoryId_productId: {
              categoryId: category.id,
              productId: product.id
            }
          },
          update: {},
          create: {
            categoryId: category.id,
            productId: product.id
          }
        });
      }
    }

    console.log(`✅ Producto: ${product.name}`);
  }
}