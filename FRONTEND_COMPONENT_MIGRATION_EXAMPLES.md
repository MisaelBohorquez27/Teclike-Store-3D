# 🎨 Ejemplos de Integración del AddToCartButton

## Componentes a Migrar

### 1. ProductCard.tsx (Catálogo de productos)

**ANTES:**
```tsx
export function ProductCard({ product }: { product: ProductForDetail }) {
  return (
    <Link href={`/Products/${product.slug}`} className="block">
      {/* ... contenido ... */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-sm rounded-lg transition-colors cursor-pointer">
          <FiEye className="w-4 h-4" />
          <span className="truncate">Detalles</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm rounded-lg transition-all cursor-pointer">
          <FiShoppingCart className="w-4 h-4" />
          <span>Comprar</span>
        </button>
      </div>
    </Link>
  );
}
```

**DESPUÉS:**
```tsx
"use client";

import { ProductForDetail } from "@/types/productss";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiEye, FiStar } from "react-icons/fi";
import { Rating } from "@/components/Rating";
import { AddToCartButton } from "@/components/Cart/AddToCartButton";
import Image from "next/image";

export function ProductCard({ product }: { product: ProductForDetail }) {
  return (
    <Link href={`/Products/${product.slug}`} className="block">
      <motion.div
        whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
        className="group relative h-full"
      >
        {/* Card principal */}
        <div className="bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col overflow-hidden group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
          {/* Imagen del Producto */}
          <div className="relative aspect-square mb-4 rounded-xl overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-full h-full group-hover:scale-110 transition-transform duration-500"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-scale-down"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </motion.div>

            {/* Overlay de imagen */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Botones flotante - AHORA CON AddToCartButton */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-sm rounded-lg transition-colors cursor-pointer">
                <FiEye className="w-4 h-4" />
                <span className="truncate">Detalles</span>
              </button>
              
              {/* ✅ Reemplaza el botón "Comprar" manual */}
              <div className="flex-1">
                <AddToCartButton
                  productId={product.id}
                  productName={product.name}
                  maxStock={product.stock ?? 0}
                  variant="default"
                  size="sm"
                  className="!px-0 w-full"
                />
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-grow space-y-3">
            {/* Categoría */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium">
                {product.category}
              </span>
            </div>

            {/* Nombre y Rating */}
            <div>
              <h3 className="font-bold text-lg text-gray-100 mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors truncate">
                {product.name}
              </h3>
            </div>

            {/* Descripción */}
            <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Precio y Rating */}
          <div className="mt-auto pt-4 border-t border-gray-800/50">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-100">
                  {product.price}
                </span>
              </div>
              <Rating
                value={product.rating}
                count={product.reviewCount}
                interactive={false}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
```

---

### 2. DealCard.tsx (Ofertas diarias)

**CAMBIO CLAVE:** En la sección de botones, reemplazar el botón manual por AddToCartButton

```tsx
// ANTES (línea ~250):
<button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer">
  <FiShoppingCart className="inline-block mr-2 w-4 h-4" />
  Agregar al Carrito
</button>

// DESPUÉS:
<AddToCartButton
  productId={offer.id}
  productName={offer.name}
  maxStock={offer.stock ?? 0}
  size="md"
  className="w-full"
  onSuccess={() => {
    // Opcional: Analytics
    console.log("✅ Oferta agregada al carrito");
  }}
/>
```

---

### 3. TrendingProductsCard.tsx (Productos en tendencia)

**ANTES (línea ~89):**
```tsx
<button className="px-4 py-2 text-gray-100 text-sm font-medium rounded-lg transition-all group-hover:scale-105">
  <FiShoppingBag className="w-4 h-4" />
</button>
```

**DESPUÉS:**
```tsx
"use client";

import { AddToCartButton } from "@/components/Cart/AddToCartButton";
import { motion } from "framer-motion";
import { ProductForCard } from "@/types/productss";
import { FiEye, FiStar } from "react-icons/fi";

interface TrendingProductCardProps {
  product: ProductForCard;
}

export const TrendingProductCard = ({ product }: TrendingProductCardProps) => {
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300 },
      }}
      className="group relative h-full"
    >
      {/* Card principal */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col overflow-hidden group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
        {/* Imagen con efecto */}
        <div className="relative aspect-square mb-4 rounded-xl overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Botones flotantes */}
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-xs rounded-lg transition-colors">
              <FiEye className="w-4 h-4" />
              <span>Ver</span>
            </button>
            
            {/* ✅ AddToCartButton */}
            <div className="flex-1">
              <AddToCartButton
                productId={product.id}
                productName={product.name}
                maxStock={product.inStock ? 1 : 0}
                size="sm"
                className="!px-0 w-full"
              />
            </div>
          </div>

          {/* Badge de descuento */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-red-600/90 text-white text-xs font-bold">
              -{((((parseFloat(product.price) - parseFloat(product.discountPrice ?? "0")) / parseFloat(product.price)) * 100) | 0)}%
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="space-y-3 flex-grow">
          <div>
            <span className="inline-block px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium">
              {product.category}
            </span>
          </div>

          <h3 className="font-bold text-gray-100 text-sm line-clamp-2 group-hover:text-cyan-300 transition-colors">
            {product.name}
          </h3>

          {/* Precios */}
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-gray-100">
              {product.discountPrice || product.price}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                {product.price}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-3 h-3 ${
                  i < product.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-600"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
```

