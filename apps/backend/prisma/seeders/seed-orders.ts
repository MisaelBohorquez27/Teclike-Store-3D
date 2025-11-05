// prisma/seed-orders.ts
import { OrderStatus, PrismaClient } from "@prisma/client";
import ordersData from "../data/orders.json";

const prisma = new PrismaClient();

function parseOrderStatus(value?: string): OrderStatus {
  if (!value) return OrderStatus.PENDING;
  const normalized = value.toString().trim().toUpperCase();
  const valid = new Set(Object.values(OrderStatus));
  return (valid.has(normalized as OrderStatus) ? (normalized as OrderStatus) : OrderStatus.PENDING);
}

export async function seedOrders(prisma: PrismaClient) {
  console.log("🌱 Seeding orders...");

  for (const order of ordersData) {
    // 1. Crear la orden
    const createdOrder = await prisma.order.create({
      data: {
        userId: order.userId,
        subtotalCents: order.subtotalCents,
        taxCents: order.taxCents,
        shippingCostCents: order.shippingCostCents,
        totalCents: order.totalCents,
        shippingAddress: order.shippingAddress,
        status: parseOrderStatus(order.status),
      },
    });

    // 2. Buscar IDs de productos a partir del slug
    const products = await prisma.product.findMany({
      where: {
        slug: { in: order.orderProducts.map((op) => op.productSlug) },
      },
    });

    const productMap = Object.fromEntries(products.map((p) => [p.slug, p.id]));

    // 3. Insertar productos de la orden
    for (const op of order.orderProducts) {
      const productId = productMap[op.productSlug];
      if (!productId) {
        console.warn(`⚠️ Producto no encontrado en DB: ${op.productSlug}`);
        continue;
      }

      await prisma.orderItem.create({
        data: {
          orderId: createdOrder.id,
          productId,
          quantity: op.quantity,
          priceCents: op.priceCents,
        },
      });
    }

    console.log(`✅ Orden creada con id=${createdOrder.id}`);
  }

  console.log("🌱 Orders seeding completed!");
}

seedOrders(prisma)
  .catch((e) => {
    console.error("❌ Error seeding orders:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
