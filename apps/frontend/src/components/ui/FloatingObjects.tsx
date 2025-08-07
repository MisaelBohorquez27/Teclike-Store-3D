'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaMouse,
  FaKeyboard,
  FaHeadphones,
  FaGamepad,
  FaLaptop,
  FaServer,
} from 'react-icons/fa';

const peripherals = [
  { icon: <FaMouse size={28} className="text-blue-300" />, name: 'mouse' },
  { icon: <FaKeyboard size={28} className="text-purple-300" />, name: 'keyboard' },
  { icon: <FaHeadphones size={28} className="text-green-300" />, name: 'headphones' },
  { icon: <FaGamepad size={28} className="text-red-300" />, name: 'gamepad' },
  { icon: <FaLaptop size={28} className="text-yellow-300" />, name: 'laptop' },
  { icon: <FaServer size={28} className="text-indigo-300" />, name: 'server' },
];

// Genera un conjunto de puntos aleatorios para movimiento
const generateRandomPath = (steps = 5) =>
  Array.from({ length: steps }, () => ({
    x: Math.random() * 80 + 10, // entre 10% y 90%
    y: Math.random() * 80 + 10,
  }));

export function FloatingObjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);

  // Inicializa rutas
  useEffect(() => {
    const generatePaths = () => peripherals.map(() => generateRandomPath());
    setPaths(generatePaths());

    const interval = setInterval(() => {
      setPaths(generatePaths());
    }, 20000); // Cambiar cada 20s

    return () => clearInterval(interval);
  }, []);

  // Mover cursor falso
  useEffect(() => {
    const moveCursor = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setCursorPos({
        x: Math.random() * width,
        y: Math.random() * height,
      });
    };

    const interval = setInterval(moveCursor, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Cursor falso animado */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border-2 border-blue-400 bg-white bg-opacity-30 z-30 flex items-center justify-center"
        animate={{
          x: cursorPos.x - 16,
          y: cursorPos.y - 16,
          transition: { type: 'spring', damping: 15, stiffness: 200 },
        }}
      >
        <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20" />
      </motion.div>

      {/* Periféricos flotando */}
      {peripherals.map((item, i) => {
        const path = paths[i];

        // Asegura que el path esté disponible
        if (!path) return null;

        return (
          <motion.div
            key={item.name}
            className="absolute bg-white bg-opacity-10 p-4 rounded-full backdrop-blur-md border border-white border-opacity-20 shadow-lg z-10"
            animate={{
              left: path.map((p) => `${p.x}%`),
              top: path.map((p) => `${p.y}%`),
              rotate: [0, 15, -15, 0],
              transition: {
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'reverse',
              },
            }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
            >
              {item.icon}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
