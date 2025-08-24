// seeders/seed-categories.ts
import { PrismaClient } from '@prisma/client';

export async function seedCategories(prisma: PrismaClient) {
  console.log('📁 Insertando categorías...');

  const categories = [
    {
      name: 'Headsets',
      slug: 'headsets',
      description: 'Audio headsets for gaming, music, and communication'
    },
    {
      name: 'Keyboards',
      slug: 'keyboards',
      description: 'Mechanical and membrane keyboards for gaming and work'
    },
    {
      name: 'Mice',
      slug: 'mice',
      description: 'Gaming and productivity mice with precision sensors'
    },
    {
      name: 'Monitors',
      slug: 'monitors',
      description: 'Gaming and professional displays'
    },
    {
      name: 'Webcams',
      slug: 'webcams',
      description: 'High-quality cameras for streaming and video calls'
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Gaming accessories and peripherals'
    },
    {
      name: 'Gaming Chairs',
      slug: 'gaming-chairs',
      description: 'Ergonomic chairs for gaming and work'
    },
    {
      name: 'Consoles',
      slug: 'consoles',
      description: 'Gaming consoles and accessories'
    }
  ];

  for (const categoryData of categories) {
    await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {},
      create: categoryData
    });
    console.log(`✅ Categoría: ${categoryData.name}`);
  }

  return categories;
}