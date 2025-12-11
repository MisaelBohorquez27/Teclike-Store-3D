# 🛒 Sistema de Carrito - Diagrama de Arquitectura

## 📊 Arquitectura General

```
┌──────────────────────────────────────────────────────────────────┐
│                     CLIENTE (Frontend)                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐              ┌─────────────────┐          │
│  │  USUARIO ANÓNIMO│              │  USUARIO LOGUEADO          │
│  ├─────────────────┤              ├─────────────────┤          │
│  │                 │              │                 │          │
│  │ localStorage    │              │ localStorage +  │          │
│  │ (carrito local) │              │ JWT Token      │          │
│  │                 │              │                 │          │
│  └────────┬────────┘              └────────┬────────┘          │
│           │                               │                   │
│           │ NO REQUIERE API              │ REQUIERE API      │
│           │                               │                   │
└───────────┼───────────────────────────────┼───────────────────┘
            │                               │
            │                          ┌────▼────────────────────┐
            │                          │  AUTENTICACIÓN REQUERIDA│
            │                          │  (middleware requireAuth)
            │                          └────┬───────────────────┘
            │                               │
            └───────────────────────────────┤
                                            │
                                     ┌──────▼─────────┐
                                     │  SERVIDOR API  │
                                     │  (Node.js)     │
                                     └──────┬─────────┘
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    │                       │                       │
            ┌───────▼────────┐      ┌──────▼──────┐        ┌───────▼────────┐
            │  CONTROLLER    │      │  SERVICE    │        │  MIDDLEWARE    │
            │  (Validación)  │      │  (Lógica)   │        │  (Sincronización)
            └───────┬────────┘      └──────┬──────┘        └───────┬────────┘
                    │                      │                       │
                    └──────────────────────┼───────────────────────┘
                                           │
                               ┌───────────┴──────────┐
                               │                      │
                        ┌──────▼──────┐       ┌──────▼──────┐
                        │    REDIS    │       │  POSTGRESQL│
                        │   (Caché)   │       │  (Persistencia)
                        │             │       │             │
                        │ TTL: 24h    │       │  Transacciones
                        │ Rápido      │       │  Confiable
                        └─────────────┘       └─────────────┘
                               △                     △
                               │ Sincroniza cada 5 min
                               │ o cuando hay cambios
                               └─────────────────────┘
```

---

## 🔄 Flujos de Datos

### Flujo 1: Usuario Anónimo

```
┌─ Sin Login
│
├─ Agrega producto
│  │
│  ├─ NO hace request a API
│  │
│  └─ Guarda en localStorage del navegador
│     {
│       productId: 1,
│       quantity: 2,
│       ...
│     }
│
└─ Al hacer login → Carrito se sincroniza con backend
```

### Flujo 2: Usuario Autenticado - Agregar Producto

```
┌─ POST /api/cart/add
│  {
│    productId: 10,
│    quantity: 1,
│    Authorization: "Bearer JWT_TOKEN"
│  }
│
├─ authMiddleware
│  └─ Extrae userId del token ✓
│
├─ requireAuth
│  └─ Valida que esté autenticado ✓
│
├─ cartController.addToCart()
│  ├─ Valida productId requerido ✓
│  ├─ Valida quantity > 0 ✓
│  └─ Llama cartService.addToCart()
│
├─ cartService.addToCart()
│  ├─ Valida producto existe ✓
│  ├─ Valida stock disponible ✓
│  ├─ Obtiene carrito (o crea si no existe)
│  ├─ Llama cartRepository.addOrUpdateCartItem()
│  │
│  ├─ cartRepository (Prisma/PostgreSQL)
│  │  └─ INSERT/UPDATE cart_products ✓
│  │
│  ├─ Copia a Redis para caché rápido
│  ├─ Marca dirty flag (necesita sincronización)
│  └─ Retorna carrito actualizado
│
└─ Response 200
   {
     id: 1,
     userId: 5,
     items: [...],
     subtotal: 999.99,
     tax: 79.99,
     shipping: 9.99,
     total: 1079.98
   }
```

### Flujo 3: Sincronización Automática

