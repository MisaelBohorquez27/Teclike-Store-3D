"use client";
import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
        
        {/* Icono */}
        <EmptyCartIcon />
        
        {/* Texto principal */}
        <EmptyCartText />
        
        {/* Acciones */}
        <EmptyCartActions />
        
        {/* Información adicional */}
        <EmptyCartInfo />
      </div>
    </div>
  );
}

// Subcomponents
const EmptyCartIcon = () => (
  <div className="mb-6">
    <div className="w-24 h-24 mx-auto text-gray-300">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
  </div>
);

const EmptyCartText = () => (
  <div className="mb-8">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
      Tu carrito está vacío
    </h2>
    <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
      Parece que aún no has encontrado ese producto especial. 
      Explora nuestro catálogo y descubre algo increíble.
    </p>
  </div>
);

const EmptyCartActions = () => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
    <Link
      href="/Products"
      className="inline-flex items-center justify-center px-8 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
    >
      <ShoppingBagIcon />
      Explorar Productos
    </Link>
    
    <Link
      href="/DailyOffers"
      className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-cyan-600 hover:text-cyan-600 transition-all duration-200"
    >
      <TagIcon />
      Ver Ofertas
    </Link>
  </div>
);

const EmptyCartInfo = () => (
  <div className="border-t pt-6">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-500">
      <div className="flex flex-col items-center">
        <TruckIcon />
        <span className="mt-2">Envío gratis desde $0</span>
      </div>
      <div className="flex flex-col items-center">
        <ShieldCheckIcon />
        <span className="mt-2">Garantía de 30 días</span>
      </div>
      <div className="flex flex-col items-center">
        <SupportIcon />
        <span className="mt-2">Soporte 24/7</span>
      </div>
    </div>
  </div>
);

// Iconos para las acciones
const ShoppingBagIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const TagIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

// Iconos para la información
const TruckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const SupportIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);