"use client";

import Image from "next/image";
import { AddToCartButton } from "@/components/cart/addtocartbutton";
import { ProductForDetail } from "@/types/productss";
import { motion } from "framer-motion";
import { FiStar, FiTruck, FiShield, FiClock, FiTrendingUp } from "react-icons/fi";
import { useState } from "react";

interface ProductsProps {
  item: ProductForDetail;
  onAddToCart?: (id: number, quantity: number) => void;
}

/**
 * BestSellersWeekCard - Tarjeta de producto MEJORADA
 * 
 * Cambios:
 * - Usa AddToCartButton reutilizable en lugar de lógica custom
 * - Selector de cantidad integrado en el botón
 * - Mejor manejo de estado de carga y errores
 * - Más limpio y mantenible
 */
export function BestSellersWeekCard({ item }: ProductsProps) {
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddSuccess = () => {
    // Mostrar feedback visual
    setSuccessMessage("✅ Agregado al carrito");
    setTimeout(() => setSuccessMessage(""), 3000);

    // ⚠️ NO llamar onAddToCart aquí - AddToCartButton ya lo hizo
    // onAddToCart?.(item.id, 1); <- ESTO CAUSA LA DUPLICACIÓN
  };

  const handleAddError = (error: string) => {
    setSuccessMessage(`❌ ${error}`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-md border border-gray-800/50 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row gap-6 md:gap-8 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-50"
    >
      {/* Badge de TOP VENDEDOR */}
      <div className="absolute top-4 left-4 z-20">
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-linear-to-r from-cyan-500 to-cyan-500 text-gray-200 text-sm font-bold shadow-lg">
          <FiTrendingUp className="w-3 h-3" />
          <span>TOP</span>
        </div>
      </div>

      {/* Mensaje de feedback */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-16 left-4 px-4 py-2 rounded-lg bg-black/90 text-white text-sm z-30"
        >
          {successMessage}
        </motion.div>
      )}

      {/* Columna izquierda - Imagen */}
      <ImageColumn image={item.imageUrl} name={item.name} />

      {/* Separador decorativo */}
      <div className="hidden lg:block">
        <div className="w-px h-full bg-linear-to-b from-transparent via-gray-700/50 to-transparent" />
      </div>

      {/* Columna derecha - Contenido */}
      <ContentColumn 
        item={item} 
        onAddSuccess={handleAddSuccess}
        onAddError={handleAddError}
      />
    </motion.div>
  );
}

// ============ SUBCOMPONENTS ============

const ImageColumn = ({ image, name }: { image: string; name: string }) => (
  <div className="lg:w-2/5 relative">
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl h-64 md:h-80"
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-scale-down"
        priority={false}
      />

      {/* Overlay de hover */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Badge de disponibilidad */}
      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium">
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Disponible
        </span>
      </div>
    </motion.div>
  </div>
);

const ContentColumn = ({
  item,
  onAddSuccess,
  onAddError,
}: {
  item: ProductForDetail;
  onAddSuccess: () => void;
  onAddError: (error: string) => void;
}) => (
  <div className="lg:w-3/5 flex flex-col gap-6 justify-center">
    <ProductInfo name={item.name} description={item.description ?? ""} />
    <ProductPrice price={item.priceInt ?? 0} currency={item.currency ?? ""} />
    <ProductBenefits />
    <StockIndicator stock={item.stock ?? 0} />
    
    {/* ✅ NUEVO: AddToCartButton en lugar de AddToCartSection */}
    <div className="mt-4">
      <AddToCartButton
        productId={item.id}
        productName={item.name}
        maxStock={item.stock ?? 0}
        productPrice={item.priceInt}
        productImage={item.imageUrl}
        showQuantitySelector={true}
        initialQuantity={1}
        variant="default"
        size="lg"
        onSuccess={onAddSuccess}
        onError={onAddError}
      />
    </div>
  </div>
);

const ProductInfo = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <div>
    <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 line-clamp-2">
      {name}
    </h3>
    <p className="text-gray-300 leading-relaxed line-clamp-3">
      {description}
    </p>
  </div>
);

const ProductPrice = ({
  price,
  currency,
}: {
  price: number;
  currency: string;
}) => (
  <div className="flex items-baseline gap-4">
    <div>
      <div className="text-sm text-gray-400 mb-1">Precio especial</div>
      <div className="text-3xl md:text-4xl font-bold text-gray-100">
        {currency} {price.toFixed(2)}
      </div>
    </div>
  </div>
);

const ProductBenefits = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {[
      { icon: FiTruck, text: "Envío Gratis", color: "text-blue-400" },
      { icon: FiShield, text: "Garantía", color: "text-green-400" },
      { icon: FiClock, text: "24/7 Soporte", color: "text-purple-400" },
    ].map((benefit, index) => (
      <div
        key={index}
        className="flex items-center gap-2 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30"
      >
        <benefit.icon className={`w-4 h-4 ${benefit.color}`} />
        <span className="text-sm text-gray-300">{benefit.text}</span>
      </div>
    ))}
  </div>
);

const StockIndicator = ({ stock }: { stock: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">Disponibilidad</span>
      <span className={`font-medium ${stock > 0 ? "text-green-400" : "text-red-400"}`}>
        {stock > 0 ? `${stock} unidades` : "Agotado"}
      </span>
    </div>

    {/* Progress bar */}
    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
        style={{ width: `${Math.min((stock / 100) * 100, 100)}%` }}
      />
    </div>

    {/* Stock warning */}
    {stock > 0 && stock < 20 && (
      <div className="flex items-center gap-2 text-xs text-cyan-400">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        ¡Últimas unidades disponibles!
      </div>
    )}
  </div>
);