```
┌─ Cambio realizado (add/update/remove)
│  ├─ Guardado en PostgreSQL ✓
│  ├─ Guardado en Redis ✓
│  └─ Dirty flag = true ✓
│
├─ [Esperar...]
│
├─ Cada request que llegue (5 minutos después)
│  │
│  └─ syncCartMiddleware ejecuta
│     ├─ Verifica lastSync timestamp
│     ├─ Valida si dirty flag está activo
│     │
│     ├─ Si: Sincronizar cambios
│     │  ├─ Obtiene carrito de Redis
│     │  ├─ Actualiza BD (PostgreSQL)
│     │  ├─ Limpia dirty flag
│     │  └─ Actualiza lastSync timestamp
│     │
│     └─ Si no: Skip, nada cambió
│
└─ Listo para siguiente operación
```

---

## 🔐 Seguridad en Capas

```
NIVEL 1: AUTENTICACIÓN
┌─────────────────────────────────┐
│ authMiddleware                  │
├─────────────────────────────────┤
│ Extrae JWT del header           │
│ Valida token                    │
│ Si válido → req.userId = número │
│ Si no → req.isAuthenticated=false│
└────────────┬────────────────────┘
             │
NIVEL 2: AUTORIZACIÓN
┌────────────▼────────────────────┐
│ requireAuth Middleware          │
├─────────────────────────────────┤
│ Verifica que userId exista      │
│ Si no → Error 401               │
│ Si sí → Continúa a handler      │
└────────────┬────────────────────┘
             │
NIVEL 3: VALIDACIÓN DE ENTRADA
┌────────────▼────────────────────┐
│ cartController                  │
├─────────────────────────────────┤
│ Valida productId requerido      │
│ Valida quantity > 0             │
│ Valida tipos de datos           │
└────────────┬────────────────────┘
             │
NIVEL 4: LÓGICA DE NEGOCIO
┌────────────▼────────────────────┐
│ cartService + cartRepository    │
├─────────────────────────────────┤
│ Valida producto existe          │
│ Valida stock disponible         │
│ userId del token != userid fake │
│ Operación ACID en BD            │
└─────────────────────────────────┘
```

---

## 💾 Almacenamiento de Datos

### PostgreSQL (Persistencia)

```sql
-- Carrito principal
CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  userId INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);

-- Items del carrito
CREATE TABLE cart_products (
  id SERIAL PRIMARY KEY,
  cartId INT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  productId INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INT DEFAULT 1,
  priceCents INT,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW(),
  UNIQUE(cartId, productId)
);

-- Índices para performance
CREATE INDEX idx_carts_userId ON carts(userId);
CREATE INDEX idx_cartProducts_cartId ON cart_products(cartId);
```

### Redis (Caché)

```
Key: cart:{userId}
├─ Contenido: Objeto carrito completo con productos
├─ TTL: 24 horas
├─ Razón: Lectura rápida de carrito frecuente
└─ Ejemplo:
   {
     "id": 1,
     "userId": 5,
     "cartProducts": [
       {
         "id": 1,
         "productId": 10,
         "quantity": 2,
         "product": { ... }
       }
     ]
   }

Key: cartDirty:{userId}
├─ Contenido: "1" (flag)
├─ TTL: 5 minutos + 60 segundos
├─ Razón: Indicar si carrito necesita sincronización
└─ Ejemplo: "1"

Key: lastSync:{userId}
├─ Contenido: Timestamp en milisegundos
├─ TTL: 24 horas
├─ Razón: Controlar intervalo de sincronización
└─ Ejemplo: "1702324532000"
```

---

## 📊 Flujo de Cálculos

### Cálculo de Totales

```javascript
// 1. Iterar items del carrito
items.forEach(item => {
  itemSubtotal = item.product.price * item.quantity
  subtotal += itemSubtotal
})

// 2. Calcular impuestos
const TAX_RATE = 0.08  // 8%
tax = subtotal * TAX_RATE
tax = Math.round(tax * 100) / 100  // Redondeo a 2 decimales

// 3. Calcular envío
const SHIPPING_THRESHOLD = 100  // En dólares
const DEFAULT_SHIPPING = 9.99

if (subtotal >= SHIPPING_THRESHOLD) {
  shipping = 0  // Envío gratis
} else {
  shipping = DEFAULT_SHIPPING
}

// 4. Calcular total
total = subtotal + tax + shipping

// Ejemplo:
// subtotal = $1,399.97
// tax = $111.99
// shipping = $0 (porque $1,399.97 > $100)
// total = $1,511.96
```

---

