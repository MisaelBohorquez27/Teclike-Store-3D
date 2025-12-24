"use client";

import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useCartContext } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/Auth/AuthModal";
import Button from "../PagesButtons";

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  maxStock: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  variant?: "default" | "outline" | "ghost" | "small";
  size?: "sm" | "md" | "lg";
  className?: string;
  showQuantitySelector?: boolean;
  initialQuantity?: number;
}

/**
 * Componente reutilizable para agregar productos al carrito
 * Se puede usar en cualquier parte de la app (cards, detalles, etc)
 * 
 * Si el usuario no está registrado, muestra un modal de login
 *
 * @example
 * ```tsx
 * <AddToCartButton
 *   productId={1}
 *   productName="Laptop"
 *   maxStock={10}
 *   onSuccess={() => toast.success("Agregado!")}
 * />
 * ```
 */
export function AddToCartButton({
  productId,
  productName,
  maxStock,
  onSuccess,
  onError,
  variant = "default",
  size = "md",
  className = "",
  showQuantitySelector = false,
  initialQuantity = 1,
}: AddToCartButtonProps) {
  const { addToCart, loading: cartLoading } = useCartContext();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // 🔒 Lock para prevenir ejecuciones concurrentes
  const isExecutingRef = useRef(false);

  // Validar que hay stock
  if (maxStock <= 0) {
    return (
      <Button
        disabled
        className={getButtonClasses(variant, size, true, className)}
        title="Producto agotado"
      >
        <span className="flex items-center justify-center gap-2">
          <StockIcon />
          Agotado
        </span>
      </Button>
    );
  }

  const handleAddToCart = async () => {
    // 🔒 LOCK: Prevenir ejecuciones concurrentes con useRef (más rápido que setState)
    if (isExecutingRef.current || isLoading || cartLoading) {
      console.log('⚠️ Operación bloqueada - ya hay una en progreso');
      return;
    }

    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    if (quantity < 1 || quantity > maxStock) {
      const error = `Cantidad inválida. Máximo: ${maxStock}`;
      onError?.(error);
      return;
    }

    // 🔒 Activar lock INMEDIATAMENTE (sincrónico)
    isExecutingRef.current = true;
    setIsLoading(true);

    try {
      console.log(`🔍 DEBUG: Enviando addToCart(productId=${productId}, quantity=${quantity})`);
      await addToCart(productId, quantity);

      console.log(`✅ ${productName} agregado al carrito - Cantidad solicitada: ${quantity}`);
      onSuccess?.();

      // Resetear cantidad después de agregar
      setQuantity(initialQuantity);
    } catch (error: any) {
      const errorMessage = error.message || "Error al agregar al carrito";
      console.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
      // 🔒 Liberar lock
      isExecutingRef.current = false;
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(1, Math.min(newQuantity, maxStock));
    setQuantity(validQuantity);
  };

  return (
    <div className={`flex flex-row gap-3 ${className}`}>
      {showQuantitySelector && (
        <QuantitySelector
          quantity={quantity}
          maxStock={maxStock}
          onChange={handleQuantityChange}
          disabled={isLoading || cartLoading}
        />
      )}

      <Button
        onClick={handleAddToCart}
        disabled={isLoading || cartLoading}
        className={getButtonClasses(
          variant,
          size,
          isLoading || cartLoading,
          ""
        )}
        style={{
          pointerEvents: isLoading || cartLoading ? 'none' : 'auto'
        }}
        title={`Agregar ${quantity}x ${productName} al carrito`}
      >
        <span className="flex items-center justify-center gap-2">
          {isLoading || cartLoading ? (
            <>
              <LoadingSpinner size={size} />
              <span className="animate-pulse">Agregando...</span>
            </>
          ) : (
            <>
              <CartIcon size={size} />
              <span>{showQuantitySelector ? `Agregar x${quantity}` : "Agregar"}</span>
            </>
          )}
        </span>
      </Button>

      {/* Modal de autenticación - Renderizado con Portal para evitar ser cortado por overflow */}
      {showAuthModal && typeof document !== "undefined" &&
        createPortal(
          <AuthModal onClose={() => setShowAuthModal(false)} />,
          document.body
        )
      }
    </div>
  );
}

// ============ SUBCOMPONENTS ============

interface QuantitySelectorProps {
  quantity: number;
  maxStock: number;
  onChange: (quantity: number) => void;
  disabled: boolean;
}

function QuantitySelector({
  quantity,
  maxStock,
  onChange,
  disabled,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 w-full sm:w-fit">
      <button
        onClick={() => onChange(quantity - 1)}
        disabled={disabled || quantity <= 1}
        className="p-1 text-gray-500 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
        title="Decrementar cantidad"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>

      <input
        type="number"
        min="1"
        max={maxStock}
        value={quantity}
        onChange={(e) => onChange(parseInt(e.target.value) || 1)}
        disabled={disabled}
        className="w-12 text-gray-500 text-center border-0 bg-transparent font-semibold disabled:opacity-50"
      />

      <button
        onClick={() => onChange(quantity + 1)}
        disabled={disabled || quantity >= maxStock}
        className="p-1 text-gray-500 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
        title="Incrementar cantidad"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <span className="text-xs text-gray-500 ml-auto">
        Max: {maxStock}
      </span>
    </div>
  );
}

// ============ ICONS & STYLES ============

function CartIcon({ size = "md" }: { size: string }) {
  const sizeClass = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";
  return (
    <svg
      className={sizeClass}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

function StockIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function LoadingSpinner({ size = "md" }: { size: string }) {
  const sizeClass = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";
  return (
    <div className="relative">
      <div
        className={`${sizeClass} animate-spin rounded-full border-3 border-transparent border-t-current border-r-current`}
        style={{ animationDuration: '0.6s' }}
      />
      {/* Pulso adicional para mejor efecto visual */}
      <div
        className={`${sizeClass} absolute inset-0 animate-ping rounded-full bg-current opacity-20`}
        style={{ animationDuration: '1s' }}
      />
    </div>
  );
}

// ============ BUTTON STYLES ============

function getButtonClasses(
  variant: string,
  size: string,
  disabled: boolean,
  className: string
): string {
  const baseClasses = "font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    default: "bg-cyan-700 text-white hover:bg-cyan-600 active:scale-95",
    outline: "border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 active:scale-95",
    ghost: "text-cyan-600 hover:bg-cyan-50 active:scale-95",
    small: "bg-cyan-600 text-white text-xs py-1 px-2 hover:bg-cyan-700",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg w-full",
  };

  return `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]} ${sizeClasses[size as keyof typeof sizeClasses]} ${className}`.trim();
}
