# Testing del Carrito - Ejemplos de Request

## 🧪 Guía de Testing de la API del Carrito

Usa esta guía para probar los endpoints con **Postman**, **Thunder Client**, o **cURL**.

---

## 1️⃣ Obtener Token JWT

Primero, necesitas un token válido.

### Request

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}
```

### Response (200)

```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcwMjMyNDMyMH0.xyz123",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xyz456",
    "user": {
      "id": 5,
      "email": "usuario@example.com",
      "name": "Juan Pérez"
    }
  }
}
```

**Guarda el `accessToken` para usar en los siguientes requests.**

---

## 2️⃣ Obtener Carrito Vacío (Nuevo Usuario)

### Request

```http
GET http://localhost:3000/api/cart
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response (200)

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

## 3️⃣ Obtener Productos Disponibles

Para saber qué productos agregar, primero consulta los productos:

```http
GET http://localhost:3000/api/products
```

Respuesta incluirá productos con `id` y `priceCents`.

Ejemplo:
```json
[
  {
    "id": 1,
    "name": "Laptop Dell",
    "priceCents": 89999,
    "inventory": { "stock": 10 }
  },
  {
    "id": 2,
    "name": "Monitor 24\"",
    "priceCents": 24999,
    "inventory": { "stock": 5 }
  }
]
```

---

## 4️⃣ Agregar Producto al Carrito

### Request 1: Agregar Laptop

```http
POST http://localhost:3000/api/cart/add
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "productId": 1,
  "quantity": 1
}
```

### Response (200)

```json
{
  "id": 1,
  "userId": 5,
  "items": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 1,
      "product": {
        "id": 1,
        "name": "Laptop Dell",
        "description": "Laptop de alto rendimiento",
        "priceCents": 89999,
        "price": 899.99,
        "priceString": "$899.99",
        "imageUrl": "https://example.com/laptop.jpg",
        "inStock": true,
        "stock": 10
      }
    }
  ],
  "subtotal": 899.99,
  "tax": 71.99,
  "shipping": 9.99,
  "total": 981.97
}
```

---

### Request 2: Agregar Monitor

```http
POST http://localhost:3000/api/cart/add
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "productId": 2,
  "quantity": 2
}
```

### Response (200)

```json
{
  "id": 1,
  "userId": 5,
  "items": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 1,
      "product": {
        "id": 1,
        "name": "Laptop Dell",
        "priceCents": 89999,
        "price": 899.99,
        "priceString": "$899.99",
        "imageUrl": "https://example.com/laptop.jpg",
        "inStock": true,
        "stock": 10
      }
    },
    {
      "id": 2,
      "productId": 2,
      "quantity": 2,
      "product": {
        "id": 2,
        "name": "Monitor 24\"",
        "priceCents": 24999,
        "price": 249.99,
        "priceString": "$249.99",
        "imageUrl": "https://example.com/monitor.jpg",
        "inStock": true,
        "stock": 5
      }
    }
  ],
  "subtotal": 1399.97,
  "tax": 111.99,
  "shipping": 9.99,
  "total": 1521.95
}
```

---

## 5️⃣ Error: Producto Agotado

### Request

```http
POST http://localhost:3000/api/cart/add
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "productId": 99,
  "quantity": 1
}
```

### Response (404)

```json
{
  "success": false,
  "message": "Error al agregar al carrito",
  "error": "Producto no encontrado"
}
```

---

## 6️⃣ Error: Cantidad Mayor al Stock

### Request

```http
POST http://localhost:3000/api/cart/add
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "productId": 2,
  "quantity": 100
}
```

### Response (400)

```json
{
  "success": false,
  "message": "Error al agregar al carrito",
  "error": "Solo hay 5 unidades disponibles"
}
```

---

## 7️⃣ Actualizar Cantidad de Producto

### Request 1: Aumentar cantidad del Monitor a 3

```http
PUT http://localhost:3000/api/cart/update
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "productId": 2,
  "quantity": 3
}
```

### Response (200)

```json
{
  "id": 1,
  "userId": 5,
  "items": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 1,
      "product": { ... }
    },
    {
      "id": 2,
      "productId": 2,
      "quantity": 3,  // ← Actualizado
      "product": { ... }
    }
  ],
  "subtotal": 1649.96,
  "tax": 131.99,
  "shipping": 9.99,
  "total": 1791.94
}
```

---

### Request 2: Disminuir cantidad de Laptop a 0 (Elimina del carrito)

```http
PUT http://localhost:3000/api/cart/update
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "productId": 1,
  "quantity": 0
}
```

### Response (200)

```json
{
  "id": 1,
  "userId": 5,
  "items": [
    {
      "id": 2,
      "productId": 2,
      "quantity": 3,
      "product": { ... }
    }
  ],
  "subtotal": 749.97,
  "tax": 59.99,
  "shipping": 9.99,
  "total": 819.95
}
```

---

## 8️⃣ Eliminar Producto del Carrito

### Request

```http
DELETE http://localhost:3000/api/cart/remove
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "productId": 2
}
```

### Response (200)

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

## 9️⃣ Vaciar Carrito

### Request

```http
DELETE http://localhost:3000/api/cart/clear
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Response (200)

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

## 🔟 Error: Sin Autenticación

### Request (Sin token)

```http
GET http://localhost:3000/api/cart
```

### Response (401)

```json
{
  "success": false,
  "message": "Autenticación requerida"
}
```

---

## 1️⃣1️⃣ Error: Token Expirado

### Request (Con token expirado)

```http
GET http://localhost:3000/api/cart
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.expired...
```

### Response (401)

```json
{
  "success": false,
  "message": "Autenticación requerida"
}
```

**Solución**: Hacer login nuevamente para obtener nuevo token.

---

## 🧪 Flujo Completo de Prueba

```bash
# 1. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com","password":"password123"}'

# Copiar accessToken

# 2. Obtener carrito vacío
curl -X GET http://localhost:3000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN"

# 3. Agregar producto
curl -X POST http://localhost:3000/api/cart/add \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":2}'

# 4. Ver carrito actualizado
curl -X GET http://localhost:3000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN"

# 5. Actualizar cantidad
curl -X PUT http://localhost:3000/api/cart/update \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId":1,"quantity":5}'

# 6. Vaciar carrito
curl -X DELETE http://localhost:3000/api/cart/clear \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📝 Notas Importantes

1. **Token JWT expira**: Guarda el refresh token para renovar sin re-login
2. **Sincronización automática**: Cambios se sincronizan con BD cada 5 minutos
3. **Stock se valida**: No puedes agregar más de lo disponible
4. **Carrito por usuario**: Cada usuario solo ve su carrito
5. **Cálculos automáticos**: Impuestos (8%) y envío se calculan automáticamente

---

## 🔧 Postman Collection Template

```json
{
  "info": {
    "name": "Teclike Store - Cart API",
    "version": "1.0"
  },
  "item": [
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/api/auth/login",
        "body": {
          "mode": "raw",
          "raw": "{\"email\":\"usuario@example.com\",\"password\":\"password123\"}"
        }
      }
    },
    {
      "name": "Get Cart",
      "request": {
        "method": "GET",
        "url": "{{base_url}}/api/cart",
        "header": {
          "Authorization": "Bearer {{access_token}}"
        }
      }
    },
    {
      "name": "Add to Cart",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/api/cart/add",
        "header": {
          "Authorization": "Bearer {{access_token}}"
        },
        "body": {
          "mode": "raw",
          "raw": "{\"productId\":1,\"quantity\":1}"
        }
      }
    }
  ]
}
```

