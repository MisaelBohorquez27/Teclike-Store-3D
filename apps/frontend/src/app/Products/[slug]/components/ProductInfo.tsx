import Button from "@/components/PagesButtons";
import { ProductForDetail } from "@/types/productss";
import { useState } from "react";
import { FaClipboardCheck, FaLock, FaShieldAlt } from "react-icons/fa";

export function ProductInfo({ product }: { product: ProductForDetail }) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Datos por defecto para campos opcionales
  const sku = product.sku || `PROD-${product.id.toString().padStart(6, '0')}`;
  const categories = product.category ? [product.category] : [];
  const tag = product.tag || product.name;

  return (
    <div className="pb-7 flex flex-col gap-6">
      {/* Marca y Nombre */}
      <div>
        <span className="text-lg font-semibold text-gray-600">
          {product.brand}
        </span>
        <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
      </div>

      {/* Rating */}
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
          >
            ★
          </span>
        ))}
        <span className="text-gray-500 ml-2">({product.rating.toFixed(1)})</span>
      </div>

      {/* Precio */}
      <p className="text-2xl font-semibold text-gray-900">
        {product.currency} {product.price}
      </p>

      {/* Disponibilidad */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        <span className="text-green-600 font-medium">Disponible</span>
      </div>

      {/* Descripción */}
      {product.description && (
        <div className="text-gray-700">
          <p>{product.description}</p>
        </div>
      )}

      {/* Acciones */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <div className="flex items-center border rounded-md overflow-hidden">
          <button
            className="px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
            onClick={decrementQuantity}
            aria-label="Reducir cantidad"
          >
            -
          </button>
          <span className="px-4 py-2 min-w-[40px] text-center">{quantity}</span>
          <button
            className="px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
            onClick={incrementQuantity}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
        <Button variant="primary" size="m" className="flex-1">
          AÑADIR AL CARRITO
        </Button>
      </div>

      <Button variant="secondary" size="m" className="w-full">
        COMPRAR AHORA
      </Button>

      {/* Metadatos del producto */}
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <span className="text-gray-600 font-medium">SKU:</span>
          <span>{sku}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-600 font-medium">Categorías:</span>
          <span>{categories.join(", ")}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-600 font-medium">Etiqueta:</span>
          <span>{tag}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-600 font-medium">Marca:</span>
          <span>{product.brand}</span>
        </div>
        {product.isNew && (
          <div className="flex gap-2">
            <span className="text-gray-600 font-medium">Estado:</span>
            <span className="text-green-600">Nuevo</span>
          </div>
        )}
      </div>

      {/* Sección de Pagos */}
      <div className="mt-2">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Métodos de pago:</h3>
        <div className="flex flex-wrap gap-3 mb-4">
          {/* Klarna */}
          <div className="flex items-center justify-center w-16 h-10 bg-white border rounded-md">
            <span className="text-xs font-bold">Klarna</span>
          </div>

          {/* PayPal */}
          <div className="flex items-center justify-center w-16 h-10 bg-white border rounded-md">
            <span className="text-xs font-bold">PayPal</span>
          </div>

          {/* Venmo */}
          <div className="flex items-center justify-center w-16 h-10 bg-white border rounded-md">
            <span className="text-xs font-bold">venmo</span>
          </div>

          {/* Pay */}
          <div className="flex items-center justify-center w-16 h-10 bg-white border rounded-md">
            <span className="text-xs font-bold">Pay</span>
          </div>

          {/* VISA */}
          <div className="flex items-center justify-center w-16 h-10 bg-white border rounded-md">
            <span className="text-xs font-bold">VISA</span>
          </div>

          {/* Discover */}
          <div className="flex items-center justify-center w-16 h-10 bg-white border rounded-md">
            <span className="text-xs font-bold">DISC...VER</span>
          </div>
        </div>

        {/* Sección de Seguridad y Garantía */}
        <div className="pt-4 border-t">
          <div className="flex flex-col items-start gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <FaShieldAlt className="h-4 w-4 text-green-500" />
              <span>Pagos seguros</span>
            </div>
            <div className="flex items-center gap-1">
              <FaLock className="h-4 w-4 text-green-500" />
              <span>Privacidad segura</span>
            </div>
            <div className="flex items-center gap-1">
              <FaClipboardCheck className="h-4 w-4 text-green-500" />
              <span>Garantía de pedidos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}