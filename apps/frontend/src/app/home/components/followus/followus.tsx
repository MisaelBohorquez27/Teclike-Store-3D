"use client";

import { motion } from "framer-motion";
import { InstagramGallery } from "./components/instagramgallery/instagramgallery";
import { InstagramButton } from "./components/instagramgallery/instagrambutton";
import { SubscriptionSection } from "./components/subscriptionsection/subscription";
import {
  FollowUsProps,
  DEFAULT_POSTS,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_USERNAME,
  titleAnimation,
} from "@/types/followus";
import {
  FiInstagram,
  FiHeart,
  FiUsers,
  FiCamera,
  FiTrendingUp,
} from "react-icons/fi";

export function FollowUs({
  posts = DEFAULT_POSTS,
  instagramUrl = DEFAULT_INSTAGRAM_URL,
  username = DEFAULT_USERNAME,
}: FollowUsProps) {
  return (
    <section id="FollowUs" className="relative bg-linear-to-br from-gray-950 via-black/50 to-gray-950 overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        {/* Patrón de gradiente */}
        <div className="absolute inset-0 bg-linear-to-br from-cyan-900/10 via-transparent to-cyan-900/10" />

        {/* Efectos de partículas */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-linear-to-r from-cyan-500/5 to-blue-500/5 blur-3xl"
            style={{
              top: `${20 + i * 15}%`,
              left: `${i * 20}%`,
            }}
          />
        ))}

        {/* Líneas decorativas */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute end-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="relative z-10 py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header con estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12 lg:mb-16"
          >
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {/* Instagram Gallery - Ocupa 2/3 */}
            <div className="lg:col-span-2 w-full">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="mb-6 md:mb-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-100 mb-2 md:mb-4">
                    <span>
                      Lo último en&nbsp;
                    </span>
                    <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      nuestras redes
                    </span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400">
                    Síguenos en Instagram para no perderte ninguna actualización,
                    lanzamiento o promoción exclusiva.
                  </p>
                </div>

                <InstagramGallery posts={posts} instagramUrl={instagramUrl} />

                {/* Botón de Instagram mejorado */}
                <motion.div className="mt-6 md:mt-8" whileHover={{ scale: 1.02 }}>
                  <InstagramButton
                    instagramUrl={instagramUrl}
                    username={username}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Sidebar con contenido adicional - Ocupa 1/3 */}
            <motion.div
              className="space-y-6 md:space-y-8 w-full"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >

              {/* User Testimonials */}
              <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800/50">
                <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
                  <span className="text-xl md:text-2xl">💬</span>
                  <span className="text-sm md:text-base">Lo que dice nuestra comunidad</span>
                </h3>
                <div className="space-y-2 md:space-y-4">
                  {[
                    {
                      user: "@_romero36",
                      comment:
                        "Hace poco compré un producto y la calidad es excelente 👏",
                      likes: 245,
                    },
                    {
                      user: "@perez_ps34",
                      comment:
                        "Por ser cliente fiel me regalaron un mousepad, gracias teclike 🔥",
                      likes: 189,
                    },
                  ].map((testimonial, index) => (
                    <div key={index} className="p-2 md:p-3 rounded-lg md:rounded-xl bg-gray-800/30">
                      <div className="flex items-center gap-2 mb-1 md:mb-2">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-linear-to-r from-cyan-500 to-blue-500" />
                        <span className="text-white text-xs md:text-sm font-medium truncate">
                          {testimonial.user}
                        </span>
                      </div>
                      <p className="text-gray-300 text-xs md:text-sm mb-1 md:mb-2 line-clamp-2">
                        {testimonial.comment}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <FiHeart className="w-3 h-3" />
                        <span>{testimonial.likes} likes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Featured Hashtags */}
              <div className="p-4 md:p-6 md:pl-6 rounded-2xl md:rounded-3xl bg-linear-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800/50">
                <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-3 md:mb-4 flex items-center gap-2">
                  <span className="text-xl md:text-2xl">🏷️</span>
                  <span className="text-sm md:text-base">Hashtags Destacados</span>
                </h3>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {[
                    "#tecladosRGB",
                    "#gamers",
                    "#tecnología",
                    "#tecladosmecánicos",
                    "#mouseGamer",
                    "#ofertaEspecial",
                  ].map((tag) => (
                    <a
                      key={tag}
                      href={`https://instagram.com/explore/tags/${tag.slice(
                        1
                      )}`}
                      className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs md:text-sm transition-colors whitespace-nowrap"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
