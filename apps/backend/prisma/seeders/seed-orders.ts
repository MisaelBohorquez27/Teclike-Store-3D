// prisma/seed-orders.ts
import { OrderStatus, PrismaClient } from "@prisma/client";
import ordersData from "../data/orders.json";

const prisma = new PrismaClient();

function parseOrderStatus(value?: string): OrderStatus {
  if (!value) return OrderStatus.PENDING;
  const normalized = value.toString().trim().toUpperCase();
  
  // Validar contra los valores enum disponibles
  const validStatuses = Object.values(OrderStatus);
  
  if (validStatuses.includes(normalized as OrderStatus)) {
    return normalized as OrderStatus;
  }
  
  // Si no es válido, retornar PENDING como default
  console.warn(`⚠️ Estado no válido: "${value}", usando PENDING por defecto`);
  return OrderStatus.PENDING;
}

export async function seedOrders(prisma: PrismaClient) {
  console.log("🌱 Seeding orders...");

  try {
    for (const order of ordersData) {
      try {
        // Verificar que el usuario existe
        const user = await prisma.user.findUnique({
          where: { id: order.userId },
        });

        if (!user) {
          console.warn(`⚠️ Usuario no encontrado: ID ${order.userId}, saltando orden...`);
          continue;
        }

        // 1. Crear la orden
        const createdOrder = await prisma.order.create({
          data: {
            userId: order.userId,
            clientTransactionId: order.clientTransactionId || `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            payphoneTransactionId: order.payphoneTransactionId || null,
            subtotalCents: order.subtotalCents,
            taxCents: order.taxCents,
            shippingCostCents: order.shippingCostCents,
            totalCents: order.totalCents,
            shippingAddress: order.shippingAddress || null,
            billingAddress: (order as any).billingAddress || null,
            email: (order as any).email || user.email,
            phone: (order as any).phone || user.phone,
            status: parseOrderStatus((order as any).status),
            paymentMethod: (order as any).paymentMethod || null,
            lastFourDigits: (order as any).lastFourDigits || null,
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
            console.warn(`⚠️ Producto no encontrado: ${op.productSlug}, saltando item...`);
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

        console.log(`✅ Orden creada: ID=${createdOrder.id}, Usuario=${order.userId}, Total=${createdOrder.totalCents}¢`);
      } catch (itemError) {
        console.error(`❌ Error procesando orden del usuario ${order.userId}:`, itemError);
        continue;
      }
    }

    console.log("🌱 Orders seeding completed!");
  } catch (error) {
    console.error("❌ Error general en seeding de orders:", error);
    throw error;
  }
}

seedOrders(prisma)
  .catch((e) => {
    console.error("❌ Error seeding orders:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
