import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Diccionario de palabras clave para cada categoría
const categoryKeywords: Record<string, string[]> = {
  headsets: [
    "headset",
    "auricular",
    "headphone",
    "audífono",
  ],
  keyboards: [
    "keyboard",
    "teclado",
    "keychron",
    "keycap",
  ],
  mice: [
    "mouse",
    "ratón",
    "sensor",
    "dpi",
  ],
  monitors: [
    "monitor",
    "pantalla",
    "display",
    "screen",
    "ips",
    "led",
    "144hz",
    "4k",
    "ultrawide",
  ],
  webcams: [
    "webcam",
    "cámara",
  ],
  accessories: [
    "accesorio",
    "pad",
    "mousepad",
    "stand",
    "soporte",
    "cable",
    "adaptador",
    "hub",
  ],
  "gaming-chairs": [
    "silla",
    "chair",
    "gaming chair",
  ],
  consoles: [
    "console",
    "playstation",
    "xbox",
    "nintendo",
    "switch",
    "ps5",
    "xbox series",
  ],
};

// Palabras a excluir (evitar falsos positivos)
const excludeWords = [
  "the",
  "and",
  "with",
  "for",
  "your",
  "this",
  "that",
  "from",
];

function normalizeText(text: string): string[] {
  if (!text) return [];

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s]/gi, " ") // Replace special chars with spaces
    .split(/\s+/)
    .filter((word) => word.length > 2 && !excludeWords.includes(word));
}

function findMatchingCategories(
  description: string,
  productName: string
): string[] {
  const words = [...normalizeText(description), ...normalizeText(productName)];

  const matchedCategories = new Set<string>();

  // Buscar coincidencias para cada categoría
  for (const [categorySlug, keywords] of Object.entries(categoryKeywords)) {
    const hasMatch = keywords.some((keyword) =>
      words.some((word) => {
        // Coincidencia exacta o parcial
        return word.includes(keyword) || keyword.includes(word);
      })
    );

    if (hasMatch) {
      matchedCategories.add(categorySlug);
    }
  }

  return Array.from(matchedCategories);
}

export async function seedCategoryRelations() {
  console.log("🎯 Iniciando seeder automático de relaciones...");
  console.log("==============================================");

  try {
    // Obtener todos los productos con sus relaciones existentes
    const products = await prisma.product.findMany({
      include: {
        categoryProducts: {
          include: {
            category: true,
          },
        },
      },
    });

    // Obtener todas las categorías
    const categories = await prisma.category.findMany();
    const categoryMap = new Map(categories.map((cat) => [cat.slug, cat]));

    let totalRelationsCreated = 0;
    let productsProcessed = 0;

    for (const product of products) {
      productsProcessed++;

      // Obtener categorías existentes para este producto
      const existingCategorySlugs = product.categoryProducts.map(
        (cp) => cp.category.slug
      );

      // Encontrar categorías coincidentes basado en descripción y nombre
      const matchedCategorySlugs = findMatchingCategories(
        product.description || "",
        product.name
      );

      // Filtrar categorías que ya existen
      const newCategorySlugs = matchedCategorySlugs.filter(
        (slug) => !existingCategorySlugs.includes(slug)
      );

      if (newCategorySlugs.length === 0) {
        console.log(
          `⏭️  ${product.name} - Ya tiene todas las categorías necesarias`
        );
        continue;
      }

      console.log(`\n📦 ${product.name}`);
      console.log(
        `   Descripción: ${product.description?.substring(0, 60)}...`
      );
      console.log(
        `   Categorías detectadas: ${matchedCategorySlugs.join(", ")}`
      );
      console.log(`   Nuevas categorías: ${newCategorySlugs.join(", ")}`);

      // Crear nuevas relaciones
      for (const categorySlug of newCategorySlugs) {
        const category = categoryMap.get(categorySlug);

        if (category) {
          try {
            await prisma.categoryProduct.create({
              data: {
                categoryId: category.id,
                productId: product.id,
                description: `Auto-generated relation for ${category.name} and ${product.name}`,
              },
            });
            console.log(`   ✅ Relacionado con: ${category.name}`);
            totalRelationsCreated++;
          } catch (error) {
            // Ignorar errores de relaciones duplicadas (puede pasar en concurrencia)
            if (!error.message.includes("Unique constraint")) {
              console.log(
                `   ❌ Error relacionando con ${category.name}: ${error.message}`
              );
            }
          }
        }
      }
    }

    console.log("\n==============================================");
    console.log("🎉 Seeder completado exitosamente!");
    console.log(`📊 Productos procesados: ${productsProcessed}`);
    console.log(`🔗 Relaciones creadas: ${totalRelationsCreated}`);
  } catch (error) {
    console.error("❌ Error en el seeder:", error);
    throw error;
  }
}

// Ejecutar el seeder
seedCategoryRelations()
  .catch((e) => {
    console.error("❌ Error fatal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
