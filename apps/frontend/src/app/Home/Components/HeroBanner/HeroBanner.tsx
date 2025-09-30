"use client";

import { Navbar } from "@/components/Navbar";
import Button from "@/components/ui/PagesButtons";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMounted } from "@/hooks/useIsMounted";
import { HERO_CONFIG } from "./Data/HeroData";
import { getAnimationProps } from "./Props/HeroProps";

export function HeroBanner() {
  const isMounted = useIsMounted();
  const prefersReducedMotion = useReducedMotion();
  const animationProps = getAnimationProps(prefersReducedMotion);

  // Evitar el parpadeo en SSR
  if (!isMounted) {
    return (
      <>
        <Navbar />
        <main className="hero-bg min-h-screen" />
      </>
    );
  }

  return (
    <main className="hero-bg min-h-[calc(100vh-4rem)] md:min-h-screen relative overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-8 py-12 md:py-24">
          
          {/* Text Content */}
          <motion.div className="flex-1 max-w-2xl z-10" {...animationProps.text}>
            <h1 className="title text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {HERO_CONFIG.title}
            </h1>
            <motion.p className="subtitle text-xl md:text-2xl opacity-90 mb-8" {...animationProps.fade(0.2)}>
              {HERO_CONFIG.subtitle}
            </motion.p>
            <motion.div {...animationProps.fade(0.4)}>
              <Button variant="primary" size="xl" className="hover:border-transparent">
                {HERO_CONFIG.buttonText}
              </Button>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div className="flex-1 flex justify-center lg:justify-end relative w-full max-w-2xl bg-transparent" {...animationProps.image}>
            <Image
              src={HERO_CONFIG.image.src}
              alt={HERO_CONFIG.image.alt}
              width={HERO_CONFIG.image.width}
              height={HERO_CONFIG.image.height}
              priority
              quality={90}
              className="w-full h-auto object-contain bg-transparent"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
}