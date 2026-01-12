import { PrismaClient } from "@prisma/client";

// Diccionario de palabras clave para cada categoría
const categoryKeywords: Record<string, string[]> = {
  headsets: ["headset", "auricular", "headphone", "audífono", "blackshark"],
  keyboards: ["keyboard", "teclado", "keychron"],
  keycaps: ["keycap", "keycaps"],
  mouse: ["mouse", "ratón", "sensor", "dpi", "eyooso", "logitech", "razer"],
  mousepads: ["mousepad", "pad"],
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
  webcams: ["webcam", "cámara"],
  accessories: [
    "accesorio",
    "kit",
    "limpieza",
    "stand",
    "soporte",
    "cable",
    "adaptador",
    "hub",
  ],
  "gaming-chairs": ["silla", "chair", "gaming chair"],
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
        // Solo coincidencia exacta - evitar falsos positivos
        return word === keyword;
      })
    );

    if (hasMatch) {
      matchedCategories.add(categorySlug);
    }
  }

  return Array.from(matchedCategories);
}

export async function seedCategoryRelations(prisma: PrismaClient) {
  console.log("🎯 Insertando relaciones categoría-producto...");
  console.log("==============================================");

  let totalRelationsCreated = 0;
  let totalRelationsSkipped = 0;
  let productsProcessed = 0;
  let errors = 0;

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

    for (const product of products) {
      productsProcessed++;

      try {
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
          totalRelationsSkipped++;
          console.log(
            `⏭️  ${product.name} - Ya tiene todas las categorías`
          );
          continue;
        }

        console.log(`\n📦 ${product.name}`);
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
                  description: `Auto-generada para ${category.name}`,
                },
              });
              console.log(`   ✅ ${category.name}`);
              totalRelationsCreated++;
            } catch (relationError) {
              const message = relationError instanceof Error ? relationError.message : String(relationError);
              if (!message.includes("Unique constraint")) {
                errors++;
                console.error(`   ❌ Error: ${message}`);
              }
            }
          }
        }
      } catch (productError) {
        errors++;
        console.error(`❌ Error procesando ${product.name}:`, productError);
      }
    }

    console.log("\n==============================================");
    console.log("📊 Estadísticas finales:");
    console.log(`   • Productos procesados: ${productsProcessed}`);
    console.log(`   • Relaciones creadas: ${totalRelationsCreated}`);
    console.log(`   • Relaciones saltadas: ${totalRelationsSkipped}`);
    console.log(`   • Errores: ${errors}`);
    console.log("==============================================");
  } catch (error) {
    console.error("❌ Error en seedCategoryRelations:", error);
    throw error;
  }
}
