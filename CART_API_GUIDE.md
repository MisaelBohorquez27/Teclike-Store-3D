# Guía de API del Carrito - Backend

## 📋 Descripción General

El sistema de carrito es **híbrido** y solo funciona para **usuarios autenticados**:

1. **Caché (Redis)**: Almacenamiento rápido para operaciones inmediatas
2. **Base de Datos (PostgreSQL)**: Almacenamiento persistente
3. **Sincronización Automática**: Cada 5 minutos o cuando hay cambios

### Flujo de Datos

```
Cliente (localStorage)
    ↓
Backend (Redis Cache)
    ↓ [Sincronización cada 5 min]
Base de Datos (PostgreSQL)
```

## 🔐 Autenticación Requerida

**Todas las rutas del carrito requieren autenticación JWT** mediante el header:

```
Authorization: Bearer <JWT_TOKEN>
```

Sin autenticación, recibirás:
```json
{
  "success": false,
  "message": "Autenticación requerida"
}
```

---

## 📡 Endpoints

### 1. Obtener Carrito del Usuario

```http
GET /api/cart
Authorization: Bearer <JWT_TOKEN>
```

**Respuesta (200):**
```json
{
  "id": 1,
  "userId": 5,
  "items": [
    {
      "id": 1,
      "productId": 10,
      "quantity": 2,
      "product": {
        "id": 10,
        "name": "Laptop Gaming",
        "description": "Laptop de alto rendimiento",
        "priceCents": 99999,
        "price": 999.99,
        "priceString": "$999.99",
        "imageUrl": "https://example.com/laptop.jpg",
        "inStock": true,
        "stock": 5
      }
    }
  ],
  "subtotal": 1999.98,
  "tax": 159.99,
  "shipping": 9.99,
  "total": 2169.96
}
```

---

### 2. Agregar Producto al Carrito

```http
POST /api/cart/add
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "productId": 10,
  "quantity": 1
}
```

**Validaciones:**
- `productId` es requerido
- `quantity` debe ser ≥ 1
- El producto debe existir
- Debe haber stock disponible

**Respuesta (200):**
```json
{
  "id": 1,
  "userId": 5,
  "items": [...],
  "subtotal": 999.99,
  "tax": 79.99,
  "shipping": 0,
  "total": 1079.98
}
```

**Errores posibles:**
- `400` - productId o quantity inválidos
- `404` - Producto no encontrado
- `400` - Producto agotado
- `400` - Cantidad mayor al stock disponible

---

### 3. Actualizar Cantidad de Producto

```http
PUT /api/cart/update
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "productId": 10,
  "quantity": 3
}
```

**Validaciones:**
- `productId` es requerido
- `quantity` debe ser ≥ 0
- Si `quantity = 0`, el producto se elimina
- No puede exceder el stock disponible

**Respuesta (200):** Carrito actualizado

**Casos especiales:**
- `quantity = 0` → El producto se elimina del carrito
- `quantity > stock` → Error de validación

---

### 4. Eliminar Producto del Carrito

```http
DELETE /api/cart/remove
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "productId": 10
}
```

**Validaciones:**
- `productId` es requerido
- El producto debe estar en el carrito

**Respuesta (200):** Carrito actualizado sin el producto

---

### 5. Vaciar Carrito Completamente

```http
DELETE /api/cart/clear
Authorization: Bearer <JWT_TOKEN>
```

**Respuesta (200):**
```json
{
  "id": 1,
  "userId": 5,
  "items": [],
  "subtotal": 0,
  "tax": 0,
  "shipping": 0,
  "total": 0
}
```

---

## 🔄 Sincronización del Carrito

### Comportamiento Automático

1. **Cada operación (add, update, remove)**:
   - Se guarda en caché (Redis)
   - Se marca como "dirty" (necesita sincronización)
   - Se retorna inmediatamente al cliente

2. **Cada 5 minutos**:
   - Middleware verifica si hay cambios pendientes
   - Sincroniza automáticamente con la BD
   - Actualiza timestamp de última sincronización

3. **En caché por 24 horas**:
   - Los datos se limpian automáticamente después de 24h sin acceso
   - Al limpiar, se sincroniza con BD primero

### Ventajas

✅ **Rápido**: Las operaciones responden al instante desde caché
✅ **Confiable**: Sincronización automática evita pérdida de datos
✅ **Eficiente**: No actualiza BD en cada operación
✅ **Escalable**: Caché reduce carga en BD

---

## 📱 Flujo en el Frontend

### 1. Usuario sin Login

