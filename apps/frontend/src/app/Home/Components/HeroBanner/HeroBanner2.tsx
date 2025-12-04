"use client";

import Button from "@/components/PagesButtons";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { HERO_CONFIG } from "./Data/HeroData";
import { getAnimationProps } from "./Props/HeroProps";
import {
  FiArrowRight,
  FiTrendingUp,
  FiUsers,
  FiArrowDown,
  FiCpu,
  FiGlobe,
  FiCode,
  FiServer,
} from "react-icons/fi";

export function HeroBanner2() {
  const isMounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();
  const animationProps = getAnimationProps(prefersReducedMotion);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("trending-section");
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: "smooth",
      });
    }
  };

  if (!isMounted) {
    return (
      <>
        <section className="bg-gray-950 min-h-screen" />
      </>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-950">

      {/* Fondo de imagen a pantalla completa con overlay tecnológico 
      <div className="absolute inset-0">
        <Image
          src="/ui/HeroBanner.png"
          alt="Fondo tecnológico futurista"
          fill
          priority
          quality={100}
          className="object-cover object-center"
          sizes="100vw"
        /> 
        <div/>
        */}
        {/* Overlay oscuro con efecto de partículas */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        
        {/* Efecto de partículas animadas */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[2px] bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -30, -60],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Líneas de conexión futuristas 
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
              style={{
                top: `${15 + i * 12}%`,
                left: "5%",
                right: "5%",
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>*/}

        {/* Grid tecnológico animado 
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Orbital rings 
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-500/20 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-purple-500/20 rounded-full"
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            rotate: {
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        /> abajo de esto iria el div para la imagen*/}

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-start top-40">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Mejorado */}
            <motion.div
              className="text-white space-y-8"
              {...animationProps.text}
            >
              {/* Badge futurista 
              <motion.div
                className="inline-flex items-center gap-3 px-4 py-3 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-blue-300 font-medium text-sm">
                  TECNOLOGÍA DE VANGUARDIA
                </span>
                <FiCpu className="w-4 h-4 text-blue-400" />
              </motion.div>*/}

              {/* Título principal mejorado */}
              <motion.div
                className="space-y-4 mt-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                  <span className="text-white">
                    Encuentra los
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Mejores Productos
                  </span>
                </h1>
                
                <motion.p
                  className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Somos una importadora que te ofrece los mejores productos del mercado. 
                  <span className="text-blue-300 font-semibold"> Con un precio accesible, </span>
                  <span className="text-purple-300 font-semibold"> de buena calidad </span>
                  y
                  <span className="text-cyan-300 font-semibold"> confiable</span>.
                </motion.p>
              </motion.div>

              {/* CTA Buttons mejorados */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  variant="primary"
                  size="xl"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-950 to-blue-900 hover:from-blue-900 hover:to-blue-800 border-0 text-white font-bold py-4 px-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
                >
                  <span className="flex items-center gap-3 relative z-10">
                    {HERO_CONFIG.buttonText}
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </motion.div>

              {/* Trust badges modernos
              <motion.div
                className="flex items-center gap-6 pt-8 pb-4 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-gray-900 shadow-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + i * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-white">+1k clientes</div>
                    <div className="text-gray-400">Confían en nosotros</div>
                  </div>
                </div>
              </motion.div> */}
            </motion.div>

            {/* Panel de visualización tecnológica */}
            <motion.div
              className="relative"
              {...animationProps.image}
            >
              {/* Terminal flotante */}
              <motion.div
                className="relative bg-gray-900/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl"
                initial={{ opacity: 0, x: 50, rotateY: 10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                {/* Header del terminal */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <div className="text-gray-400 text-sm font-mono">terminal --dev-mode</div>
                </div>

                {/* Contenido del terminal */}
                <div className="font-mono text-sm space-y-2">
                  <div className="text-green-400">$ npm create next-app@latest</div>
                  <div className="text-blue-400">✔ ¿Cómo se llamará tu proyecto? ... mi-app</div>
                  <div className="text-cyan-400">✔ ¿Usar TypeScript? ... Sí</div>
                  <div className="text-purple-400">✔ ¿Usar Tailwind CSS? ... Sí</div>
                  <div className="text-yellow-400">🚀 Creando proyecto...</div>
                  <motion.div
                    className="text-white"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ████████████████████ 100%
                  </motion.div>
                  <div className="text-green-400">✅ ¡Proyecto creado exitosamente!</div>
                </div>

                {/* Indicadores de actividad */}
                <div className="absolute -top-3 -right-3 bg-blue-500 rounded-full p-2 shadow-lg">
                  <FiServer className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator futurista */}
      <motion.div
        className="absolute bottom-18 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        onClick={scrollToNextSection}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            scrollToNextSection();
          }
        }}
        aria-label="Desplazarse hacia abajo"
      >
        <motion.div
          className="flex flex-col items-center gap-3 text-blue-400 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="text-sm font-medium tracking-wider uppercase">EXPLORAR PRODUCTOS</div>
          <motion.div
            className="w-12 h-12 border-2 border-blue-400/50 rounded-full flex justify-center items-center backdrop-blur-sm bg-blue-400/10"
            whileHover={{
              scale: 1.1,
              borderColor: "rgba(96, 165, 250, 0.8)",
              backgroundColor: "rgba(96, 165, 250, 0.2)",
            }}
          >
            <FiArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}