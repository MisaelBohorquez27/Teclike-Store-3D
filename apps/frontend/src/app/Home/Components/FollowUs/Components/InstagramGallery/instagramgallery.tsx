"use client";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import { BaseSwiper } from "@/components/swipper/baseswiper";
import { InstagramPost } from "./instagrampost";
import { InstagramGalleryProps } from "../../Types/instagramprops";

export function InstagramGallery({ posts, instagramUrl }: InstagramGalleryProps) {
  return (
    <BaseSwiper
      variant="gallery"
      slidesPerView="auto"
      spaceBetween={16}
      speed={3000}
      loop
      className="pb-4"
    >
      {posts.map((post) => (
        <SwiperSlide key={post.id} style={{ width: "auto" }}>
          <InstagramPost post={post} instagramUrl={instagramUrl} />
        </SwiperSlide>
      ))}
    </BaseSwiper>
  );
}