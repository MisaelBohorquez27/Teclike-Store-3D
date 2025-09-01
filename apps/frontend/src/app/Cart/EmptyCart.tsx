import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mx-auto text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h2 className="text-xl font-semibold mt-4">Tu carrito está vacío</h2>
      <p className="text-gray-600 mt-2">
        Agrega algunos productos para comenzar a comprar
      </p>
      <Link
        href="/products"
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Continuar comprando
      </Link>
    </div>
  );
}