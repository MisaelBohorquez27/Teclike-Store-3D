"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";

const REVIEWS = [
  {
    id: 1,
    name: "María Fernández",
    verified: false,
    comment:
      "Las piezas de Felte EC son hermosas y de excelente calidad. He recibido muchos cumplidos por mi pulsera. Definitivamente compraré más.",
    rating: 5,
    avatar: "https://example.com/avatar1.jpg",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    verified: true,
    comment:
      "Compré un reloj como regalo para mi novia y le encantó. El empaque es muy elegante y el servicio al cliente fue excelente.",
    rating: 4,
     avatar: "https://example.com/avatar2.jpg",
  },
  {
    id: 3,
    name: "Ana Suárez",
    verified: true,
    comment:
      "Me encanta la colección para mujer. Las piezas son únicas y versátiles, perfectas para cualquier ocasión.",
    rating: 5,
     avatar: "https://example.com/avatar3.jpg",
  },
];

export function CustomerReviews() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-lg text-center text-gray-600 mb-12">
          Experiencias reales de quienes han elegido Vective3D
        </p>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14" // Espacio para la paginación
        >
          {REVIEWS.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white p-8 rounded-xl shadow-sm h-full">
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      review.verified ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <h3 className="font-semibold text-gray-800">{review.name}</h3>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < review.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <blockquote className="text-gray-600 italic">
                  "{review.comment}"
                </blockquote>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
