# 🚀 Integración de Payphone - Guía Rápida

## 📋 Resumen

Esta guía te ayudará a configurar y usar la integración de Payphone en tu e-commerce.

---

## 🔧 Configuración Inicial

### 1. Variables de Entorno

Agrega estas variables a tu archivo `.env` del backend:

```env
# Payphone Configuration
PAYPHONE_TOKEN=tu_token_de_payphone_aqui
PAYPHONE_STORE_ID=tu_store_id_aqui
FRONTEND_URL=http://localhost:3000
```

**¿Dónde obtener estos valores?**
👉 Lee [PAYPHONE_SETUP.md](./PAYPHONE_SETUP.md) para instrucciones detalladas.

---

### 2. Migración de Base de Datos

Ejecuta la migración de Prisma para crear las tablas de órdenes:

```bash
cd apps/backend
npx prisma migrate dev --name add_payphone_integration
npx prisma generate
```

---

### 3. Configurar Webhook en Payphone

1. Ve a tu panel de Payphone: https://payphone.app/dashboard
2. Navega a **Configuración** → **Webhooks**
3. Agrega esta URL: `https://tu-dominio.com/api/payment/webhooks/payphone`
4. Selecciona eventos: `payment.approved`, `payment.rejected`, `payment.cancelled`

**Para desarrollo local:**
```bash
# Usa ngrok para exponer tu localhost
npx ngrok http 5000

# Usa la URL HTTPS generada como webhook
https://abc123.ngrok.io/api/payment/webhooks/payphone
```

---

## 🎯 Uso del Sistema

### Flujo Completo de Pago

```
Usuario → Carrito → Checkout → Payphone → Webhook → Confirmación
```

#### 1️⃣ Usuario agrega productos al carrito
```typescript
// Frontend automático con AddToCartButton
<AddToCartButton 
  productId={1}
  productName="Laptop"
  maxStock={10}
/>
```

#### 2️⃣ Usuario hace clic en "Proceder al pago"
```typescript
// CheckoutButton maneja todo automáticamente
<CheckoutButton 
  cartItems={cart.items}
  total={cart.total}
/>
```

**Lo que sucede:**
- ✅ Valida que el carrito no esté vacío
- ✅ Valida que el usuario esté autenticado
- ✅ Crea una orden en la base de datos (estado `PENDING`)
- ✅ Llama a Payphone para generar link de pago
- ✅ Redirige al usuario a Payphone

#### 3️⃣ Usuario paga en Payphone
- El usuario ingresa sus datos de tarjeta en Payphone (no en tu sitio)
- Payphone procesa el pago de forma segura

#### 4️⃣ Webhook recibe confirmación
```typescript
// Backend automático - no requieres hacer nada
POST /api/payment/webhooks/payphone
```

**Lo que sucede:**
- ✅ Verifica que la transacción sea legítima (llama a Payphone para confirmar)
- ✅ Actualiza el estado de la orden (`APPROVED`, `REJECTED`, `CANCELLED`)
- ✅ Vacía el carrito si el pago fue aprobado
- ✅ (Opcional) Envía email de confirmación
- ✅ (Opcional) Reduce inventario

#### 5️⃣ Usuario ve el resultado
```
/payment/callback?orderId=123&clientTxId=ORDER-xxx
```

Muestra:
- ✅ Pago exitoso
- ⚠️ Pago cancelado
- ❌ Error en el pago

---

## 📁 Archivos Creados

### Backend

| Archivo | Descripción |
|---------|-------------|
| `src/types/payphone.types.ts` | Tipos TypeScript para Payphone |
| `src/services/payphone.service.ts` | Lógica de integración con Payphone |
| `src/controllers/payment.controller.ts` | Controlador HTTP de pagos |
| `src/routes/payment.routes.ts` | Rutas de pagos |
| `prisma/schema.prisma` | Modelo de Order actualizado |

### Frontend

| Archivo | Descripción |
|---------|-------------|
| `src/services/payment.service.ts` | Servicio para llamar al backend |
| `src/app/Cart/checkout/CheckoutButton.tsx` | Botón de checkout actualizado |
| `src/app/payment/callback/page.tsx` | Página de resultado del pago |

---

## 🧪 Pruebas

### 1. Probar Creación de Pago

```bash
# En desarrollo, inicia los servidores:
cd apps/backend && npm run dev
cd apps/frontend && npm run dev
```

1. Navega a http://localhost:3000
2. Agrega productos al carrito
3. Haz clic en "Proceder al pago"
4. Deberías ser redirigido a Payphone