---

### 4. SearchProductCard.tsx (Resultados de búsqueda)

**ANTES:**
```tsx
<div className="mt-3 sm:mt-4 flex justify-between items-center">
  <span className="font-bold text-gray-900 text-sm sm:text-base">
    {product.price}
  </span>
  
  <Link 
    href={`/Products/${product.id}`}
    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors"
  >
    Ver detalles
  </Link>
</div>
```

**DESPUÉS:**
```tsx
"use client";

import { SearchResult } from "@/types/search";
import Link from "next/dist/client/link";
import { AddToCartButton } from "@/components/Cart/AddToCartButton";

export function SearchProductCard({ product }: { product: SearchResult }) {
  return (
    <div className="Card-bg rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Imagen del Producto */}
      <div className="relative aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Detalles del Producto */}
      <div className="p-3 sm:p-4 flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2 h-auto min-h-5">
          <h3 className="font-semibold text-base sm:text-lg truncate pr-1 sm:pr-2">
            {product.name}
          </h3>
          <span className="text-xs sm:text-sm text-gray-500">
            {product.category}
          </span>
        </div>

        {/* Rating */}
        <div className="mt-1 sm:mt-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-xs sm:text-sm ${
                i < product.rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>

        {/* Precio y Botones */}
        <div className="mt-3 sm:mt-4 flex justify-between items-center gap-2">
          <span className="font-bold text-gray-900 text-sm sm:text-base">
            {product.price}
          </span>

          <div className="flex gap-2 flex-1">
            {/* Ver detalles */}
            <Link 
              href={`/Products/${product.id}`}
              className="flex-1 text-center px-2 py-1 text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium transition-colors rounded border border-blue-600"
            >
              Detalles
            </Link>

            {/* ✅ Agregar al carrito */}
            <div className="flex-1">
              <AddToCartButton
                productId={product.id}
                productName={product.name}
                maxStock={product.stock ?? 0}
                size="sm"
                variant="default"
                className="!px-0 !py-1 w-full text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### 5. OfferCard.tsx (Componente de ofertas en Home)

**UBICACIÓN:** `apps/frontend/src/app/Home/Components/DailyOffers/Components/OfferCard.tsx`

**CAMBIO SIMPLE:**
```tsx
// En la sección de botones, agregar:

<div className="mt-4">
  <AddToCartButton
    productId={product.id}
    productName={product.name}
    maxStock={product.stock ?? 0}
    size="md"
    className="w-full"
  />
</div>
```

---

## 📋 Checklist de Migración Global

### Phase 1: Preparación ✅
- [x] Crear componente AddToCartButton
- [x] Crear hook useCart mejorado
- [x] Documentar integración

### Phase 2: Migración ComponentCard (HOY)
- [ ] ProductCard.tsx
- [ ] DealCard.tsx
- [ ] TrendingProductsCard.tsx
- [ ] SearchProductCard.tsx
- [ ] OfferCard.tsx

### Phase 3: Testing
- [ ] Probar en mobile (< 640px)
- [ ] Probar en tablet (640px - 1024px)
- [ ] Probar en desktop (> 1024px)
- [ ] Verificar carga/error states
- [ ] Verificar sincronización del carrito

### Phase 4: Production
- [ ] Remover archivos old (AddToCartSection, etc)
- [ ] Optimizar bundle size
- [ ] Monitorear errores en Sentry
- [ ] Recopilar feedback de usuarios

---

## 🧪 Testing Script

Después de cada migración, ejecuta este script para verificar:

```typescript
// En la consola del navegador (DevTools)
const testCart = async () => {
  // 1. Verificar cartService existe
  console.log("1. CartService:", typeof window.CartService);
  
  // 2. Verificar hook useCart existe
  console.log("2. useCart hook available");
  
  // 3. Simular agregar producto
  console.log("3. Intentando agregar producto...");
  
  // 4. Verificar localStorage
  console.log("4. localStorage.getItem('localCart'):", localStorage.getItem('localCart'));
  
  // 5. Verificar token
  console.log("5. Token:", localStorage.getItem('accessToken')?.slice(0, 20) + "...");
};

testCart();
```

---

## 🚀 Próximos Pasos Después de Migración

1. **Crear página de carrito** con edición inline
2. **Agregar Toast notifications** para feedback visual
3. **Implementar checkout flow**
4. **Agregar wishlist** (carrito de deseos)
5. **Optimizar imágenes** con Next.js Image

---

**Estado:** 📝 En Preparación  
**Responsable:** Frontend Team  
**Deadline:** 2024
