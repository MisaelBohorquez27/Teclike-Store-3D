"use client";

import { Navbar } from "@/components/Navbar";
import Button from "@/components/ui/PagesButtons";
import desktop from "../../public/ui/escritorio2.png";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { FloatingObjects } from "./ui/FloatingObjects";

export function HeroBanner() {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Evitar hidratación no coincidente (SSR vs CSR)
  if (!isMounted) {
    return (
      <>
        <Navbar />
        <main className="hero-bg min-h-screen" />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="hero-bg min-h-[calc(100vh-4rem)] md:min-h-screen relative overflow-hidden">
        <div className="container mx-auto px-4 h-full">
          <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-8 py-12 md:py-24">
            {/* Contenido de texto */}
            <motion.div
              className="flex-1 max-w-2xl z-10"
              initial={
                prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Visualiza tu espacio antes de comprar
              </h1>

              <motion.p
                className="hero-subtitle text-xl md:text-2xl opacity-90 mb-8"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Aquí puedes encontrar todo lo que estás buscando
              </motion.p>

              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Button
                  variant="primary"
                  size="xl"
                  className="hover:border-transparent"
                >
                  Empezar
                </Button>
              </motion.div>
            </motion.div>

            {/* Imagen */}
            <motion.div
              className="flex-1 flex justify-center lg:justify-end relative w-full max-w-2xl bg-transparent"
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.95 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <Image
                src={desktop}
                alt="Visualización 3D de escritorio moderno"
                width={1200}
                height={800}
                priority
                quality={90}
                className="w-full h-auto object-contain bg-transparent"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
