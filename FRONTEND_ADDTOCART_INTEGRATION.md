# 🛒 AddToCartButton - Guía de Integración Frontend

## 📋 Descripción

Se ha creado un componente reutilizable `AddToCartButton` que simplifica la integración del carrito en cualquier parte de la aplicación (product cards, detalles de producto, búsqueda, ofertas, etc).

## 📍 Ubicación

```
apps/frontend/src/components/Cart/AddToCartButton.tsx
```

## 🚀 Características

- ✅ **Reutilizable** - Se puede usar en cualquier componente
- ✅ **Variantes de diseño** - default, outline, ghost, small
- ✅ **3 tamaños** - sm, md (default), lg
- ✅ **Selector de cantidad** - Opcional con incremento/decremento
- ✅ **Estados de carga** - Spinner durante la operación
- ✅ **Validación de stock** - Desactiva si no hay stock
- ✅ **Callbacks** - onSuccess y onError para manejo personalizado
- ✅ **TypeScript** - Types completos

## 📦 Props

```typescript
interface AddToCartButtonProps {
  productId: number;              // ID del producto (REQUERIDO)
  productName: string;            // Nombre del producto (para logging/feedback)
  maxStock: number;               // Stock máximo disponible
  onSuccess?: () => void;         // Callback al agregar exitosamente
  onError?: (error: string) => void; // Callback si hay error
  variant?: "default" | "outline" | "ghost" | "small"; // Estilo (default: "default")
  size?: "sm" | "md" | "lg";      // Tamaño (default: "md")
  className?: string;             // Clases Tailwind adicionales
  showQuantitySelector?: boolean;  // Mostrar selector de cantidad (default: false)
  initialQuantity?: number;       // Cantidad inicial (default: 1)
}
```

## 💡 Ejemplos de Uso

### 1️⃣ Botón Simple (Recomendado para Cards)

```tsx
import { AddToCartButton } from "@/components/Cart/AddToCartButton";

export function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      
      <AddToCartButton
        productId={product.id}
        productName={product.name}
        maxStock={product.stock}
        onSuccess={() => {
          console.log("✅ Producto agregado");
          // Mostrar toast de éxito
        }}
        onError={(error) => {
          console.error("❌", error);
          // Mostrar toast de error
        }}
      />
    </div>
  );
}
```

### 2️⃣ Con Selector de Cantidad (Página de Detalles)

```tsx
import { AddToCartButton } from "@/components/Cart/AddToCartButton";

export function ProductDetailPage({ product }) {
  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      
      <AddToCartButton
        productId={product.id}
        productName={product.name}
        maxStock={product.stock}
        showQuantitySelector={true}
        initialQuantity={1}
        variant="default"
        size="lg"
        onSuccess={() => {
          // Redirigir a carrito
        }}
      />
    </div>
  );
}
```

### 3️⃣ Variante Outline (Para Secondary Actions)

```tsx
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock}
  variant="outline"
  size="sm"
/>
```

### 4️⃣ Con Clases Tailwind Personalizadas

```tsx
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock}
  className="w-full"
  size="md"
/>
```

## 🔄 Estados del Componente

### Estado Normal
- Botón interactivo con ícono de carrito
- Texto "Añadir al carrito" o "Añadir x{cantidad}"

### Estado Cargando
- Spinner animado
- Texto "Agregando..."
- Botón desactivo

### Stock Agotado
- Ícono de advertencia
- Texto "Agotado"
- Botón completamente desactivo

### Selector de Cantidad Visible
- Mostrar contador con +/- botones
- Validar cantidad contra stock máximo
- Actualizar cantidad en tiempo real

## 📊 Cómo Migramos BSWCard

