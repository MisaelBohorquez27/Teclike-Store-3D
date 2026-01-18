/**
 * Controlador de pagos con Payphone
 * Maneja la creación de pagos y webhooks de confirmación
 */

import { Request, Response } from 'express';
import { PrismaClient, OrderStatus } from '@prisma/client';
import * as payphoneService from '../services/payphone.service';
import * as cartService from '../services/cart.service';
import { handleError } from '../utils/errorHandler';
import {
  CreateOrderData,
  PayphoneWebhookPayload,
} from '../types/payphone.types';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  userId?: number;
}

/**
 * POST /api/payment/create
 * Crea una orden y genera un link de pago con Payphone
 * 
 * Body esperado:
 * {
 *   email: string (opcional),
 *   phone: string (opcional),
 *   shippingAddress: string (opcional),
 *   billingAddress: string (opcional)
 * }
 */
export async function createPayment(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId!;
    const { email, phone, shippingAddress, billingAddress } = req.body;

    console.log('💳 [PAYMENT] Iniciando creación de pago para usuario:', userId);

    // 1. Obtener el carrito del usuario
    const cartResponse = await cartService.getCart(userId);
    const cart = cartResponse.data;
    
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El carrito está vacío',
      });
    }

    console.log('🛒 [PAYMENT] Carrito obtenido:', {
      items: cart.items.length,
      total: cart.total,
    });

    // 2. Generar ID único de transacción
    const clientTransactionId = payphoneService.generateClientTransactionId();

    // 3. Crear la orden en la base de datos (estado PENDING)
    // Convertir valores a centavos para almacenar como Int
    const subtotalCents = Math.round((cart.subtotal || 0) * 100);
    const taxCents = Math.round((cart.tax || 0) * 100);
    const shippingCents = Math.round((cart.shipping || 0) * 100);
    const totalCents = Math.round(cart.total * 100);

    const order = await prisma.order.create({
      data: {
        userId: userId,
        clientTransactionId: clientTransactionId,
        status: OrderStatus.PENDING,
        subtotalCents: subtotalCents,
        taxCents: taxCents,
        shippingCostCents: shippingCents,
        totalCents: totalCents,
        email: email,
        phone: phone,
        shippingAddress: shippingAddress || 'Dirección no especificada',
        billingAddress: billingAddress,
        items: {
          create: cart.items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceCents: item.product?.priceCents || 0,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    console.log('📦 [PAYMENT] Orden creada:', {
      orderId: order.id,
      clientTxId: clientTransactionId,
    });

    // 4. Preparar datos para Payphone (convertir a centavos)
    const totalInCents = Math.round(cart.total * 100);
    const subtotalInCents = Math.round((cart.subtotal || 0) * 100);

    const payphoneData = {
      amount: totalInCents,
      amountWithoutTax: subtotalInCents,
      clientTransactionId: clientTransactionId,
      currency: 'USD',
      email: email,
      phoneNumber: phone,
      description: `Orden #${order.id} - ${cart.items.length} producto(s)`,
    };

    // 5. Crear transacción en Payphone
    const payphoneResponse = await payphoneService.createPayphonePayment(payphoneData);

    // 6. Guardar ID de Payphone en la orden
    await prisma.order.update({
      where: { id: order.id },
      data: {
        payphoneTransactionId: payphoneResponse.transactionId.toString(),
      },
    });

    // 7. Si el pago ya fue aprobado (raro pero posible)
    if (payphoneResponse.transactionStatus === 1) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: OrderStatus.APPROVED },
      });

      // Vaciar carrito
      await cartService.clearCart(userId);
    }

    console.log('✅ [PAYMENT] Pago creado exitosamente:', {
      orderId: order.id,
      payphoneId: payphoneResponse.transactionId,
      paymentUrl: payphoneResponse.payWithCard,
    });

    // 8. Retornar URL de pago al frontend
    res.json({
      success: true,
      data: {
        orderId: order.id,
        clientTransactionId: clientTransactionId,
        payphoneTransactionId: payphoneResponse.transactionId,
        paymentUrl: payphoneResponse.payWithCard,
        status: payphoneService.mapPayphoneStatus(payphoneResponse.transactionStatus),
      },
    });
  } catch (error: any) {
    console.error('❌ [PAYMENT] Error creando pago:', error);
    handleError(res, error, 'Error al crear el pago');
  }
}

/**
 * POST /webhooks/payphone
 * Recibe notificaciones de Payphone cuando cambia el estado del pago
 * 
 * IMPORTANTE: Este endpoint debe ser público (sin autenticación)
 * porque Payphone lo llama directamente
 */
export async function payphoneWebhook(req: Request, res: Response) {
  try {
    const webhookData: PayphoneWebhookPayload = req.body;

    console.log('🔔 [WEBHOOK] Recibido de Payphone:', {
      id: webhookData.id,
      clientTxId: webhookData.clientTxId,
      status: webhookData.status,
    });

    // 1. Verificar que la transacción sea legítima (llamar a Payphone para confirmar)
    const verifiedPayment = await payphoneService.verifyPayphonePayment(
      webhookData.id,
      webhookData.clientTxId
    );

    console.log('✅ [WEBHOOK] Pago verificado:', {
      transactionId: verifiedPayment.transactionId,
      status: verifiedPayment.transactionStatus,
    });

    // 2. Buscar la orden en la base de datos
    const order = await prisma.order.findFirst({
      where: {
        clientTransactionId: webhookData.clientTxId,
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      console.error('❌ [WEBHOOK] Orden no encontrada:', webhookData.clientTxId);
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada',
      });
    }

    // 3. Mapear estado de Payphone
    const newStatus = payphoneService.mapPayphoneStatus(verifiedPayment.transactionStatus);

    // 4. Actualizar orden solo si el estado cambió
    if (order.status !== newStatus) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: newStatus,
          payphoneTransactionId: verifiedPayment.transactionId.toString(),
          paymentMethod: verifiedPayment.cardType,
          lastFourDigits: verifiedPayment.lastFourDigits,
        },
      });

      console.log('📝 [WEBHOOK] Orden actualizada:', {
        orderId: order.id,
        oldStatus: order.status,
        newStatus: newStatus,
      });

      // 5. Si fue aprobado, vaciar el carrito del usuario
      if (newStatus === 'APPROVED' && order.userId) {
        await cartService.clearCart(order.userId);
        console.log('🧹 [WEBHOOK] Carrito vaciado para usuario:', order.userId);

        // TODO: Enviar email de confirmación
        // TODO: Actualizar inventario (reducir stock)
      }
    }

    // 6. Responder a Payphone (importante para que no reintente)
    res.json({
      success: true,
      message: 'Webhook procesado correctamente',
    });
  } catch (error: any) {
    console.error('❌ [WEBHOOK] Error procesando webhook:', error);
    
    // Importante: Siempre responder 200 para que Payphone no reintente
    // Pero loguear el error para investigar
    res.status(200).json({
      success: false,
      message: 'Error procesando webhook (logueado para revisión)',
    });
  }
}

/**
 * GET /api/payment/status/:orderId
 * Consulta el estado de una orden específica
 */
export async function getPaymentStatus(req: AuthRequest, res: Response) {
  try {
    const userId = req.userId!;
    const { orderId } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(orderId),
        userId: userId, // Solo el dueño puede ver su orden
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Orden no encontrada',
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    handleError(res, error, 'Error al consultar el estado del pago');
  }
}
