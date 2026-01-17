// prisma/seed-orders.ts
import { OrderStatus, PrismaClient } from "@prisma/client";
import ordersData from "../data/orders.json";

interface OrderProduct {
  productSlug: string;
  quantity: number;
  priceCents: number;
}

interface OrderInput {
  userId: number;
  subtotalCents: number;
  taxCents: number;
  shippingCostCents: number;
  totalCents: number;
  shippingAddress?: string;
  billingAddress?: string;
  email?: string;
  phone?: string;
  status?: string;
  paymentMethod?: string;
  lastFourDigits?: string;
  clientTransactionId?: string;
  payphoneTransactionId?: string;
  orderProducts: OrderProduct[];
}

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
    for (const order of (ordersData as OrderInput[])) {
      try {
        // Validar que tenemos un clientTransactionId
        if (!order.clientTransactionId) {
          console.warn(`⚠️ Orden sin clientTransactionId, generando uno...`);
          order.clientTransactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        }

        // Verificar si la orden ya existe
        const existingOrder = await prisma.order.findUnique({
          where: { clientTransactionId: order.clientTransactionId },
        });

        if (existingOrder) {
          console.log(`ℹ️ Orden ya existe: ${order.clientTransactionId}, saltando...`);
          continue;
        }

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
            clientTransactionId: order.clientTransactionId,
            payphoneTransactionId: order.payphoneTransactionId ?? undefined,
            subtotalCents: order.subtotalCents,
            taxCents: order.taxCents,
            shippingCostCents: order.shippingCostCents,
            totalCents: order.totalCents,
            shippingAddress: order.shippingAddress ?? undefined,
            billingAddress: order.billingAddress ?? undefined,
            email: order.email ?? user.email,
            phone: order.phone ?? user.phone,
            status: parseOrderStatus(order.status),
            paymentMethod: order.paymentMethod ?? undefined,
            lastFourDigits: order.lastFourDigits ?? undefined,
          },
        });

        // 2. Buscar IDs de productos a partir del slug
        const products = await prisma.product.findMany({
          where: {
            slug: { in: order.orderProducts.map((op: OrderProduct) => op.productSlug) },
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
        console.error(`❌ Error procesando orden:`, itemError);
        continue;
      }
    }

    console.log("🌱 Orders seeding completed!");
  } catch (error) {
    console.error("❌ Error general en seeding de orders:", error);
    throw error;
  }
}

