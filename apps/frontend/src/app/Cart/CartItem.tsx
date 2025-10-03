"use client";
import React, { useState } from "react";
import { CartResponse } from "@/types/cart";

interface CartItemProps {
  item: CartResponse["items"][number];
  onUpdateQuantity: (productId: number, quantity: number) => Promise<CartResponse>;
  onRemove: (productId: number) => Promise<CartResponse>;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const { product, quantity } = item;
  const safePrice = Number(product?.price) || 0;
  const itemTotal = safePrice * quantity;

  // Cambiar cantidad
  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > (product?.stock ?? Infinity) || isUpdating) return;

    setIsUpdating(true);
    try {
      await onUpdateQuantity(product.id, newQuantity);
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Eliminar producto
  const handleRemove = async () => {
    if (isRemoving) return;
    if (!confirm("¿Estás seguro de que quieres eliminar este producto del carrito?")) return;

    setIsRemoving(true);
    try {
      await onRemove(product.id);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  const canIncrease =
    product?.inStock && (product?.stock === undefined || quantity < product.stock);

  return (
    <div className="py-4 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-gray-200">
      {/* Imagen */}
      <ProductImage imageUrl={product?.imageUrl} name={product?.name} />

      {/* Información */}
      <ProductInfo product={product} quantity={quantity} />

      {/* Precio Unitario */}
      <UnitPrice price={safePrice} />

      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        isUpdating={isUpdating}
        canIncrease={!!canIncrease}
        onDecrease={() => handleQuantityChange(quantity - 1)}
        onIncrease={() => handleQuantityChange(quantity + 1)}
      />

      {/* Total + Eliminar */}
      <ItemActions total={itemTotal} isRemoving={isRemoving} onRemove={handleRemove} />
    </div>
  );
}

// --- Subcomponents ---
const ProductImage = ({ imageUrl, name }: { imageUrl?: string; name?: string }) => (
  <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
    <img
      src={imageUrl || "/placeholder-product.jpg"}
      alt={name || "Producto"}
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
);

const ProductInfo = ({
  product,
  quantity,
}: {
  product: CartResponse["items"][number]["product"];
  quantity: number;
}) => (
  <div className="flex-1 min-w-0">
    <h3 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2">
      {product?.name || "Producto sin nombre"}
    </h3>

    {/* Badges */}
    <div className="mt-1 space-y-1">
      {!product?.inStock && <StockBadge type="outOfStock" />}
      {product?.inStock && product.stock !== undefined && product.stock < 5 && (
        <StockBadge type="lowStock" stock={product.stock} />
      )}
      {product?.inStock && product.stock !== undefined && product.stock >= 10 && (
        <StockBadge type="inStock" />
      )}
    </div>

    {/* Precio unitario en móvil */}
    <div className="sm:hidden mt-2">
      <span className="text-sm text-gray-600">
        ${(Number(product?.price) || 0).toFixed(2)} c/u
      </span>
    </div>
  </div>
);

const StockBadge = ({
  type,
  stock,
}: {
  type: "outOfStock" | "lowStock" | "inStock";
  stock?: number;
}) => {
  const config = {
    outOfStock: { text: "Agotado", color: "text-red-600 bg-red-50" },
    lowStock: { text: `Solo ${stock} disponibles`, color: "text-orange-600 bg-orange-50" },
    inStock: { text: "En stock", color: "text-green-600 bg-green-50" },
  }[type];

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${config.color}`}
    >
      {config.text}
    </span>
  );
};

const UnitPrice = ({ price }: { price: number }) => (
  <div className="hidden sm:block w-20 text-center">
    <span className="text-gray-700 font-medium text-sm">${price.toFixed(2)}</span>
  </div>
);

const QuantitySelector = ({
  quantity,
  isUpdating,
  canIncrease,
  onDecrease,
  onIncrease,
}: {
  quantity: number;
  isUpdating: boolean;
  canIncrease: boolean;
  onDecrease: () => void;
  onIncrease: () => void;
}) => (
  <div className="flex items-center justify-center sm:justify-start">
    <div className="flex items-center border border-gray-300 rounded-lg bg-white">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1 || isUpdating}
        className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isUpdating ? <Spinner size="sm" /> : "−"}
      </button>

      <span className="px-3 py-2 text-sm font-medium min-w-8 text-center">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        disabled={!canIncrease || isUpdating}
        className="px-3 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isUpdating ? <Spinner size="sm" /> : "+"}
      </button>
    </div>
  </div>
);

const ItemActions = ({
  total,
  isRemoving,
  onRemove,
}: {
  total: number;
  isRemoving: boolean;
  onRemove: () => void;
}) => (
  <div className="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-auto">
    <div className="text-right">
      <span className="font-semibold text-gray-900 text-sm sm:text-base">
        ${total.toFixed(2)}
      </span>
    </div>

    <button
      onClick={onRemove}
      disabled={isRemoving}
      className="text-red-500 hover:text-red-700 p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      aria-label="Eliminar producto"
    >
      {isRemoving ? <Spinner size="sm" /> : <TrashIcon />}
    </button>
  </div>
);

const TrashIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const Spinner = ({ size = "default" }: { size?: "sm" | "default" }) => (
  <div
    className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${
      size === "sm" ? "w-4 h-4" : "w-6 h-6"
    }`}
  />
);