```javascript
// Usar localStorage directamente
// NO hacer requests al carrito
const localCart = JSON.parse(localStorage.getItem('cart') || '{}');
```

### 2. Usuario hace Login

```javascript
// POST a /api/auth/login
// Recibe JWT token
localStorage.setItem('auth_token', token);

// Luego sincronizar carrito local con backend
const localCart = JSON.parse(localStorage.getItem('cart') || '{}');
const response = await fetch('/api/cart/sync', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ localCart })
});
```

### 3. Operaciones en Carrito (Autenticado)

```javascript
// Agregar producto
await fetch('/api/cart/add', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ productId: 10, quantity: 1 })
});

// Limpiar localStorage después de agregar
localStorage.removeItem('cart');

// O mantener sincronizado para backup
```

### 4. Usuario hace Logout

```javascript
// Limpiar token
localStorage.removeItem('auth_token');

// Backend sincroniza automáticamente antes de logout
// Si el carrito se marcó como dirty, se sincroniza en los siguientes 5 min
```

---

## 🛡️ Seguridad

### Protecciones Implementadas

1. **Autenticación JWT requerida** en todas las rutas
2. **Validación de stock** antes de agregar/actualizar
3. **Validación de entrada** en todos los campos
4. **Usuario solo accede su propio carrito** (protegido por userId del token)
5. **Rate limiting** en auth (5 intentos login en 15 min)

### Ejemplo de Error de Seguridad

```
GET /api/cart/5  ❌ No permitido
El endpoint no incluye ID en la URL, solo accede el carrito del usuario autenticado
```

---

## 📊 Modelos de Datos

### Cart (BD)

```typescript
{
  id: number;           // ID único del carrito
  userId: number;       // Usuario dueño del carrito
  createdAt: DateTime;  // Fecha creación
  updatedAt: DateTime;  // Última actualización
}
```

### CartProduct (BD)

```typescript
{
  id: number;           // ID único del item
  cartId: number;       // Carrito asociado
  productId: number;    // Producto
  quantity: number;     // Cantidad
  priceCents: number;   // Precio en centavos
  createdAt: DateTime;  // Fecha adición
  updatedAt: DateTime;  // Última actualización
}
```

### Caché (Redis)

```typescript
cart:{userId}              // Carrito completo con productos
cartDirty:{userId}         // Flag: necesita sincronización
lastSync:{userId}          // Timestamp última sincronización
```

---

## 🐛 Manejo de Errores

### Errores Comunes

| Código | Mensaje | Causa | Solución |
|--------|---------|-------|----------|
| 401 | Autenticación requerida | Sin token o token inválido | Login nuevamente |
| 400 | productId es requerido | Field faltante | Incluir productId |
| 400 | Cantidad debe ser > 0 | quantity inválido | Validar quantity |
| 404 | Producto no encontrado | ID producto no existe | Verificar productId |
| 400 | Producto agotado | stock = 0 | Seleccionar otro |
| 400 | Solo hay X unidades | quantity > stock | Reducir cantidad |
| 500 | Error al obtener carrito | Error del servidor | Reintentar |

---

## 🔧 Ejemplos con cURL

### Agregar producto

```bash
curl -X POST http://localhost:3000/api/cart/add \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{"productId": 10, "quantity": 1}'
```

### Actualizar cantidad

```bash
curl -X PUT http://localhost:3000/api/cart/update \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{"productId": 10, "quantity": 5}'
```

### Obtener carrito

```bash
curl -X GET http://localhost:3000/api/cart \
  -H "Authorization: Bearer eyJhbGc..."
```

### Vaciar carrito

```bash
curl -X DELETE http://localhost:3000/api/cart/clear \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## 📈 Monitoreo

### Logs Importantes

```
[INFO] Cart sync for user 5 completed
[INFO] Cart marked dirty for user 5
[ERROR] Error syncing cart for user 5: Stock exceeded
[WARN] Cart not found for user 5, creating new
```

### Redis Keys para Debugging

```bash
# Ver carrito en caché
redis-cli GET cart:5

# Ver si necesita sincronización
redis-cli EXISTS cartDirty:5

# Ver última sincronización
redis-cli GET lastSync:5

# Limpiar carrito de caché
redis-cli DEL cart:5
```

---

## 🚀 Próximos Pasos (Frontend)

1. Implementar UI del carrito
2. Conectar endpoints con formularios
3. Sincronizar localStorage con backend
4. Mostrar totales (subtotal, impuestos, envío)
5. Integrar con checkout

