"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiHeart, FiShoppingBag } from "react-icons/fi";
import CartIcon from "./CartIcon";

export function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);
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
      // Esta es una implementación básica - puedes mejorarla según tus secciones
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
    // Define aquí qué secciones tienen fondo oscuro
    const darkSections = ["hero", "about", "services", "contact"];
    return sectionId ? darkSections.includes(sectionId) : false;
  };

  // Función para obtener la sección actual (simplificada)
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

  // Cerrar menú al cambiar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      className={`flex items-center text-gray-300 hover:text-gray-100 gap-2 py-2 px-4 transition-all duration-300 rounded-lg font-medium shadow-2xs hover:scale-105`}
      onClick={() => setIsOpen(false)}
    >
      {Icon && (
        <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
      )}
      <span>{text}</span>
    </Link>
  );

  return (
    <nav
      className={`fixed md:top-0 left-0 right-0 z-40 transition-all duration-500 py-1.5 flex items-center justify-center ${
        isScrolled ? "bg-transparent backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >      
      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="container px-4 w-full max-w-7xl">
        <div className="flex justify-between items-center py-2 relative">
          {/* Menú Mobile Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <FiX size={20} className={textColor} />
            ) : (
              <FiMenu size={20} className={textColor} />
            )}
          </button>
          {/* Contenedor del menú centrado */}
          <div className="hidden md:flex items-center justify-center relative left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4">
              <NavLink href="/" text="Inicio" />
              <NavLink href="/Products" text="Productos" />
              <NavLink href="/DailyOffers" text="Oferta" />

              {/* CartIcon junto a los links, con espacio extra */}
              <div className="ml-6 hover:scale-110 transition-transform">
                <CartIcon />
              </div>
            </div>
          </div>

          {/* Menú Mobile */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 shadow-xl animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-2">
                  <NavLink href="/" text="Inicio" icon={FiHeart} />
                  <NavLink
                    href="/Products"
                    text="Productos"
                    icon={FiShoppingBag}
                  />
                  <NavLink href="/DailyOffers" text="Oferta" />

                  {/* Wishlist Mobile */}
                  <Link
                    href="/wishlist"
                    className={`flex items-center gap-3 py-3 px-4 transition-all duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-medium ${textColor}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <FiHeart className="w-4 h-4" />
                    <span>Mi Lista de Deseos</span>
                  </Link>

                  {/* Carrito en mobile */}
                  <div
                    className="py-3 px-4 flex justify-end"
                    onClick={() => setIsOpen(false)}
                  >
                    <CartIcon />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CartIcon en móvil (visible cuando el menú está cerrado) */}
          {!isOpen && (
            <div className="md:hidden ml-auto">
              <div className="hover:scale-110 transition-transform">
                <CartIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
