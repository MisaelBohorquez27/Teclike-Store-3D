"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiHeart, FiShoppingBag, FiHome, FiZap } from "react-icons/fi";
import CartIcon from "../cart/carticon";

interface Navbar2Props {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Navbar2({ isMobileMenuOpen, setIsMobileMenuOpen }: Navbar2Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [textColor, setTextColor] = useState(
    "text-gray-900 dark:text-gray-300"
  );

  // Detectar scroll y cambiar color según el fondo
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);

      // Determinar el color basado en el fondo actual
      const currentSection = getCurrentSection();

      // Lógica para cambiar color según el fondo de la sección
      if (isDarkBackground(currentSection)) {
        setTextColor("text-gray-300");
      } else {
        setTextColor("text-gray-900");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función auxiliar para determinar si el fondo es oscuro
  const isDarkBackground = (sectionId: string | null): boolean => {
    const darkSections = ["hero", "about", "services", "contact"];
    return sectionId ? darkSections.includes(sectionId) : false;
  };

  // Función para obtener la sección actual
  const getCurrentSection = (): string | null => {
    const sections = document.querySelectorAll("section[id]");
    let currentSection = null;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section.id;
      }
    });

    return currentSection;
  };

  // Componente auxiliar para los links
  const NavLink = ({
    href,
    text,
    icon: Icon,
  }: {
    href: string;
    text: string;
    icon?: React.ComponentType<any>;
  }) => (
    <Link
      href={href}
      className={`flex items-center text-gray-200 hover:text-white gap-2 py-2 px-4 transition-all duration-300 font-medium hover:scale-105`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {Icon && (
        <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
      )}
      <span>{text}</span>
    </Link>
  );

  return (
    <>
      {/* Navbar Desktop */}
      <nav className={`hidden md:flex w-auto items-center justify-center bg-transparent`}>
        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/30 to-transparent hidden md:block" />
        
        <div className="flex justify-center items-center backdrop-blur-md bg-gray-950/50 rounded-xl px-4 py-1.5 shadow-lg">
          <div className="flex items-center space-x-4">
            <NavLink href="/" text="Inicio" />
            <NavLink href="/products" text="Productos" />
            <NavLink href="/dailyoffers" text="Oferta" />

            {/* CartIcon junto a los links */}
            <div className="ml-6 mr-2 hover:scale-110 transition-transform">
              <CartIcon />
            </div>
          </div>
        </div>
      </nav>

      {/* Menú Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white dark:bg-gray-900 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-xl z-40 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="px-4 py-4 space-y-2">
            <NavLink href="/" text="Inicio" icon={FiHome} />
            <NavLink
              href="/products"
              text="Productos"
              icon={FiShoppingBag}
            />
            <NavLink href="/dailyoffers" text="Oferta" icon={FiZap} />

            {/* Wishlist Mobile */}
            <Link
              href="/wishlist"
              className={`flex items-center gap-3 py-3 px-4 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium ${textColor}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiHeart className="w-4 h-4" />
              <span>Mi Lista de Deseos</span>
            </Link>

            {/* Links adicionales en mobile */}
            <Link
              href="/helpcontact"
              className={`flex items-center gap-3 py-3 px-4 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium ${textColor}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Contacto</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
