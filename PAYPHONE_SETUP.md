# Documentación de Variables de Entorno

## Configuración de Payphone

Para integrar Payphone en tu e-commerce, necesitas configurar las siguientes variables de entorno en tu archivo `.env` del backend:

### Variables Requeridas

#### 1. `PAYPHONE_TOKEN`
**Descripción:** Token de autenticación para la API de Payphone.

**Cómo obtenerlo:**
1. Ingresa a tu panel de Payphone: https://payphone.app/dashboard
2. Ve a **Configuración** → **API Keys**
3. Copia tu **Token de Autenticación**
4. Pégalo en el archivo `.env`

```env
PAYPHONE_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Importante:** Este token es secreto. NUNCA lo compartas ni lo subas a repositorios públicos.

---

#### 2. `PAYPHONE_STORE_ID`
**Descripción:** Identificador único de tu tienda en Payphone.

**Cómo obtenerlo:**
1. En tu panel de Payphone, ve a **Tiendas**
2. Copia el **Store ID** de tu tienda
3. Pégalo en el archivo `.env`

```env
PAYPHONE_STORE_ID=123456
```

---

#### 3. `FRONTEND_URL`
**Descripción:** URL base de tu aplicación frontend (donde se redirigirá al usuario después del pago).

**Valores según entorno:**
- **Desarrollo:** `http://localhost:3000`
- **Producción:** `https://tu-dominio.com`

```env
FRONTEND_URL=http://localhost:3000
```

---

## Configuración del Webhook

Para que Payphone pueda notificarte cuando un pago cambie de estado, debes configurar el webhook:

### 1. URL del Webhook
```
https://tu-dominio.com/api/payment/webhooks/payphone
```

### 2. Configurar en Payphone
1. Ve a tu panel de Payphone
2. Navega a **Configuración** → **Webhooks**
3. Agrega la URL de tu webhook
4. Selecciona los eventos: `payment.approved`, `payment.rejected`, `payment.cancelled`

### 3. Probar en Desarrollo (Opcional)
Si quieres probar webhooks en local, puedes usar **ngrok**:

```bash
# Instalar ngrok
npm install -g ngrok

# Exponer tu servidor local
ngrok http 5000

# Copiar la URL HTTPS generada y usarla como webhook en Payphone
https://abc123.ngrok.io/api/payment/webhooks/payphone
```

---

## Archivo .env Completo

```env
# ============================================
# PAYPHONE
# ============================================
PAYPHONE_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
PAYPHONE_STORE_ID=123456
FRONTEND_URL=http://localhost:3000

# ============================================
# BASE DE DATOS
# ============================================
DATABASE_URL=postgresql://user:password@localhost:5432/teclike_store

# ============================================
# AUTENTICACIÓN
# ============================================
JWT_SECRET=tu_jwt_secret_muy_seguro

# ============================================
# REDIS (CACHE)
# ============================================
REDIS_URL=redis://localhost:6379

# ============================================
# SERVIDOR
# ============================================
PORT=5000
NODE_ENV=development
```

---

## Migración de Base de Datos

Después de configurar las variables, ejecuta la migración de Prisma para crear las tablas de órdenes:

```bash
cd apps/backend
npx prisma migrate dev --name add_payphone_integration
npx prisma generate
```

---

## Verificar la Configuración

Para verificar que todo esté configurado correctamente:

```bash
# 1. Verifica que las variables existan
node -e "console.log(process.env.PAYPHONE_TOKEN ? '✅ Token configurado' : '❌ Token faltante')"

# 2. Inicia el servidor
npm run dev

# 3. Revisa los logs - deberías ver:
# "✅ Token de Payphone configurado"
```

---

## Seguridad

⚠️ **NUNCA** expongas estas variables:
- ❌ No las subas a GitHub
- ❌ No las compartas en Slack/Discord
- ❌ No las envíes por email

✅ **SÍ** haz esto:
- Usa `.env` (que está en `.gitignore`)
- Usa variables de entorno en producción (Vercel, Railway, etc.)
- Rota tokens periódicamente
- Usa diferentes tokens para dev/staging/prod

---

## Troubleshooting

### Error: "PAYPHONE_TOKEN is not defined"
**Solución:** Verifica que el archivo `.env` esté en `apps/backend/` y que el servidor se haya reiniciado.

### Error: "Unauthorized" al crear pago
**Solución:** El token de Payphone puede ser incorrecto o haber expirado. Genera uno nuevo desde el panel.

### Webhook no se ejecuta
**Solución:** 
1. Verifica que la URL del webhook esté correcta en Payphone
2. En desarrollo, usa ngrok para exponer tu localhost
3. Revisa los logs del servidor para ver errores

---

## Recursos Adicionales

- 📖 [Documentación de Payphone](https://payphone.app/api-documentation)
- 💬 [Soporte de Payphone](https://payphone.app/support)
- 🔐 [Panel de Payphone](https://payphone.app/dashboard)
