"use client";

import { Navbar } from "@/components/Navbar";
import Button from "@/components/PagesButtons";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { HERO_CONFIG } from "./Data/HeroData";
import { getAnimationProps } from "./Props/HeroProps";
import { FiArrowRight, FiPlay, FiStar, FiZap, FiTrendingUp, FiUsers } from "react-icons/fi";

export function HeroBanner() {
  const isMounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();
  const animationProps = getAnimationProps(prefersReducedMotion);

  // Evitar el parpadeo en SSR
  if (!isMounted) {
    return (
      <>
        <main className="hero-bg min-h-screen" />
      </>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Efectos de fondo modernos */}
      <div className="absolute inset-0 hero-bg">
        {/* Grid pattern sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
        
        {/* Gradientes animados */}
        <motion.div 
          className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Líneas de conexión animadas */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
              style={{
                top: `${20 + i * 30}%`,
                left: '10%',
                right: '10%',
              }}
              animate={{
                opacity: [0, 1, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">      
        <main className="min-h-[calc(100vh-4rem)] md:min-h-screen relative">
          <div className="container mx-auto px-4 h-full">
            <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-8 py-8 md:py-16 lg:py-20">
              
              {/* Text Content - Mejorado */}
              <motion.div 
                className="flex-1 max-w-2xl z-10" 
                {...animationProps.text}
              >
                {/* Badge de featured */}
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-primary-accent text-sm font-medium mb-6"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <FiZap className="w-4 h-4" />
                  <span>✨ Tecnología 3D de Vanguardia</span>
                </motion.div>

                {/* Título principal con efectos */}
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-primary via-primary-hover to-cyan-500 bg-clip-text text-transparent">
                    {HERO_CONFIG.title.split(' ')[0]}
                  </span>
                  <br />
                  <span className="text-neutral-1 dark:text-neutral-2">
                    {HERO_CONFIG.title.split(' ').slice(1).join(' ')}
                  </span>
                </motion.h1>

                {/* Subtítulo mejorado */}
                <motion.p 
                  className="text-xl md:text-2xl text-neutral-2 dark:text-neutral-3 mb-8 leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {HERO_CONFIG.subtitle}
                </motion.p>

                {/* Stats en línea modernos */}
                <motion.div 
                  className="flex flex-wrap gap-6 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-neutral-4/50 backdrop-blur-sm border border-white/20">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-neutral-1 dark:text-neutral-2">4.9/5</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-neutral-4/50 backdrop-blur-sm border border-white/20">
                    <FiUsers className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-semibold text-neutral-1 dark:text-neutral-2">10K+ Clientes</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 dark:bg-neutral-4/50 backdrop-blur-sm border border-white/20">
                    <FiTrendingUp className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-neutral-1 dark:text-neutral-2">+200% Crecimiento</span>
                  </div>
                </motion.div>

                {/* CTA Buttons mejorados */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button 
                    variant="primary" 
                    size="xl" 
                    className="group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-primary-hover"
                  >
                    <span className="flex items-center gap-3">
                      {HERO_CONFIG.buttonText}
                      <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="xl"
                    className="group border-2 border-neutral-3 dark:border-neutral-4 hover:border-primary dark:hover:border-primary-hover bg-transparent hover:bg-primary/5"
                  >
                    <span className="flex items-center gap-3">
                      <FiPlay className="w-4 h-4" />
                      Ver Demo
                    </span>
                  </Button>
                </motion.div>

                {/* Trust indicators */}
                <motion.div 
                  className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-3 dark:border-neutral-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white dark:border-neutral-4"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-2 dark:text-neutral-3">
                    <span className="font-semibold text-neutral-1 dark:text-neutral-2">+2,500</span> diseñadores confían en nosotros
                  </p>
                </motion.div>
              </motion.div>

              {/* Image Container - Modernizado */}
              <motion.div 
                className="flex-1 flex justify-center lg:justify-end relative w-full max-w-2xl"
                {...animationProps.image}
              >
                <div className="relative">
                  {/* Efecto de backdrop */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-3xl blur-3xl -z-10"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Container principal */}
                  <motion.div
                    className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <Image
                      src={HERO_CONFIG.image.src}
                      alt={HERO_CONFIG.image.alt}
                      width={HERO_CONFIG.image.width}
                      height={HERO_CONFIG.image.height}
                      priority
                      quality={95}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    />
                    
                    {/* Overlay de gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </motion.div>

                  {/* Elementos flotantes decorativos */}
                  <motion.div
                    className="absolute -bottom-6 -left-6 bg-white dark:bg-neutral-4 rounded-2xl p-4 shadow-2xl border border-neutral-3 dark:border-neutral-4"
                    initial={{ opacity: 0, scale: 0, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1.2, type: "spring" }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <div>
                        <div className="text-sm font-semibold text-neutral-1 dark:text-neutral-2">Render 4K</div>
                        <div className="text-xs text-neutral-2 dark:text-neutral-3">Tiempo real</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -top-6 -right-6 bg-white dark:bg-neutral-4 rounded-2xl p-4 shadow-2xl border border-neutral-3 dark:border-neutral-4"
                    initial={{ opacity: 0, scale: 0, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1.4, type: "spring" }}
                    whileHover={{ y: 5, scale: 1.05 }}
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">60FPS</div>
                      <div className="text-xs text-neutral-2 dark:text-neutral-3">Fluidez</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator moderno */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <div className="flex flex-col items-center gap-2">
              <motion.div
                className="text-sm text-neutral-2 dark:text-neutral-3 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Descubre más
              </motion.div>
              <motion.div
                className="w-6 h-10 border-2 border-neutral-3 dark:border-neutral-4 rounded-full flex justify-center"
                animate={{ 
                  y: [0, 8, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.div 
                  className="w-1 h-3 bg-primary rounded-full mt-2"
                  animate={{ 
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}