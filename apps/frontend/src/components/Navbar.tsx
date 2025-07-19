"use client";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import logo from "../assets/Logo4.png";
import Button from "@/components/Button";

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <img
            src={logo.src} //Arreglar esto en un futuro
            alt="Logo"
            className="h-10 w-auto"
          />

          {/* Menú central */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-500">
              Home
            </Link>
            <Link
              href="/productos"
              className="text-gray-600 hover:text-blue-500"
            >
              Productos
            </Link>
            <Link href="/ofertas" className="text-gray-600 hover:text-blue-500">
              Ofertas del día
            </Link>
            <Link
              href="/modelado"
              className="text-gray-600 hover:text-blue-500"
            >
              Modelado 3D
            </Link>
          </div>

          {/* Barra de búsqueda y login */}
          <div className="flex items-center space-x-4">
            <SearchBar />
            <Button className="text-sm">
              Iniciar sesión
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