### ANTES (Lógica duplicada en AddToCartSection)
```tsx
const AddToCartSection = ({ onAddToCart, inStock }) => (
  <div className="flex gap-4">
    {/* Selector manual de cantidad */}
    <div className="flex gap-2">
      <button>-</button>
      <span>1</span>
      <button>+</button>
    </div>
    
    {/* Botón custom */}
    <Button
      onClick={() => onAddToCart(1)}
      disabled={inStock <= 0}
    >
      {inStock > 0 ? "Añadir al Carrito" : "Sin Stock"}
    </Button>
  </div>
);
```

### DESPUÉS (Componente reutilizable)
```tsx
import { AddToCartButton } from "@/components/Cart/AddToCartButton";

// En BSWCard:
<AddToCartButton
  productId={item.id}
  productName={item.name}
  maxStock={item.stock ?? 0}
  variant="default"
  size="md"
  onSuccess={() => {
    // Opcional: Toast de éxito
    console.log("✅ Agregado a carrito");
  }}
/>
```

## 🎯 Integración en Componentes Existentes

### ProductCard.tsx
```tsx
// ANTES:
<button className="flex-1 flex items-center justify-center...">
  <FiShoppingCart className="w-4 h-4" />
  <span>Comprar</span>
</button>

// DESPUÉS:
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock ?? 0}
  variant="default"
  size="sm"
/>
```

### DealCard.tsx (Ofertas diarias)
```tsx
// En el componente:
<AddToCartButton
  productId={offer.id}
  productName={offer.name}
  maxStock={offer.stock}
  size="sm"
  variant="outline"
/>
```

### TrendingProductCard.tsx
```tsx
// Reemplazar el botón inline por:
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock ?? 0}
/>
```

### SearchProductCard.tsx
```tsx
// Reemplazar "Ver detalles" link por:
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock}
  size="sm"
/>
```

## 🔌 Hook useCart Integrado

El componente usa automáticamente el hook `useCart`:

```typescript
// Internamente en AddToCartButton:
const { addToCart, loading } = useCart();

// El hook maneja:
// ✅ Llamadas a la API de carrito
// ✅ Estados de carga
// ✅ Sincronización con localStorage
// ✅ Validaciones de autenticación
```

## 🎨 Personalización de Estilos

### Cambiar colores del botón default
Editar en `AddToCartButton.tsx` la función `getButtonClasses()`:

```typescript
variantClasses: {
  default: "bg-blue-600 text-white hover:bg-blue-700 active:scale-95",
  // Cambiar azul por tu color:
  // default: "bg-cyan-600 text-white hover:bg-cyan-700 active:scale-95",
}
```

### Cambiar tamaños
```typescript
sizeClasses: {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-6 py-3 text-lg w-full",
  // Agregar nuevo tamaño:
  // xl: "px-8 py-4 text-lg w-full",
}
```

## 🚨 Error Handling

El componente maneja estos errores automáticamente:

```typescript
try {
  await addToCart(productId, quantity);
  // ✅ Éxito - Llama onSuccess()
} catch (error) {
  // ❌ Error - Llama onError(errorMessage)
  // Posibles errores:
  // - "Usuario no autenticado"
  // - "Producto sin stock"
  // - "Cantidad inválida"
  // - "Error al agregar al carrito"
}
```

## 📱 Responsive Design

El componente es totalmente responsivo:

- **Mobile** (< 640px): Botón toma 100% de ancho en lg variant
- **Tablet** (640px - 1024px): Adapta padding y texto
- **Desktop** (> 1024px): Tamaño completo

## ⚙️ Configuración Avanzada

### Selector de cantidad con límite
```tsx
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock}
  showQuantitySelector={true}
  initialQuantity={Math.min(5, product.stock)} // Máx 5 sugerido
/>
```

