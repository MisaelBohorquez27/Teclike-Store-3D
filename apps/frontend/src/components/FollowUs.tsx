"use client";
import { motion } from "framer-motion";
import { FiInstagram } from "react-icons/fi";
import Image from "next/image";
import { Subscription } from "./ui/Subscription";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Button from "./ui/PagesButtons";

export function FollowUs() {
  // Array de imágenes de ejemplo (reemplaza con tus propias imágenes)
  const instagramPosts = [
    { id: 1, url: "/products/foto1.jpg", alt: "Post 1 de Instagram" },
    { id: 2, url: "/products/foto2.jpg", alt: "Post 2 de Instagram" },
    { id: 3, url: "/products/foto3.jpg", alt: "Post 3 de Instagram" },
    { id: 4, url: "/products/foto4.jpg", alt: "Post 4 de Instagram" },
    { id: 5, url: "/products/foto1.jpg", alt: "Post 5 de Instagram" },
    { id: 6, url: "/products/foto2.jpg", alt: "Post 6 de Instagram" },
  ];

  return (
    <section className="FollowUs-bg py-14 px-4 flex">
      <div className="bg-transparent max-w-6xl w-2/3 px-12">
        <div className="text-center mb-8">
          <motion.h2
            className="TitleColor text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Síguenos en Instagram
          </motion.h2>
        </div>

        {/* Galeria de imagenes */}
        <Swiper
          modules={[Autoplay]}
          slidesPerView={"auto"}
          spaceBetween={16}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3000}
          loop={true}
          className="pb-4"
        >
          {instagramPosts.map((post) => (
            <SwiperSlide key={post.id} style={{ width: "auto" }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-lg overflow-hidden shadow-md"
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
            </SwiperSlide>
          ))}
        </Swiper>
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
          >
            <Button
              variant="secondary"
              size="s"
              className="transition-all duration-300 transform hover:-translate-y-1 mr-2 flex flex-cols-2 gap-2 mt-4"
            >
              <FiInstagram className=" text-lg" />
              @teclike_ec
            </Button>
          </a>
        </motion.div>
      </div>
      <div className="w-1/3">
        <div className="relative h-110 overflow-hidden flex justify-center items-center">
          <div className="px-8 py-8 mb-10 rounded-lg  max-w-4xl mx-auto text-center">
            <motion.h2
              className="TitleColor text-3xl md:text-4xl font-bold mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Obtén el 10% de descuento al suscribirte
            </motion.h2>
            <Subscription />
          </div>
        </div>
      </div>
    </section>
  );
}
