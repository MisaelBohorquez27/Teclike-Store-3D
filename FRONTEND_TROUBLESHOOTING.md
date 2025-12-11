# 🔧 Troubleshooting & FAQ - AddToCartButton

## 🚨 Problemas Comunes

### 1. "AddToCartButton no se importa"

**Error:**
```
Module not found: Can't resolve '@/components/Cart/AddToCartButton'
```

**Solución:**
```bash
# Verificar que el archivo existe en:
# apps/frontend/src/components/Cart/AddToCartButton.tsx

# Si no existe, crear la estructura:
mkdir -p apps/frontend/src/components/Cart
# Luego copiar AddToCartButton.tsx ahí
```

---

### 2. "useCart hook no funciona"

**Error:**
```
Cannot find module '@/hooks/useCart'
```

**Solución:**
```bash
# El hook debe estar en:
apps/frontend/src/hooks/useCart.ts

# Verificar que CartService existe:
apps/frontend/src/services/cartService.ts
```

---

### 3. "Botón no responde al click"

**Causas Posibles:**

#### a) CartService no está autenticado
```typescript
// En la consola del navegador:
console.log(localStorage.getItem('accessToken')); // Debe haber un token
```

**Solución:**
- Hacer login primero en la app
- Verificar que el token se guarda en localStorage

#### b) Hook useCart está lanzando error
```typescript
// Debuguear en ProductCard:
const { addToCart, loading, error } = useCart();
console.log('Error en useCart:', error);
```

**Solución:**
- Verificar que CartService.getCart() retorna datos válidos
- Revisar que la API `/api/cart` está respondiendo

---

### 4. "Selector de cantidad no muestra"

**Problema:** `showQuantitySelector={true}` pero no se ve

**Solución:**
```tsx
// Verificar que pases la prop correctamente:
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock}
  showQuantitySelector={true}  // ✅ Debe ser true
  initialQuantity={1}
/>
```

---

### 5. "Producto se agrega pero no se ve en carrito"

**Causas:**
1. localStorage no se actualiza
2. Estado global no refresca
3. Redis no sincroniza

**Debuguear:**
```typescript
// Abrir DevTools > Application > localStorage
// Buscar 'localCart' y verificar:
// {
//   "items": [
//     { "productId": 1, "quantity": 1, ... }
//   ],
//   "lastSync": timestamp
// }

// Si está vacío o no existe = error en CartService
```

---

### 6. "AddToCartButton lanza error 401"

**Significa:** Usuario no autenticado

**Solución:**
```typescript
// Antes de mostrar el botón, verificar autenticación:
import { CartService } from "@/services/cartService";

if (!CartService.isAuthenticated()) {
  return <LoginButton />;
}

return <AddToCartButton {...props} />;
```

---

### 7. "Error: 'maxStock' es undefined"

**Problema:** `maxStock={product.stock}` pero product.stock es undefined

**Solución:**
```tsx
// Siempre usar fallback:
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock ?? 0}  // ✅ Usar ?? 0
/>
```

---

### 8. "Botón muestra "Agotado" pero hay stock"

**Problema:** `maxStock <= 0` pero debería haber stock

**Verificar:**
```typescript
console.log("Stock del producto:", product.stock);
console.log("Tipo:", typeof product.stock);
// Debe ser número > 0
```

**Solución:**
- Verificar que backend retorna `stock: number` (no string)
- Parsear si es string: `parseInt(product.stock)`

---

### 9. "onSuccess y onError no se llaman"

**Problema:** Callbacks no se ejecutan

**Verificar:**
```tsx
<AddToCartButton
  {...props}
  onSuccess={() => {
    console.log("✅ SUCCESS CALLBACK");
  }}
  onError={(error) => {
    console.log("❌ ERROR CALLBACK:", error);
  }}
/>
```

**Solución:**
- Verificar que las funciones tienen el nombre correcto
- Probar con console.log dentro de los callbacks
- Verificar que addToCart() en useCart() lanza errores correctamente

---

### 10. "Spinner nunca desaparece"

**Problema:** Estado de carga se queda en `true`

**Causa:** Probablemente error en la API

