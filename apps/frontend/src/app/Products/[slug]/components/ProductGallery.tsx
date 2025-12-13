"use client";

import Image from "next/image";
import { useState } from "react";
import { CustomSwiper } from "@/components/Swipper/CustomSwiper";

export function ProductGallery({
  description,
  images,
}: {
  images: string[];
  description: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSlideChange = (index: number) => {
    setSelectedIndex(index);
  };

  // Validar que tenemos imágenes válidas
  const validImages = images.filter((img) => img && img.trim() !== "");
  
  if (validImages.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No hay imágenes disponibles</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 justify-cente items-center">
        {/* Miniaturas verticales (izquierda en desktop, arriba en mobile) */}
        <div className="flex md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 w-full md:w-24">
          {validImages.map((img, index) => (
            <div
              key={index}
              className={`relative aspect-square min-w-[80px] md:w-full rounded-md border-2 cursor-pointer transition-all duration-200
              ${
                selectedIndex === index
                  ? "border-blue-500 opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              {!imageErrors.has(index) ? (
                <Image
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover rounded-md"
                  priority={index === 0}
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-md">
                  <span className="text-xs text-gray-600">Error</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Imagen principal */}
        <div className="mt-4 md:mt-2 flex-1 aspect-square w-full max-w-xs md:max-w-md">
          <CustomSwiper
            items={validImages}
            initialSlide={selectedIndex}
            onSlideChange={handleSlideChange}
            renderItem={(img) => (
              <div className="relative aspect-square w-full">
                {!imageErrors.has(validImages.indexOf(img)) ? (
                  <Image
                    src={img}
                    alt="Vista detallada del producto"
                    fill
                    sizes="(max-width: 756px) 100vw, 50vw"
                    className="object-contain rounded-lg border"
                    priority
                    onError={() => handleImageError(validImages.indexOf(img))}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-lg border">
                    <span className="text-gray-600">Imagen no disponible</span>
                  </div>
                )}
              </div>
            )}
            slidesPerView={1}
            withIndicators={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 1 },
            }}
            className="h-full"
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-start mt-24 pr-2 md:pr-8">
        <h3 className="text-xl font-semibold">Descripción</h3>
        <p className="mt-2">{description}</p>
      </div>
    </div>
  );
}
