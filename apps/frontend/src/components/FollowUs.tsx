"use client";
import { motion } from "framer-motion";
import { FiInstagram } from "react-icons/fi";

export function FollowUs() {
  return (
    <section className="bg-gradient-to-r from-[#fff] to-[#d7f6ff] py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-4xl font-bold mb-6 uppercase tracking-wider text-Black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Follow us on Instagram
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <a
            href="https://instagram.com/tu_cuenta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-blue-500 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
          >
            <FiInstagram className="mr-2 text-xl" />
            @tu_cuenta
          </a>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="aspect-square bg-white/20 rounded-lg overflow-hidden backdrop-blur-sm"
              >
                {/* Placeholder para imágenes de Instagram */}
                <div className="w-full h-full flex items-center justify-center text-Black">
                  <FiInstagram className="text-3xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}