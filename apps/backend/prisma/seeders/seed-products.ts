// prisma/seeders/seed-products.ts
import { PrismaClient } from "@prisma/client";

const productsData = [
  {
    slug: "rtx-4070-ti",
    name: "NVIDIA GeForce RTX 4070 Ti",
    description: "Tarjeta gráfica de última generación para gaming y diseño 3D.",
    priceCents: 79900,
    category: "GPU",
    imageUrl: "https://example.com/images/rtx4070ti.jpg",
    assets: {
      model3D: "https://example.com/assets/rtx4070ti.glb",
      specs: { vram: "12GB GDDR6X", boostClock: "2.61GHz" }
    }
  },
  {
    slug: "keychron-k6",
    name: "Teclado Mecánico Keychron K6",
    description: "Teclado mecánico compacto con Bluetooth y switches hot-swappable.",
    priceCents: 8900,
    category: "Periféricos",
    imageUrl: "https://example.com/images/keychronk6.jpg",
    assets: { layout: "ANSI", switches: "Gateron Red" }
  },
  {
    slug: "logitech-mx-master-3s",
    name: "Mouse Logitech MX Master 3S",
    description: "Mouse ergonómico con scroll electromagnético y conectividad multi-dispositivo.",
    priceCents: 10900,
    category: "Periféricos",
    imageUrl: "https://example.com/images/mxmaster3s.jpg",
    assets: { dpi: "8000", connectivity: "Bluetooth/USB" }
  },
  {
    slug: "lg-ultrawide-34",
    name: "Monitor LG UltraWide 34''",
    description: "Monitor ultrawide QHD de 34 pulgadas, ideal para multitarea y gaming.",
    priceCents: 45000,
    category: "Monitores",
    imageUrl: "https://example.com/images/lgultrawide.jpg",
    assets: { resolution: "3440x1440", refreshRate: "144Hz" }
  },
  {
    slug: "samsung-ssd-980-pro",
    name: "Samsung SSD 980 Pro 1TB",
    description: "SSD NVMe de alta velocidad con tecnología PCIe 4.0.",
    priceCents: 14900,
    category: "Almacenamiento",
    imageUrl: "https://example.com/images/ssd980pro.jpg",
    assets: { readSpeed: "7000 MB/s", writeSpeed: "5000 MB/s" }
  }
];

export async function seedProducts(prisma: PrismaClient) {
  console.log("🌱 Insertando productos...");

  for (const productData of productsData) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: productData,
      create: productData,
    });
    console.log(`✅ Producto: ${productData.name}`);
  }

  console.log(`✅ Insertados/actualizados ${productsData.length} productos`);
}
