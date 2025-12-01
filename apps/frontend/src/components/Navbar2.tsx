"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX, FiUser, FiShoppingBag, FiHeart } from "react-icons/fi";
import logo from "../../public/logos/Logo4.png";
import CartIcon from "./CartIcon";
import Button from "./PagesButtons";
import { ThemeToggle } from "./Theme";

export function Navbar2() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

    // Detectar scroll para cambiar estilo de navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(".navbar-content")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Componente auxiliar para los links - MEJORADO
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
      className="flex items-center gap-2 py-3 px-4 md:py-2 md:px-4 text-neutral-1 dark:text-neutral-2 hover:text-primary dark:hover:text-primary-hover transition-all duration-300 rounded-lg hover:bg-neutral-3 dark:hover:bg-neutral-4 font-medium text-sm md:text-base group"
      onClick={() => setIsOpen(false)}
    >
      {Icon && (
        <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
      )}
      <span>{text}</span>
    </Link>
  );

  return (
    <>
      <nav
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray backdrop-blur-md shadow-lg py-2"
            : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-1">
          <div className="flex justify-between items-center py-2.5">
            {/* Logo - MEJORADO */}
            <div className="flex items-center flex-1">
              <button
                className="md:hidden mr-3 p-2 rounded-xl hover:bg-neutral-3 dark:hover:bg-neutral-4 transition-all duration-300 hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
                aria-label="Menú"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <FiX
                    size={20}
                    className="text-neutral-1 dark:text-neutral-2"
                  />
                ) : (
                  <FiMenu
                    size={20}
                    className="text-neutral-1 dark:text-neutral-2"
                  />
                )}
              </button>

              <Link
                href="/"
                className="flex items-center transition-all duration-300 hover:scale-105 group"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src={logo}
                  alt="Vective3D Logo"
                  width={140}
                  height={44}
                  className="h-9 w-auto md:h-11 brightness-110"
                  priority
                />
                <div className="ml-2 h-6 w-px bg-neutral-3 dark:bg-neutral-4 group-hover:bg-primary transition-colors"></div>
              </Link>
            </div>

            {/* Menú central - Desktop MEJORADO */}
            <div className="hidden md:flex items-center space-x-1 flex-1 justify-center">
              <NavLink href="/" text="Inicio" />
              <NavLink href="/Products" text="Productos" />
              <NavLink href="/DailyOffers" text="Ofertas" />
              <NavLink href="/HelpContact" text="Contacto" />
            </div>

            {/* Acciones de usuario - SIMPLIFICADO Y MEJORADO */}
            <div className="flex items-center space-x-4 md:space-x-5 gap-4 flex-1 justify-end">
              {/* Cart Icon */}
              <div className="hover:scale-110 transition-transform">
                <CartIcon />
              </div>

              {/* Botón Login - MEJORADO */}
              <Link href="/login" className="hidden sm:block">
                <Button
                  variant="primary"
                  size="xs"
                  className="flex items-center space-x-2 hover:scale-105 transition-transform"
                >
                  <FiUser size={16} />
                  <span>Ingresar</span>
                </Button>
              </Link>

              {/* Icono Login Mobile */}
              <Link
                href="/login"
                className="sm:hidden p-2 rounded-xl hover:bg-neutral-3 dark:hover:bg-neutral-4 transition-all duration-300 hover:scale-110"
                aria-label="Iniciar sesión"
                onClick={() => setIsOpen(false)}
              >
                <FiUser
                  size={20}
                  className="text-neutral-1 dark:text-neutral-2"
                />
              </Link>

              {/* Theme Toggle */}
              <div className="hover:scale-110 transition-transform">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>

        {/* Menú Mobile - MEJORADO */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full navbar-bg backdrop-blur-2xl bg-white/98 dark:bg-neutral-4/98 border-t border-neutral-3/50 dark:border-neutral-4/50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-3">
                <NavLink href="/" text="Inicio" icon={FiHeart} />
                <NavLink
                  href="/Products"
                  text="Productos"
                  icon={FiShoppingBag}
                />
                <NavLink href="/DailyOffers" text="Ofertas del Día" />
                <NavLink href="/HelpContact" text="Ayuda y Contacto" />

                {/* Wishlist Mobile */}
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 py-3 px-4 text-neutral-1 dark:text-neutral-2 hover:text-red-500 transition-all duration-300 rounded-lg hover:bg-neutral-3 dark:hover:bg-neutral-4 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <FiHeart className="w-4 h-4" />
                  <span>Mi Lista de Deseos</span>
                </Link>

                {/* Sección de cuenta para mobile */}
                <div className="pt-4 mt-4 border-t border-neutral-3/50 dark:border-neutral-4/50">
                  <Link
                    href="/login"
                    className="block w-full py-3 px-4 btn-primary rounded-xl text-center font-semibold transition-all hover:scale-105 shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>

                  <p className="text-center text-xs text-neutral-2 dark:text-neutral-3 mt-3">
                    ¿No tienes cuenta?{" "}
                    <Link
                      href="/register"
                      className="text-primary hover:text-primary-hover font-medium"
                    >
                      Regístrate
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