### Callback en cascada
```tsx
<AddToCartButton
  productId={product.id}
  productName={product.name}
  maxStock={product.stock}
  onSuccess={() => {
    // 1. Toast de éxito
    showToast("✅ Agregado al carrito");
    
    // 2. Analítica
    trackEvent("product_added", { productId: product.id });
    
    // 3. Redirección
    setTimeout(() => {
      router.push("/cart");
    }, 1500);
  }}
  onError={(error) => {
    // 1. Toast de error
    showToast(`❌ ${error}`);
    
    // 2. Log de error
    console.error(error);
    
    // 3. Redirigir a login si no autenticado
    if (error.includes("autenticado")) {
      router.push("/login");
    }
  }}
/>
```

## ✅ Checklist de Migración

Cuando migres componentes para usar `AddToCartButton`:

- [ ] Importar componente: `import { AddToCartButton } from "@/components/Cart/AddToCartButton"`
- [ ] Remover lógica custom de cart en el componente
- [ ] Pasar props requeridas: `productId`, `productName`, `maxStock`
- [ ] Configurar callbacks `onSuccess` y `onError` (opcional pero recomendado)
- [ ] Elegir variante y tamaño según contexto
- [ ] Remover imports innecesarios (CartIcon, Button, etc si antes los usaba)
- [ ] Remover manejo manual de estado de loading
- [ ] Probar en mobile, tablet y desktop
- [ ] Verificar que el carrito se actualiza correctamente

## 🧪 Ejemplo Completo de Integración

```tsx
"use client";

import { ProductForDetail } from "@/types/productss";
import { AddToCartButton } from "@/components/Cart/AddToCartButton";
import { useState } from "react";

export function ProductDetailPage({ product }: { product: ProductForDetail }) {
  const [showMessage, setShowMessage] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-6">{product.description}</p>

      {/* Contenedor principal */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Imagen */}
        <div className="bg-gray-100 rounded-lg p-4">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Información y CTA */}
        <div className="space-y-6">
          {/* Precio */}
          <div>
            <p className="text-gray-600 text-sm">Precio</p>
            <p className="text-3xl font-bold text-gray-900">
              {product.currency} {product.priceInt}
            </p>
          </div>

          {/* Stock */}
          <div>
            <p className="text-gray-600 text-sm">Disponibilidad</p>
            <p className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
              {product.stock > 0 ? `${product.stock} unidades en stock` : "Sin stock"}
            </p>
          </div>

          {/* Mensaje temporal */}
          {showMessage && (
            <div className="p-4 bg-blue-50 text-blue-700 rounded-lg">
              {showMessage}
            </div>
          )}

          {/* AddToCartButton */}
          <AddToCartButton
            productId={product.id}
            productName={product.name}
            maxStock={product.stock ?? 0}
            showQuantitySelector={true}
            initialQuantity={1}
            variant="default"
            size="lg"
            onSuccess={() => {
              setShowMessage("✅ Producto agregado al carrito exitosamente");
              setTimeout(() => setShowMessage(""), 3000);
            }}
            onError={(error) => {
              setShowMessage(`❌ Error: ${error}`);
            }}
          />

          {/* Beneficios */}
          <div className="space-y-2 pt-4 border-t">
            <p className="text-sm">✅ Envío gratis en compras mayores a $50</p>
            <p className="text-sm">✅ Garantía de 30 días</p>
            <p className="text-sm">✅ Soporte 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 📞 Soporte y Debugging

Si tienes problemas:

1. **Verificar que CartService.isAuthenticated() funciona** - Abre DevTools > Network y verifica que se envía token
2. **Ver estado del carrito** - `useCart()` hook muestra `loading` y `error`
3. **Validar stock** - El componente desactiva el botón si `maxStock <= 0`
4. **Revisar console** - Hay logs con emojis para cada operación

## 🎉 Próximos Pasos

1. ✅ Integrar en ProductCard.tsx
2. ✅ Integrar en DealCard.tsx
3. ✅ Integrar en TrendingProductCard.tsx
4. ✅ Crear página de carrito con edición
5. ✅ Agregar checkout flow
6. ✅ Implementar wishlists

---

**Creado:** 2024  
**Última actualización:** 2024  
**Estado:** ✅ Producción
