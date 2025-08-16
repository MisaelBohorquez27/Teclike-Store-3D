"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { SearchBar } from "./SearchBar";
import logo from "../../public/logos/Logo4.png";
import CartIcon from "./ui/CartIcon";
import Button from "./ui/PagesButtons";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  // Efecto para navbar con scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 0) {
        // Arriba del todo: siempre visible
        setHidden(false);
      } else if (currentY > lastY) {
        // Scroll hacia abajo: ocultar
        setHidden(true);
      } else {
        // Scroll hacia arriba: mostrar
        setHidden(false);
      }
      setLastY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

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
  const NavLink = ({ href, text }: { href: string; text: string }) => (
    <Link
      href={href}
      className="block py-2 md:py-0 Navbar-text transition-colors border-b md:border-0 border-gray-700"
      onClick={() => setIsOpen(false)}
    >
      {text}
    </Link>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 Navbar-bg backdrop-blur-sm left-0 transition-transform duration-300 ease-in-out ${
        scrolled ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 md:flex">
          {/* Logo y menú hamburguesa (mobile) */}
          <div className="flex items-center md:shrink-0">
            <button
              className="md:hidden mr-3 p-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menú"
              aria-expanded={isOpen}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Logo"
                width={120}
                height={40}
                className="h-8 w-auto md:h-10 sm:h-9"
                priority
              />
            </Link>
          </div>

          {/* Menú central */}
          <div
            className={`absolute md:static top-full left-0 w-full md:w-auto Navbar-text bg-[var(--color-neutro4)] font-semibold md:bg-transparent transition-all duration-300 ${
              isOpen ? "block" : "hidden md:block"
            }`}
          >
            <div className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0">
              <NavLink href="/" text="Home" />
              <NavLink href="/Products" text="Productos" />
              <NavLink href="/DailyOffers" text="Ofertas del día" />
              <NavLink href="/HelpContact" text="Ayuda y Contacto" />
              <NavLink href="/ProductDetails" text="Detalles de Productos" />
            </div>
          </div>

          {/* Barra de búsqueda y acciones */}
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* SearchBar solo en desktop */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            <Button variant="primary" size="xs">
              <Link href="/login">Iniciar sesión</Link>
            </Button>

            <CartIcon />
          </div>
        </div>

        {/* SearchBar para mobile (aparece al hacer clic en el icono) */}
        {isOpen && (
          <div className="md:hidden px-4 pb-3">
            <SearchBar />
          </div>
        )}
      </div>
    </nav>
  );
}