**Debuguear:**
```typescript
// En Network tab del DevTools:
// Hacer click en AddToCartButton
// Buscar request a /api/cart/add
// Ver respuesta: ¿Error 500? ¿400? ¿Timeout?

// Si error 500, revisar logs del backend:
// cd apps/backend
// npm run dev
```

---

## 📊 Debugging Checklist

Cuando algo no funciona, chequea en orden:

```
1. ¿Frontend compila sin errores?
   → npm run build (desde apps/frontend)
   
2. ¿Backend está corriendo?
   → npm run dev (desde apps/backend)
   
3. ¿Token de autenticación existe?
   → DevTools > Application > localStorage > accessToken
   
4. ¿CartService retorna datos?
   → Network tab > XHR > /api/cart GET
   
5. ¿API retorna objeto CartDTO correcto?
   → { id, userId, items: [], subtotal, tax, total }
   
6. ¿useCart hook no tiene errores?
   → Agregar console.log en getCart(), addToCart()
   
7. ¿onClick del botón se ejecuta?
   → Agregar onClick handler custom para debuguear
   
8. ¿LocalStorage se actualiza?
   → DevTools > Application > localStorage > localCart
```

---

## 🔍 Network Tab Analysis

Cuando hagas click en AddToCartButton, deberías ver:

```
POST /api/cart/add
├─ Request:
│  ├─ Authorization: Bearer [token]
│  └─ Body: { productId: 1, quantity: 1 }
│
└─ Response:
   ├─ Status: 200 OK
   └─ Body: {
       id: 1,
       userId: 123,
       items: [{...}],
       subtotal: 99.99,
       tax: 9.99,
       shipping: 5.00,
       total: 114.98
     }
```

**Si ves error:**
- 401 → Token inválido o expirado → Hacer login de nuevo
- 400 → ProductId inválido → Verificar product.id
- 404 → Ruta no existe → Verificar backend routes
- 500 → Error en servidor → Ver logs del backend

---

## 📝 Common Error Messages

| Error | Causa | Solución |
|-------|-------|----------|
| "Usuario no autenticado" | No hay token en localStorage | Hacer login |
| "Producto sin stock" | maxStock <= 0 | Verificar product.stock |
| "Cantidad inválida" | quantity > maxStock | Usar selector de cantidad |
| "Error al agregar al carrito" | Error genérico API | Ver logs de backend |
| "Componente no encontrado" | Import incorrecto | Usar path correcto @/components |
| "Hook no disponible" | useCart no importado correctamente | Verificar ruta del hook |

---

## 🧪 Minimal Test Case

Si nada funciona, usa este código minimal:

```tsx
"use client";

import { AddToCartButton } from "@/components/Cart/AddToCartButton";

export default function TestPage() {
  return (
    <div className="p-8 space-y-4">
      <h1>Test AddToCartButton</h1>
      
      <AddToCartButton
        productId={1}
        productName="Test Product"
        maxStock={10}
        onSuccess={() => alert("✅ Success!")}
        onError={(error) => alert(`❌ Error: ${error}`)}
      />
      
      <hr className="my-4" />
      
      <p>Verificar en Console:</p>
      <pre className="bg-gray-100 p-2 text-xs overflow-auto">
{`localStorage.getItem('localCart')
localStorage.getItem('accessToken')
console.log('Token:', localStorage.getItem('accessToken')?.slice(0, 20))`}
      </pre>
    </div>
  );
}
```

Coloca esto en `apps/frontend/src/app/test-cart/page.tsx` y navega a `/test-cart`

---

## 📞 Escalar Issues

Si después de debuguear el issue persiste:

1. **Verificar Backend está funcionar:**
   ```bash
   curl -X GET http://localhost:3000/api/cart \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

2. **Verificar CartService.ts en frontend:**
   - ¿Los métodos coinciden con lo que usa AddToCartButton?
   - ¿El hook useCart está usando bien el servicio?

3. **Revisar tipos TypeScript:**
   - ¿Las props de AddToCartButton son correctas?
   - ¿CartResponse tiene la estructura esperada?

4. **Limpiar caché:**
   ```bash
   # Frontend
   rm -rf .next node_modules
   npm install && npm run dev
   
   # Backend (si es necesario)
   rm -rf node_modules dist
   npm install && npm run dev
   ```

---

**Last Updated:** 2024  
**Status:** ✅ Producción
