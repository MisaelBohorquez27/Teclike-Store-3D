"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { hoverAnimation } from "@/types/FollowUs";
import { InstagramPostProps } from "../Types/InstagramProps";

export function InstagramPost({ post, instagramUrl }: InstagramPostProps) {
  return (
    <motion.div
      {...hoverAnimation}
      className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-lg overflow-hidden shadow-md"
    >
      <a
        href={instagramUrl}
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
          priority={post.id <= 2}
        />
      </a>
    </motion.div>
  );
}