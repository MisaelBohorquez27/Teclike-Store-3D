"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Button from "./PagesButtons";

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
    <div className="w-auto max-w-lg">
      {isSubscribed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl"
        >
          <p>¡Gracias por suscribirte!</p>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Input con efecto hover */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 
                         transition-all text-sm backdrop-blur-sm"
              aria-label="Email for newsletter subscription"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                            opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>

          {/* Botón con estados */}
          <Button
            variant="form"
            disabled={isLoading}
            className={`
              w-full rounded-xl font-semibold transition-all duration-300 transform text-sm
            `}
            size="s"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Procesando...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Subscribe Now
                <FaArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={12}
                />
              </span>
            )}
          </Button>
        </motion.form>
      )}
    </div>
  );
}
