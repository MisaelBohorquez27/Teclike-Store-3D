"use client";
import { motion } from "framer-motion";
import { FiInstagram } from "react-icons/fi";
import Image from "next/image";

export function FollowUs() {
  // Array de imágenes de ejemplo (reemplaza con tus propias imágenes)
  const instagramPosts = [
    { id: 1, url: "/products/audifonos-caja.png", alt: "Post 1 de Instagram" },
    { id: 2, url: "/products/mouse-x11.png", alt: "Post 2 de Instagram" },
    { id: 3, url: "/products/teclado-z11.png", alt: "Post 3 de Instagram" },
    { id: 4, url: "/products/audifonos-razer.png", alt: "Post 4 de Instagram" },
    { id: 5, url: "/products/mouse2-x11.png", alt: "Post 5 de Instagram" },
    { id: 6, url: "/products/teclado2-z22.png", alt: "Post 6 de Instagram" },
  ];

  return (
    <section className="bg-gray-900 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Síguenos en Instagram
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <a
              href="https://instagram.com/teclike_ec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-blue-500 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FiInstagram className="mr-2 text-xl" />
              @teclike_ec
            </a>
          </motion.div>
        </div>

        {/* Galería de Instagram */}
        <div className="mt-8">
          <div className="flex overflow-x-auto pb-4 gap-2 md:gap-4 scrollbar-hide">
            {instagramPosts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.02 }}
                className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden shadow-md"
              >
                <a
                  href="https://instagram.com/teclike_ec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <Image
                    src={post.url}
                    alt={post.alt}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}