"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiSearch, FiUser } from "react-icons/fi";
import logo from "../../public/logos/Logo4.png";
import CartIcon from "./CartIcon";
import Button from "./PagesButtons";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./Theme";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Efecto para navbar con scroll mejorado
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 50) {
        // Arriba del todo: siempre visible
        setScrolled(false);
      } else if (currentY > lastY && currentY > 100) {
        // Scroll hacia abajo: ocultar solo después de 100px
        setScrolled(true);
      } else {
        // Scroll hacia arriba: mostrar
        setScrolled(false);
      }
      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  // Cerrar menú al cambiar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cerrar menú al hacer clic fuera (mejorado)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.navbar-content')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Componente auxiliar para los links
  const NavLink = ({ href, text }: { href: string; text: string }) => (
    <Link
      href={href}
      className="block py-3 px-4 md:py-2 md:px-3 text-neutral-1 dark:text-neutral-2 hover:text-primary dark:hover:text-primary-hover transition-all duration-300 rounded-lg hover:bg-neutral-3 dark:hover:bg-neutral-4 font-medium text-sm md:text-base"
      onClick={() => setIsOpen(false)}
    >
      {text}
    </Link>
  );

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 navbar-bg backdrop-blur-sm bg-white/80 dark:bg-neutral-4/80 transition-all duration-500 ease-out ${
          scrolled 
            ? "-translate-y-full opacity-0" 
            : "translate-y-0 opacity-100 shadow-lg"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3 navbar-content">
            
            {/* Logo y menú hamburguesa (mobile) */}
            <div className="flex items-center md:flex-1">
              <button
                className="md:hidden mr-3 p-2 rounded-lg hover:bg-neutral-3 dark:hover:bg-neutral-4 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
                aria-label="Menú"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <FiX size={20} className="text-neutral-1 dark:text-neutral-2" />
                ) : (
                  <FiMenu size={20} className="text-neutral-1 dark:text-neutral-2" />
                )}
              </button>
              
              <Link 
                href="/" 
                className="flex items-center transition-transform hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={logo}
                  alt="Vective3D Logo"
                  width={140}
                  height={44}
                  className="h-9 w-auto md:h-11"
                  priority
                />
              </Link>
            </div>

            {/* Menú central - Desktop */}
            <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
              <NavLink href="/" text="Home" />
              <NavLink href="/Products" text="Productos" />
              <NavLink href="/DailyOffers" text="Ofertas" />
              <NavLink href="/HelpContact" text="Contacto" />
            </div>

            {/* Acciones de usuario */}
            <div className="flex items-center space-x-2 md:space-x-4 flex-1 justify-end">
              
              {/* Search Bar Desktop */}
              <div className="hidden md:block w-64">
                <SearchBar
                  variant="default"
                  className="hidden md:block"
                />
              </div>

              {/* Search Icon Mobile */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-neutral-3 dark:hover:bg-neutral-4 transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Buscar"
              >
                <FiSearch size={20} className="text-neutral-1 dark:text-neutral-2" />
              </button>

              {/* Botón Login */}
              <Button 
                variant="primary" 
                size="s"
                className="hidden sm:flex items-center space-x-2"
              >
                <FiUser size={16} />
                <Link href="/login">Ingresar</Link>
              </Button>

              {/* Icono Login Mobile */}
              <Link 
                href="/login" 
                className="sm:hidden p-2 rounded-lg hover:bg-neutral-3 dark:hover:bg-neutral-4 transition-colors"
                aria-label="Iniciar sesión"
              >
                <FiUser size={20} className="text-neutral-1 dark:text-neutral-2" />
              </Link>

              <CartIcon />
              <ThemeToggle />
            </div>
          </div>

          {/* SearchBar Mobile */}
          {isSearchOpen && (
            <div className="md:hidden pb-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <SearchBar 
              variant="expanded"
              onSearch={() => setIsSearchOpen(false)} />
            </div>
          )}
        </div>

        {/* Menú Mobile */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full navbar-bg backdrop-blur-lg bg-white/95 dark:bg-neutral-4/95 border-t border-neutral-3 dark:border-neutral-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                <NavLink href="/" text="Home" />
                <NavLink href="/Products" text="Productos" />
                <NavLink href="/DailyOffers" text="Ofertas del Día" />
                <NavLink href="/HelpContact" text="Ayuda y Contacto" />
                
                {/* Sección adicional para mobile */}
                <div className="pt-4 mt-4 border-t border-neutral-3 dark:border-neutral-4">
                  <Link
                    href="/login"
                    className="block py-3 px-4 btn-primary rounded-lg text-center font-semibold transition-all hover:scale-105"
                    onClick={() => setIsOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Espacio para el navbar fixed */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}