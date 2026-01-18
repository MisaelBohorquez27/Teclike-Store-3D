"use client";
import { motion } from "framer-motion";
import { FiInstagram } from "react-icons/fi";
import Button from "@/components/common/pagesbuttons";
import { fadeInAnimation } from "@/types/followus";
import { InstagramButtonProps } from "../../types/instagramprops";

export function InstagramButton({ instagramUrl, username }: InstagramButtonProps) {
  return (
    <motion.div
      {...fadeInAnimation}
      className="flex justify-center"
    >
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="secondary"
          size="s"
          className="transition-all bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold duration-300 transform hover:-translate-y-1 mr-2 flex items-center gap-2 mt-4"
        >
          <FiInstagram className="text-lg" />
          {username}
        </Button>
      </a>
    </motion.div>
  );
}