"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiChevronLeft,
  FiChevronRight,
  FiShoppingCart,
  FiEye,
  FiStar,
  FiTruck,
  FiShield,
  FiClock,
} from "react-icons/fi";

// Tipos de productos
interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  discount?: string;
  features: string[];
  videoUrl: string;
  thumbnail: string;
  rating: number;
  reviews: number;
}

// Datos de productos tecnológicos
const TECH_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Pro Gamer VR Headset",
    category: "Realidad Virtual",
    description: "Cascos de realidad virtual 8K con seguimiento ocular integrado y audio espacial 360°",
    price: "$899.99",
    discount: "$1,199.99",
    features: ["Resolución 8K", "120Hz refresh", "Audio 3D", "Compatible PC/PS5"],
    videoUrl: "ui/video.mp4",
    thumbnail: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?q=80&w=2070",
    rating: 4.8,
    reviews: 342,
  },
  {
    id: 2,
    name: "Quantum Laptop Pro",
    category: "Computación",
    description: "Laptop gaming con procesador i9-13900K y RTX 4090, 32GB RAM DDR5",
    price: "$2,499.99",
    discount: "$2,999.99",
    features: ["RTX 4090 16GB", "32GB DDR5", "2TB NVMe", "Pantalla 4K 144Hz"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-laptop-with-a-blank-screen-2989-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071",
    rating: 4.9,
    reviews: 521,
  },
  {
    id: 3,
    name: "Drone X-Pro Max",
    category: "Drones",
    description: "Drone profesional con cámara 8K, 10km de alcance y 45 minutos de vuelo",
    price: "$1,599.99",
    features: ["Cámara 8K", "45min vuelo", "10km alcance", "Sensores anti-colisión"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-flying-a-drone-over-a-windy-beach-39821-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070",
    rating: 4.7,
    reviews: 287,
  },
  {
    id: 4,
    name: "Smart Home Hub Pro",
    category: "IoT",
    description: "Central de hogar inteligente con control por voz y compatibilidad con 500+ dispositivos",
    price: "$299.99",
    discount: "$399.99",
    features: ["Control por voz", "500+ compatibilidad", "Seguridad avanzada", "AI integrada"],
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-smart-home-device-interface-43342-large.mp4",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070",
    rating: 4.6,
    reviews: 189,
  },
];

export function TechProductShowcase() {
  const [currentProduct, setCurrentProduct] = useState<Product>(TECH_PRODUCTS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Manejo del video
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextProduct = () => {
    const currentIndex = TECH_PRODUCTS.findIndex(p => p.id === currentProduct.id);
    const nextIndex = (currentIndex + 1) % TECH_PRODUCTS.length;
    setCurrentProduct(TECH_PRODUCTS[nextIndex]);
    setIsPlaying(true);
  };

  const prevProduct = () => {
    const currentIndex = TECH_PRODUCTS.findIndex(p => p.id === currentProduct.id);
    const prevIndex = (currentIndex - 1 + TECH_PRODUCTS.length) % TECH_PRODUCTS.length;
    setCurrentProduct(TECH_PRODUCTS[prevIndex]);
    setIsPlaying(true);
  };

  // Auto-rotación de productos
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      nextProduct();
    }, 8000);

    return () => clearInterval(interval);
  }, [autoPlay, currentProduct.id]);

  // Efecto de mouse para controles
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => setShowControls(false), 3000);
    };

    let mouseTimeout: NodeJS.Timeout;
    const container = containerRef.current;

    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(mouseTimeout);
      };
    }
  }, []);

  // Renderizar estrellas de rating
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-600"
        }`}
      />
    ));
  };

  return (
    <section className="relative min-h-screen bg-gray-950 overflow-hidden">
      {/* Fondo con efecto de partículas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-black to-gray-900" />
        
        {/* Grid pattern sutil */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-size-[64px_64px]" />
        </div>

        {/* Efectos de luz */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Contenido principal */}
      <div ref={containerRef} className="relative z-10 container mx-auto px-4 py-12 md:py-24">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-linear-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-4">
            TECNOLOGÍA DE VANGUARDIA
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-linear-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Descubre
            </span>
            <br />
            <span className="text-white">el Futuro</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Productos que transforman la experiencia digital con innovación y diseño premium
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Video showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-square group"
          >
            {/* Video principal */}
            <video
              ref={videoRef}
              src={currentProduct.videoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
              poster={currentProduct.thumbnail}
            />

            {/* Overlay de gradiente */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/40" />

            {/* Controles del video */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-6 left-6 right-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all hover:scale-110"
                    >
                      {isPlaying ? (
                        <FiPause className="w-5 h-5 text-white" />
                      ) : (
                        <FiPlay className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all hover:scale-110"
                    >
                      {isMuted ? (
                        <FiVolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <FiVolume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => setAutoPlay(!autoPlay)}
                    className={`px-4 py-2 rounded-full backdrop-blur-md text-sm font-medium transition-all ${
                      autoPlay
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {autoPlay ? "Auto: ON" : "Auto: OFF"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navegación de productos */}
            <div className="absolute top-6 left-6">
              <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-medium">
                {currentProduct.category}
              </span>
            </div>

            {/* Contadores */}
            <div className="absolute top-6 right-6 flex gap-3">
              {TECH_PRODUCTS.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => {
                    setCurrentProduct(product);
                    setIsPlaying(true);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    product.id === currentProduct.id
                      ? "bg-white w-6"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Ver producto ${index + 1}`}
                />
              ))}
            </div>

            {/* Flechas de navegación */}
            <button
              onClick={prevProduct}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
            >
              <FiChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextProduct}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
            >
              <FiChevronRight className="w-6 h-6 text-white" />
            </button>
          </motion.div>

          {/* Información del producto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Encabezado del producto */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(currentProduct.rating)}
                </div>
                <span className="text-gray-400 text-sm">
                  {currentProduct.rating} ({currentProduct.reviews} reseñas)
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                {currentProduct.name}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Precio */}
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-5xl font-bold text-white">
                {currentProduct.price}
              </span>
              {currentProduct.discount && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {currentProduct.discount}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-sm font-medium">
                    -25%
                  </span>
                </>
              )}
            </div>

            {/* Características */}
            <div className="grid grid-cols-2 gap-4">
              {currentProduct.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-900/50 border border-gray-800/50"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Beneficios */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800/30">
                <FiTruck className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300">Envío Gratis</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800/30">
                <FiShield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300">Garantía 2 Años</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800/30">
                <FiClock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300">Soporte 24/7</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gray-900/30 border border-gray-800/30">
                <div className="w-6 h-6 text-yellow-400 mx-auto mb-2 text-lg">↻</div>
                <div className="text-sm text-gray-300">30 Días Devolución</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                <FiShoppingCart className="w-5 h-5" />
                <span>Añadir al Carrito</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 py-4 px-6 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                <FiEye className="w-5 h-5" />
                <span>Ver Demostración</span>
              </button>
            </div>

            {/* Miniaturas de productos */}
            <div className="pt-6">
              <h3 className="text-white font-semibold mb-4">Explora Más Productos:</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {TECH_PRODUCTS.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setCurrentProduct(product);
                      setIsPlaying(true);
                    }}
                    className={`shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      product.id === currentProduct.id
                        ? "border-cyan-500 scale-105"
                        : "border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}