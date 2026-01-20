"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { CheckoutSummaryCard } from "@/components/checkout/checkoutsummarycard";

export default function CheckoutPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const authenticated = AuthService.isAuthenticated();
      
      if (!authenticated) {
        // Redirigir al login con el redirect parameter
        router.push("/login?redirect=/checkout");
      } else {
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // La redirección ya está en progreso
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
          <p className="text-gray-600 mt-2">
            Revisa el resumen de tu pedido antes de continuar
          </p>
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sección de formulario (izquierda) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Información de Envío</h2>
              
              {/* Placeholder para el formulario */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="shipping-address"
                    name="address"
                    placeholder="Ingresa tu dirección"
                    autoComplete="street-address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="shipping-city"
                      name="city"
                      autoComplete="address-level2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado
                    </label>
                    <input
                      type="text"
                      id="shipping-state"
                      name="state"
                      placeholder="Estado"
                      autoComplete="address-level1
                      placeholder="Estado"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      id="shipping-postal"
                      autoComplete="postal-code"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      País
                    </label>
                    <input
                      type="text"
                      id="shipping-country"
                      name="country"
                      placeholder="País"
                      autoComplete="country-nametry"
                      name="country"
                      placeholder="País"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Método de pago */}
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Método de Pago</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="credit_card"
                      defaultChecked
                      className="mr-3"
                    />
                    <span className="font-medium">Tarjeta de Crédito</span>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      className="mr-3"
                    />
                    <span className="font-medium">PayPal</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen del pedido (derecha) */}
          <div className="lg:col-span-1">
            <CheckoutSummaryCard
              onProceedToPay={() => {
                console.log("Proceder a pago");
              }}
              isLoading={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
