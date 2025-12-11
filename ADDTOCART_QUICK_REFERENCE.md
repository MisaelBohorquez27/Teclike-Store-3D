# ⚡ AddToCartButton - QUICK REFERENCE

## 📍 Ubicación
```
apps/frontend/src/components/Cart/AddToCartButton.tsx
```

## 🚀 Uso Básico (30 segundos)

```tsx
import { AddToCartButton } from "@/components/Cart/AddToCartButton";

<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock ?? 0}
/>
```

---

## 📦 Props Rápidos

| Prop | Tipo | Requerido | Default | Ejemplo |
|------|------|----------|---------|---------|
| `productId` | number | ✅ | - | `123` |
| `productName` | string | ✅ | - | `"Laptop Pro"` |
| `maxStock` | number | ✅ | - | `10` |
| `onSuccess` | function | - | undefined | `() => toast.success()` |
| `onError` | function | - | undefined | `(e) => toast.error(e)` |
| `variant` | string | - | "default" | "outline" \| "ghost" |
| `size` | string | - | "md" | "sm" \| "lg" |
| `className` | string | - | "" | "w-full" |
| `showQuantitySelector` | boolean | - | false | true |
| `initialQuantity` | number | - | 1 | `5` |

---

## 🎨 Variantes

```tsx
// Default (Primario)
<AddToCartButton {...props} variant="default" />

// Outline (Secundario)
<AddToCartButton {...props} variant="outline" />

// Ghost (Terciario)
<AddToCartButton {...props} variant="ghost" />

// Small (Compacto)
<AddToCartButton {...props} variant="small" />
```

---

## 📏 Tamaños

```tsx
<AddToCartButton {...props} size="sm" />  // Pequeño
<AddToCartButton {...props} size="md" />  // Mediano (default)
<AddToCartButton {...props} size="lg" />  // Grande
```

---

## 🔄 Con Cantidad

```tsx
<AddToCartButton
  {...props}
  showQuantitySelector={true}
  initialQuantity={1}
  maxStock={10}
/>
```

---

## 📞 Callbacks

```tsx
<AddToCartButton
  {...props}
  onSuccess={() => {
    console.log("✅ Producto agregado");
    toast.success("Agregado al carrito");
  }}
  onError={(error) => {
    console.error("❌", error);
    toast.error(error);
  }}
/>
```

---

## 🎯 Casos de Uso Comunes

### En Card
```tsx
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock ?? 0}
  size="sm"
/>
```

### En Página de Detalles
```tsx
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock ?? 0}
  showQuantitySelector={true}
  size="lg"
/>
```

### Outline (Secondary Action)
```tsx
<AddToCartButton
  {...props}
  variant="outline"
  className="w-full"
/>
```

---

## ⚠️ Errores Comunes

```tsx
// ❌ MALO - Falta maxStock
<AddToCartButton productId={1} productName="Producto" />

// ✅ BIEN - Siempre con fallback
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock ?? 0}  // ← Importante
/>
```

---

## 🔍 Debugging

```typescript
// En consola del navegador:
localStorage.getItem('localCart')  // Ver items
localStorage.getItem('accessToken') // Ver token
localStorage.getItem('lastSync')   // Ver última sincronización
```

---

## 📋 Estados

| Estado | Apariencia | Interactivo |
|--------|-----------|------------|
| Normal | Botón + Ícono | ✅ |
| Cargando | Spinner + "Agregando..." | ❌ |
| Agotado | Ícono ⚠️ + "Agotado" | ❌ |
| Cantidad | Botones +/- | ✅ |

---

## 🚨 Requisitos

- [x] Hook `useCart` funcional
- [x] `CartService` disponible
- [x] Usuario autenticado (con token en localStorage)
- [x] Backend API `/api/cart/*` respondiendo

---

## 🧪 Test Rápido

```tsx
// apps/frontend/src/app/test/page.tsx
import { AddToCartButton } from "@/components/Cart/AddToCartButton";

export default function Test() {
  return (
    <div className="p-8">
      <AddToCartButton
        productId={1}
        productName="Test"
        maxStock={10}
        onSuccess={() => alert("✅")}
        onError={(e) => alert(`❌ ${e}`)}
      />
    </div>
  );
}
```

Navega a `/test` y prueba.

---

## 🎨 Personalización Rápida

### Cambiar colores
Editar `getButtonClasses()` en AddToCartButton.tsx:
```typescript
default: "bg-blue-600 text-white hover:bg-blue-700"
```

### Cambiar texto
No se puede (hardcodeado). Crear variant si necesitas.

### Cambiar ícono
Editar `CartIcon` component dentro del mismo archivo.

---

## 📚 Documentación Completa

- **FRONTEND_ADDTOCART_INTEGRATION.md** - Guía detallada
- **FRONTEND_COMPONENT_MIGRATION_EXAMPLES.md** - Ejemplos
- **FRONTEND_TROUBLESHOOTING.md** - FAQ

---

## ✅ Checklist Pre-Deploy

- [ ] Componente importa correctamente
- [ ] Props validadas (productId, productName, maxStock)
- [ ] Fallbacks para valores undefined
- [ ] onSuccess/onError callbacks funcionales
- [ ] Stock validado en backend
- [ ] Token incluido en requests
- [ ] localStorage actualiza
- [ ] Testear en mobile/tablet/desktop

---

## 🚀 Una Línea

```tsx
<AddToCartButton productId={product.id} productName={product.name} maxStock={product.stock ?? 0} />
```

---

**Version:** 1.0  
**Last Updated:** 2024  
**Status:** ✅ Production Ready
