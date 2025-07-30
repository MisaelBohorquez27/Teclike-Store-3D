"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./ui/PagesButtons";
import Image from "next/image"; // Importa el componente Image de Next.js

export function Subscription() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de envío a API
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail("");
    }, 1500);
  };

  return (
    <section className="relative h-98 py-12 px-4 overflow-hidden">
      {/* Imagen de fondo - Versión corregida */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/ui/escritorio.png" // Asegúrate de que la imagen esté en la carpeta public/ui/
          alt="Fondo decorativo"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="opacity-30"
        />
      </div>
      
      <div className="relative z-10 flex justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Suscríbete para novedades
          </motion.h2>

          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
            >
              <p>¡Gracias por suscribirte!</p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="flex-grow px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Button
                type="submit"
                variant="primary"
                size="2xs"
                disabled={isLoading}
                className="font-bold px-6 py-3 rounded transition-colors disabled:bg-blue-400"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Procesando...
                  </span>
                ) : (
                  "Registrarse"
                )}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}