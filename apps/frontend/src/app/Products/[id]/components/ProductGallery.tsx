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

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSlideChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 justify-cente items-center">
        {/* Miniaturas verticales (izquierda en desktop, arriba en mobile) */}
        <div className="flex md:flex-col gap-2 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 w-full md:w-24">
          {images.map((img, index) => (
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
              <Image
                src={img}
                alt={`Miniatura ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover rounded-md"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Imagen principal */}
        <div className="mt-4 md:mt-2 flex-1 aspect-square w-full max-w-xs md:max-w-md">
          <CustomSwiper
            items={images}
            initialSlide={selectedIndex}
            onSlideChange={handleSlideChange}
            renderItem={(img) => (
              <div className="relative aspect-square w-full">
                <Image
                  src={img}
                  alt="Vista detallada del producto"
                  fill
                  sizes="(max-width: 756px) 100vw, 50vw"
                  className="object-contain rounded-lg border"
                  priority
                />
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