## 🚀 Ciclo de Vida Completo

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USUARIO SE REGISTRA                                         │
├─────────────────────────────────────────────────────────────────┤
│ POST /api/auth/register                                        │
│   └─ Backend crea usuario                                      │
│   └─ Backend crea carrito vacío en BD                          │
│   └─ Retorna JWT token                                         │
└────────────────┬────────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────────┐
│ 2. USUARIO AGREGA PRODUCTO AL CARRITO                          │
├─────────────────────────────────────────────────────────────────┤
│ POST /api/cart/add {productId: 1, quantity: 2}                │
│   └─ Validar entrada y stock                                   │
│   └─ Agregar a BD (PostgreSQL)                                 │
│   └─ Copiar a caché (Redis)                                    │
│   └─ Marcar dirty (necesita sincronización)                    │
│   └─ Retornar carrito actualizado                              │
└────────────────┬────────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────────┐
│ 3. MIDDLEWARE SINCRONIZA (cada 5 minutos)                      │
├─────────────────────────────────────────────────────────────────┤
│ syncCartMiddleware ejecuta                                      │
│   └─ Detecta dirty flag                                         │
│   └─ Obtiene datos de Redis                                    │
│   └─ Valida cambios desde última sincronización                │
│   └─ Actualiza BD (PostgreSQL)                                 │
│   └─ Limpia dirty flag                                         │
│   └─ Actualiza lastSync timestamp                              │
└────────────────┬────────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────────┐
│ 4. USUARIO PROCEDE A CHECKOUT                                  │
├─────────────────────────────────────────────────────────────────┤
│ GET /api/cart (obtener carrito actualizado)                    │
│   └─ Carrito sincronizado y listo                              │
│                                                                │
│ POST /api/checkout/confirm (crear orden)                      │
│   └─ Crear registro en orders                                  │
│   └─ Crear registros en order_items                           │
│   └─ Limpiar carrito                                           │
│   └─ Procesar pago                                             │
└────────────────┬────────────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────────────┐
│ 5. POST-COMPRA                                                 │
├─────────────────────────────────────────────────────────────────┤
│ GET /api/cart (obtener carrito vacío)                          │
│   └─ Carrito limpio y listo para nueva compra                  │
│                                                                │
│ DELETE /api/cart/clear (si no se limpió automáticamente)       │
│   └─ Garantizar carrito vacío                                  │
│   └─ Limpiar Redis cache                                       │
│   └─ Limpiar localStorage del cliente                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Ventajas de la Arquitectura

| Aspecto | Ventaja | Por qué |
|---------|---------|--------|
| **Híbrida** | Rápida + Confiable | Caché instant, BD persistente |
| **Autenticación** | Seguro | Solo usuarios logeados |
| **Sincronización** | Automática | No requiere trigger manual |
| **Stock validado** | Sin overselling | Verifica antes de agregar |
| **Cálculos automáticos** | UX simplificada | Tax & shipping al instante |
| **TypeScript** | Type-safe | Menos bugs en producción |
| **Redis TTL** | Limpieza automática | No acumula datos viejos |

---

## 📈 Ejemplo: Operación Completa

```
Usuario: Juan (ID: 5)
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

TIEMPO 0: POST /api/cart/add
├─ Agregar Laptop ($899.99) × 1
└─ Response:
   {
     items: [{
       productId: 1,
       quantity: 1,
       product: { name: "Laptop", price: 899.99 }
     }],
     subtotal: 899.99,
     tax: 71.99,
     shipping: 9.99,
     total: 981.97
   }

TIEMPO +2min: POST /api/cart/add
├─ Agregar Monitor ($249.99) × 2
└─ Response:
   {
     items: [
       { productId: 1, quantity: 1, product: { price: 899.99 } },
       { productId: 2, quantity: 2, product: { price: 249.99 } }
     ],
     subtotal: 1399.97,
     tax: 111.99,
     shipping: 0,        // Gratis porque > $100
     total: 1511.96
   }

TIEMPO +3min: [Redis tiene datos]
├─ cart:5 = { items: [...], ... }
├─ cartDirty:5 = "1"
└─ lastSync:5 = "1702324532000"

TIEMPO +8min: Middleware sincronización
├─ Detecta dirty flag activo ✓
├─ Obtiene carrito de Redis
├─ Actualiza BD (PostgreSQL)
├─ Limpia dirty flag
└─ Actualiza lastSync: ahora

TIEMPO +10min: GET /api/cart
├─ Obtiene de Redis (caché)
└─ Retorna carrito sincronizado

TIEMPO +15min: DELETE /api/cart/clear
├─ Limpia todos los items
├─ Actualiza BD
├─ Limpia Redis
└─ Carrito ahora vacío
```

