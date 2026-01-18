import { AddToCartButton } from "@/components/cart/addtocartbutton";
import Button from "@/components/common/pagesbuttons";
import { ProductForDetail } from "@/types/productss";
import Link from "next/dist/client/link";
import { useState } from "react";
import { FaClipboardCheck, FaLock, FaShieldAlt } from "react-icons/fa";

export function ProductInfo({ product }: { product: ProductForDetail }) {
  const [quantity, setQuantity] = useState(1);
  const [addToCartMessage, setAddToCartMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const incrementQuantity = () => {
    setQuantity((prev) => (prev < 3 ? prev + 1 : 3));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddSuccess = () => {
    setMessageType("success");
    setAddToCartMessage(`${quantity} ${quantity === 1 ? "producto" : "productos"} agregado(s) al carrito`);
    setTimeout(() => setAddToCartMessage(null), 3000);
    setQuantity(1);
  };

  const handleAddError = (error: string) => {
    setMessageType("error");
    setAddToCartMessage(error || "Error al agregar al carrito");
    setTimeout(() => setAddToCartMessage(null), 3000);
  };

  // Datos por defecto para campos opcionales
  const sku = product.sku || `PROD-${product.id.toString().padStart(6, "0")}`;
  const categories = product.category ? [product.category] : [];
  const tag = product.tag || product.name;

  return (
    <div className="pb-7 flex flex-col gap-6">
      {/* Marca y Nombre */}
      <div>
        <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
          {product.brand}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 text-white">
          {product.name}
        </h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${i < Math.floor(product.rating)
              ? "text-yellow-400"
              : "text-gray-600"
              }`}
          >
            ★
          </span>
        ))}
        <span className="text-gray-300 ml-2">
          ({product.rating.toFixed(1)})
        </span>
      </div>

      {/* Precio */}
      <div>
        <p className="text-sm text-gray-400 mb-1">Precio</p>
        <p className="text-4xl font-bold text-cyan-400">
          {product.currency} {product.price}
        </p>
      </div>

      {/* Disponibilidad */}
      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg w-fit">
        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-green-400 font-medium">
          Disponible ({product.stock} en stock)
        </span>
      </div>

      {/* Descripción */}
      {product.description && (
        <div className="text-gray-300 leading-relaxed border-l-2 border-cyan-500/50 pl-4">
          <p>{product.description}</p>
        </div>
      )}

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800/30">
          <button
            className="px-4 py-3 bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-colors"
            onClick={decrementQuantity}
            aria-label="Reducir cantidad"
          >
            −
          </button>
          <span className="px-6 py-3 min-w-15 text-center text-white font-semibold">
            {quantity}
          </span>
          <button
            className="px-4 py-3 bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 transition-colors"
            onClick={incrementQuantity}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>

        {/* Botón agregar al carrito */}
        <AddToCartButton
          productId={product.id}
          productName={product.name}
          maxStock={product.stock ?? 1}
          productPrice={product.priceInt || parseFloat(product.price as unknown as string) || 0}
          productImage={product.imageUrl}
          initialQuantity={quantity}
          variant="default"
          size="sm"
          onSuccess={handleAddSuccess}
          onError={handleAddError}
        />
        <Link href="/Products">
          <Button
            variant="secondary"
            size="m"
            className="group px-4 py-3 bg-linear-to-r from-gray-600 to-gray-600 hover:from-gray-500 hover:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-500/20 inline-flex items-center gap-3"
          >
            <span>Ver más productos</span>
          </Button>
        </Link>

      </div>

      {/* Mensaje de feedback */}
      {addToCartMessage && (
        <div
          className={`p-4 rounded-lg text-sm font-medium transition-all duration-300 ${messageType === "success"
              ? "bg-green-500/20 border border-green-500/50 text-green-400"
              : "bg-red-500/20 border border-red-500/50 text-red-400"
            }`}
        >
          {addToCartMessage}
        </div>
      )}

      {/* Metadatos del producto */}
      <div className="mt-6 pt-6 border-t border-gray-700 space-y-3 text-sm">
        <div className="flex gap-3 justify-between">
          <span className="text-gray-400 font-medium">SKU:</span>
          <span className="text-gray-200 font-mono">{sku}</span>
        </div>
        <div className="flex gap-3 justify-between">
          <span className="text-gray-400 font-medium">Categoría:</span>
          <span className="text-gray-200">{categories.join(", ")}</span>
        </div>
        <div className="flex gap-3 justify-between">
          <span className="text-gray-400 font-medium">Etiqueta:</span>
          <span className="text-gray-200">{tag}</span>
        </div>
        <div className="flex gap-3 justify-between">
          <span className="text-gray-400 font-medium">Marca:</span>
          <span className="text-gray-200">{product.brand}</span>
        </div>
        {product.isNew && (
          <div className="flex gap-3 justify-between">
            <span className="text-gray-400 font-medium">Estado:</span>
            <span className="text-green-400 font-semibold">Nuevo</span>
          </div>
        )}
      </div>

      {/* Sección de Pagos */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wide">
          Métodos de pago:
        </h3>
        <div className="flex flex-wrap gap-3 mb-6">
          {/* Klarna */}
          <div className="flex items-center justify-center w-16 h-10 bg-gray-800 border border-gray-700 rounded-md hover:border-cyan-500/50 transition-colors">
            <span className="text-xs font-bold text-gray-300">Klarna</span>
          </div>

          {/* PayPal */}
          <div className="flex items-center justify-center w-16 h-10 bg-gray-800 border border-gray-700 rounded-md hover:border-cyan-500/50 transition-colors">
            <span className="text-xs font-bold text-gray-300">PayPal</span>
          </div>

          {/* Venmo */}
          <div className="flex items-center justify-center w-16 h-10 bg-gray-800 border border-gray-700 rounded-md hover:border-cyan-500/50 transition-colors">
            <span className="text-xs font-bold text-gray-300">Venmo</span>
          </div>

          {/* Pay */}
          <div className="flex items-center justify-center w-16 h-10 bg-gray-800 border border-gray-700 rounded-md hover:border-cyan-500/50 transition-colors">
            <span className="text-xs font-bold text-gray-300">Pay</span>
          </div>

          {/* VISA */}
          <div className="flex items-center justify-center w-16 h-10 bg-gray-800 border border-gray-700 rounded-md hover:border-cyan-500/50 transition-colors">
            <span className="text-xs font-bold text-gray-300">VISA</span>
          </div>

          {/* Discover */}
          <div className="flex items-center justify-center w-16 h-10 bg-gray-800 border border-gray-700 rounded-md hover:border-cyan-500/50 transition-colors">
            <span className="text-xs font-bold text-gray-300">DISC</span>
          </div>
        </div>

        {/* Sección de Seguridad y Garantía */}
        <div className="pt-4 border-t border-gray-700 space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <FaShieldAlt className="h-5 w-5 text-green-400 shrink-0" />
            <span>Pagos seguros y encriptados</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <FaLock className="h-5 w-5 text-blue-400 shrink-0" />
            <span>Privacidad y datos protegidos</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <FaClipboardCheck className="h-5 w-5 text-cyan-400 shrink-0" />
            <span>Garantía de comprador protegido</span>
          </div>
        </div>
      </div>
    </div>
  );
}
