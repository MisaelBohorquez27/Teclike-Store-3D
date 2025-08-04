"use client";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "./SearchBar";
import logo from "../../public/logos/Logo2.png"; // Asegúrate de que la ruta sea correcta
import { FiShoppingCart } from "react-icons/fi";
import CartIcon from "./CartIcon";

export function Navbar() {
  return (
    <nav className="bg-[#000712] text-[#FAF9F6] shadow-md h-25">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            {/* Logo */}
            <Image
              src={logo}
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          {/* Menú central */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>
            <Link
              href="/Products"
              className="hover:opacity-80 transition-opacity"
            >
              Productos
            </Link>
            <Link
              href="/DailyOffers"
              className="hover:opacity-80 transition-opacity"
            >
              Ofertas del día
            </Link>
            <Link
              href="/HelpContact"
              className="hover:opacity-80 transition-opacity"
            >
              Ayuda y Contacto
            </Link>
          </div>

          {/* Barra de búsqueda y acciones */}
          <div className="flex items-center space-x-6">
            <SearchBar darkMode />
            <Link
              href="/login"
              className="bg-[#182d50] text-[#FAF9F6] px-4 py-2 rounded-md hover:bg-[#3778d4] hover:bg-opacity-20 transition-colors"
            >
              Iniciar sesión
            </Link>
            <CartIcon />
          </div>
        </div>
      </div>
    </nav>
  );
}
