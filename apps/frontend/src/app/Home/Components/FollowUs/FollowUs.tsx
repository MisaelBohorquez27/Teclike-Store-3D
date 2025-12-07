"use client";

import { motion } from "framer-motion";
import { InstagramGallery } from "./Components/InstagramGallery/InstagramGallery";
import { InstagramButton } from "./Components/InstagramGallery/InstagramButton";
import { SubscriptionSection } from "./Components/SubscriptionSection/Subscription";
import {
  FollowUsProps,
  DEFAULT_POSTS,
  DEFAULT_INSTAGRAM_URL,
  DEFAULT_USERNAME,
  titleAnimation,
} from "@/types/followUs";
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
    <section className="relative bg-gradient-to-br from-gray-950 via-black to-gray-950 overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        {/* Patrón de gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-cyan-900/10" />

        {/* Efectos de partículas */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-3xl"
            style={{
              top: `${20 + i * 15}%`,
              left: `${i * 20}%`,
            }}
          />
        ))}

        {/* Líneas decorativas */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="relative z-10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Header con estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/20 mb-6">
              <FiInstagram className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-bold tracking-wide">
                COMUNIDAD
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Únete a Nuestra
              </span>
              <br />
              <span className="text-gray-100">Comunidad</span>
            </h2>

            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Descubre contenido exclusivo, detrás de cámaras y sé el primero en
              conocer nuestras novedades
            </p>

            {/* Stats de Instagram */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {[
                {
                  icon: FiUsers,
                  value: "1K+",
                  label: "Seguidores",
                  color: "text-blue-400",
                },
                {
                  icon: FiHeart,
                  value: "2.5K",
                  label: "Me gusta",
                  color: "text-red-400",
                },
                {
                  icon: FiCamera,
                  value: "50+",
                  label: "Publicaciones",
                  color: "text-purple-400",
                },
                {
                  icon: FiTrendingUp,
                  value: "98%",
                  label: "Crecimiento",
                  color: "text-green-400",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:cyan-purple-500/30 transition-all duration-300"
                >
                  <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-gray-100">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Instagram Gallery - Ocupa 2/3 */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">
                    Lo último en nuestro Instagram
                  </h3>
                  <p className="text-gray-400">
                    Contenido fresco y exclusivo cada día
                  </p>
                </div>

                <InstagramGallery posts={posts} instagramUrl={instagramUrl} />

                {/* Botón de Instagram mejorado */}
                <motion.div className="mt-8" whileHover={{ scale: 1.02 }}>
                  <InstagramButton
                    instagramUrl={instagramUrl}
                    username={username}
                  />
                </motion.div>
              </motion.div>
              {/* CTA para subir contenido */}
              <div className="w-full max-w-md p-6 mx-auto rounded-3xl bg-gradient-to-br from-gray-900/30 to-cyan-900/30 backdrop-blur-md border border-blue-500/20 text-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  ¡Mencionanos!
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Etiquétanos en tus fotos con nuestros productos para aparecer
                  en nuestro feed
                </p>
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all hover:scale-105">
                  Ver Guía de Menciones
                </button>
              </div>
            </div>

            {/* Sidebar con contenido adicional - Ocupa 1/3 */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              {/* Newsletter Section
              <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">✉️</span>
                  Newsletter Exclusivo
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Recibe contenido exclusivo y ofertas especiales directamente en tu email
                </p>
                <SubscriptionSection />
              </div> */}

              {/* User Testimonials */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-md border border-gray-800/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl">💬</span>
                  Lo que dice nuestra comunidad
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      user: "@techlover",
                      comment:
                        "¡Increíble contenido! Siempre tienen las últimas novedades tech 👏",
                      likes: 245,
                    },
                    {
                      user: "@gadgetguru",
                      comment:
                        "La mejor comunidad para amantes de la tecnología. ¡Los sigo desde el día 1! 🔥",
                      likes: 189,
                    },
                  ].map((testimonial, index) => (
                    <div key={index} className="p-3 rounded-xl bg-gray-800/30">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blu-500" />
                        <span className="text-white font-medium">
                          {testimonial.user}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">
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
              <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-md border border-cyan-500/20">
                <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏷️</span>
                  Hashtags Destacados
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "#TechStyle",
                    "#Innovación",
                    "#Tecnología",
                    "#NuevoProducto",
                    "#ComunidadTech",
                    "#OfertaEspecial",
                  ].map((tag) => (
                    <a
                      key={tag}
                      href={`https://instagram.com/explore/tags/${tag.slice(
                        1
                      )}`}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors"
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

          {/* Sección inferior con beneficios */}
          <motion.div
            className="mt-16 md:mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Por qué seguirnos en Instagram?
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: "🎁",
                  title: "Ofertas Exclusivas",
                  description: "Descuentos y promociones solo para seguidores",
                },
                {
                  icon: "🚀",
                  title: "Lanzamientos Anticipados",
                  description: "Sé el primero en conocer nuevos productos",
                },
                {
                  icon: "💡",
                  title: "Contenido Educativo",
                  description:
                    "Tutoriales y tips para sacar el máximo provecho",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
