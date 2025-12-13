/**
 * Rutas para pagos con Payphone
 */

import { Router } from 'express';
import * as paymentController from '../controllers/payment.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

/**
 * POST /api/payment/create
 * Crea una orden y genera link de pago
 * Requiere autenticación
 */
router.post(
  '/create',
  requireAuth,
  paymentController.createPayment
);

/**
 * GET /api/payment/status/:orderId
 * Consulta el estado de una orden
 * Requiere autenticación
 */
router.get(
  '/status/:orderId',
  requireAuth,
  paymentController.getPaymentStatus
);

/**
 * POST /webhooks/payphone
 * Webhook para recibir notificaciones de Payphone
 * NO requiere autenticación (Payphone lo llama directamente)
 */
router.post(
  '/webhooks/payphone',
  paymentController.payphoneWebhook
);

export default router;
