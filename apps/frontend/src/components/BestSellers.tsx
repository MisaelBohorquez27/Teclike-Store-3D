'use client';
import { useState } from 'react';
import { ProductCard } from './ProductCard';

const BEST_SELLERS = [
  {
    id: 1,
    title: "Kindle",
    tagline: "See the difference. Literally.",
    description: "Now with enhanced display features.",
    features: [
      "Glare-free display",
      "Adjustable front light",
      "Weeks of battery life",
      "Holds thousands of books"
    ],
    fullDescription: "Amazon Kindle 16 GB (newest model) - Lightest and most compact Kindle, now with faster page turns...",
    priceRange: { min: 155, max: 186 },
    currency: "US$"
  },
  {
    id: 2,
    title: "COLLAGEN",
    tagline: "SILENT FACEBOOK MARK OVER TASTE",
    features: [
      "SUGAR FREE CREATINE",
      "MONOHYDRATE for Women"
    ],
    stats: ["50", "26", "19", "30"],
    times: ["(1/2) 20:00 AM", "(4/3) 21:00 AM"],
    fullDescription: "Monohidrato de creatina en polvo 5000 mg de Old School Labs, creatina optimizada para mujeres...",
    priceRange: { min: 52, max: 62 },
    currency: "US$"
  }
];

export function BestSellers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === BEST_SELLERS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? BEST_SELLERS.length - 1 : prev - 1));
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Más vendido de la semana</h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Ver todos los productos →
          </button>
        </div>

        {/* Carrusel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BEST_SELLERS.map((product) => (
              <div key={product.id} className="w-full flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          {/* Controles del carrusel */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            ❮
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
          >
            ❯
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-6 space-x-2">
          {BEST_SELLERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}