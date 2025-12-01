"use client";

import Link from "next/link";
import Image from "next/image";
import { FiHelpCircle, FiUser } from "react-icons/fi";
import logo from "../../public/logos/Logo3.png";
import Button from "./PagesButtons";

export function Header() {
  return (
    <div className="relative bg-black text-gray-300 top-0 left-0 right-0 z-50 shadow-sm py-1">
      {/* Contenedor que ocupa todo el ancho */}
      <div className="w-full">
        <div className="flex justify-between items-center py-3 px-4 md:px-8 lg:px-12 xl:px-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center transition-all duration-300 hover:scale-105 group"
            >
              <Image
                src={logo}
                alt="Vective3D Logo"
                width={140}
                height={44}
                className="h-8 w-auto md:h-10"
                priority
              />
            </Link>
          </div>

          {/* Acciones del header - Contacto y Login */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Contacto */}
            <Link
              href="/HelpContact"
            >
              <Button
                variant="primary"
                size="xs"
                className="bg-gray-800 hover:bg-gray-700 hover:text-gray-100 flex items-center space-x-2 hover:scale-105 transition-transform"
              >
                <FiHelpCircle size={16} />
                <span>Contacto</span>
              </Button>
            </Link>

            {/* Botón Login */}
            <Link href="/login">
              <Button
                variant="primary"
                size="xs"
                className="bg-gray-700 hover:bg-cyan-500 hover:text-gray-900 flex items-center space-x-2 hover:scale-105 transition-transform"
              >
                <FiUser size={16} />
                <span>Ingresar</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}