### 2. Probar Webhook (Desarrollo)

```bash
# Terminal 1: Backend
cd apps/backend && npm run dev

# Terminal 2: ngrok
npx ngrok http 5000

# Copia la URL HTTPS y configúrala en Payphone
```

### 3. Verificar Estado de Orden

```bash
# Consultar orden por ID
curl http://localhost:5000/api/payment/status/1 \
  -H "Authorization: Bearer TU_TOKEN_JWT"
```

---

## 🔍 Endpoints Disponibles

### Crear Pago
```http
POST /api/payment/create
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

{
  "email": "cliente@example.com",
  "phone": "+593999999999",
  "shippingAddress": "Av. Principal 123",
  "billingAddress": "Av. Principal 123"
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "orderId": 1,
    "clientTransactionId": "ORDER-1234567890-ABC123",
    "payphoneTransactionId": 987654,
    "paymentUrl": "https://pay.payphonenetwork.com/...",
    "status": "PENDING"
  }
}
```

---

### Consultar Estado
```http
GET /api/payment/status/:orderId
Authorization: Bearer {JWT_TOKEN}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "APPROVED",
    "totalCents": 10000,
    "orderProducts": [...]
  }
}
```

---

### Webhook (Llamado por Payphone)
```http
POST /api/payment/webhooks/payphone
Content-Type: application/json

{
  "id": 987654,
  "clientTxId": "ORDER-1234567890-ABC123",
  "status": "Approved",
  "amount": 10000
}
```

---

## 🐛 Troubleshooting

### Error: "PAYPHONE_TOKEN is not defined"
**Causa:** Variables de entorno no configuradas.

**Solución:**
```bash
# Verifica que .env exista en apps/backend/
ls apps/backend/.env

# Reinicia el servidor
npm run dev
```

---

### Error: "Unauthorized" al crear pago
**Causa:** Token de Payphone inválido o expirado.

**Solución:**
1. Ve a https://payphone.app/dashboard
2. Genera un nuevo token
3. Actualiza `PAYPHONE_TOKEN` en `.env`
4. Reinicia el servidor

---

### Webhook no se ejecuta
**Causa:** URL del webhook no configurada o incorrecta.

**Solución:**
```bash
# 1. Verifica que el endpoint funcione
curl -X POST http://localhost:5000/api/payment/webhooks/payphone \
  -H "Content-Type: application/json" \
  -d '{"id":1,"clientTxId":"TEST","status":"Approved"}'

# 2. Para desarrollo, usa ngrok
npx ngrok http 5000

# 3. Configura la URL HTTPS en Payphone
```

---

### Pago aprobado pero carrito no se vació
**Causa:** Webhook no se ejecutó o falló.

**Solución:**
1. Revisa los logs del backend: `npm run dev`
2. Busca mensajes de `[WEBHOOK]`
3. Si no hay logs, el webhook no está configurado en Payphone
4. Si hay errores, revisa el mensaje de error

---

## 🔐 Seguridad

### ✅ Buenas Prácticas Implementadas

- ✅ **Token en backend:** Las credenciales de Payphone NUNCA van al frontend
- ✅ **Verificación de webhook:** Siempre verificamos con Payphone antes de aprobar
- ✅ **IDs únicos:** Cada orden tiene un `clientTransactionId` único
- ✅ **Estado de orden:** Tracked en base de datos para auditoría
- ✅ **Autenticación requerida:** Solo usuarios logueados pueden crear órdenes

### ⚠️ Recomendaciones Adicionales

- 🔒 Usa HTTPS en producción (requerido por Payphone)
- 🔑 Rota tokens de Payphone periódicamente
- 📝 Mantén logs de todas las transacciones
- 🚫 Nunca expongas `PAYPHONE_TOKEN` en el frontend
- 🔍 Monitorea intentos fallidos de webhook

---

## 📞 Soporte

¿Problemas con la integración?

1. 📖 Lee [PAYPHONE_SETUP.md](./PAYPHONE_SETUP.md)
2. 🔍 Revisa los logs del backend
3. 💬 Contacta al equipo de Payphone: https://payphone.app/support
4. 📧 Email: soporte@payphone.app

---

## 📚 Recursos

- [Documentación de Payphone](https://payphone.app/api-documentation)
- [Panel de Payphone](https://payphone.app/dashboard)
- [Guía de Configuración Completa](./PAYPHONE_SETUP.md)

---

**¡Listo para empezar a recibir pagos! 🎉**
