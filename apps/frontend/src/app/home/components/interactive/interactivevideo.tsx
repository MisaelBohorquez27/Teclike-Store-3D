"use client";

import { useState, useRef, useEffect } from "react";
import { FiPlay, FiPause, FiVolume2, FiVolumeX } from "react-icons/fi";
import { motion } from "framer-motion";

export function InteractiveVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ⚙️ CONFIGURACIÓN DEL VIDEO
  const VIDEO_URL = "ui/blog.mp4";
  const VIDEO_START_TIME = 0;        // ⏱️ Comenzar en segundo 0
  const VIDEO_DURATION = 22;         // ⏱️ Duración máxima: 15 segundos
  const VIDEO_END_TIME = VIDEO_START_TIME + VIDEO_DURATION; // Fin automático

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

  // Actualizar progreso del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const currentTime = video.currentTime;
      
      // ✅ Validar que no esté antes del start
      if (currentTime < VIDEO_START_TIME) {
        video.currentTime = VIDEO_START_TIME;
        return;
      }
      
      // ✅ Detener al alcanzar el tiempo final
      if (currentTime >= VIDEO_END_TIME) {
        video.currentTime = VIDEO_START_TIME;
        video.play();
        return;
      }
      
      // Calcular progreso dentro del rango
      const adjustedTime = currentTime - VIDEO_START_TIME;
      const progress = (adjustedTime / VIDEO_DURATION) * 100;
      setProgress(Math.max(0, Math.min(progress, 100)));
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [VIDEO_START_TIME, VIDEO_END_TIME, VIDEO_DURATION]);

  // ✅ Establecer tiempo de inicio y manejar el loop cuando el video esté listo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.currentTime = VIDEO_START_TIME;
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => video.removeEventListener("loadedmetadata", handleLoadedMetadata);
  }, [VIDEO_START_TIME, VIDEO_END_TIME]);

  // Mostrar/ocultar controles con timeout
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const showControlsWithTimeout = () => {
      setShowControls(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setShowControls(false), 2000);
    };

    document.addEventListener("mousemove", showControlsWithTimeout);
    document.addEventListener("touchstart", showControlsWithTimeout);

    return () => {
      document.removeEventListener("mousemove", showControlsWithTimeout);
      document.removeEventListener("touchstart", showControlsWithTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gray-950 overflow-hidden">
      {/* Video container */}
      <div className="relative h-screen w-full">
        {/* Video principal */}
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Overlay sutil para mejor contraste */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/20" />

        {/* Efecto de borde luminoso */}
        <div className="absolute inset-0 border-12 border-transparent">
          <div className="absolute -inset-0.5 bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-sm" />
        </div>

        {/* Barra de progreso sutil 
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800/50">
          <motion.div
            className="h-full bg-linear-to-r from-cyan-500 to-blue-500"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>*/}

        {/* Controles flotantes */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 p-3 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showControls ? 1 : 0,
            y: showControls ? 0 : 20 
          }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? (
              <FiVolumeX className="w-5 h-5 text-white" />
            ) : (
              <FiVolume2 className="w-5 h-5 text-white" />
            )}
          </button>
        </motion.div>

        {/* Indicador de scroll 
        <motion.div
          className="absolute bottom-12 right-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-xs text-gray-400 rotate-90 tracking-widest">
            SCROLL
          </div>
        </motion.div>*/}
      </div>

      {/* Título minimalista 
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center px-4">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 5 }}
          >
            <span className="bg-linear-to-r from-blue-900 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              INNOVACIÓN
            </span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 5 }}
          >
            Tecnología que redefine los límites
          </motion.p>
        </div>
      </div>*/}
    </section>
  );
}