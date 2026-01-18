"use client";

import Link from "next/link";
import Image from "next/image";
import { FiHelpCircle, FiLogOut, FiUser } from "react-icons/fi";
import logo from "../../../public/logos/Logo3.png";
import Button from "@/components/common/pagesbuttons";
import { Navbar2 } from "./navbar2";
import { useState } from "react";
import { useAuth } from "@/context/authcontext";
import { AuthModal } from "@/components/auth/authmodal";

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      console.log("🚀 Iniciando logout desde Header...");
      await logout();
      console.log("✅ Logout ejecutado, redirigiendo...");
      // Esperar a que se ejecute el logout completamente antes de recargar
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (error) {
      console.error("❌ Error en logout:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="relative w-full top-0 left-0 right-0 z-50 shadow-lg pt-3.5 pb-3 text-gray-300">
      {/* Fondo con degradado elegante */}
      <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950 to-gray-950" />

      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 bg-linear-to-b from-cyan-500/5 via-transparent to-transparent" />

      {/* Contenido */}
      <div className="w-full">
        <div className="flex justify-between items-center py-1 px-4 md:px-8 lg:px-12 xl:px-16">
          {/* Logo con efecto */}
          <div className="flex items-center z-50">
            <Link
              href="/"
              className="flex items-center transition-all duration-300 hover:scale-105 group relative font-bold gap-2"
            >
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src={logo}
                alt="Teclike Logo"
                width={140}
                height={44}
                className="h-8 w-auto md:h-10 relative z-10 brightness-110 drop-shadow-md"
                priority
              />
              TECLIKE
            </Link>
          </div>
          <Navbar2 />

          {/* Acciones del header */}
          <div className="flex items-center space-x-4 md:space-x-6 z-50">
            {/* Botón Contacto */}
            <Link href="/HelpContact">
              <Button
                variant="primary"
                size="xs"
                className="bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/90 hover:text-gray-100 flex items-center space-x-2 hover:scale-105 transition-all duration-200"
              >
                <FiHelpCircle size={16} />
                <span>Contacto</span>
              </Button>
            </Link>

            {/* Botón Login / Usuario */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-cyan-400 font-medium hidden sm:inline">
                  <div className="flex items-center gap-1">
                    <FiUser size={15} />
                    {user.username}
                  </div>
                </span>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 hover:scale-105 transition-all duration-100 text-sm ${
                    isLoggingOut
                      ? "bg-gray-600/80 text-gray-300 cursor-not-allowed"
                      : "backdrop-blur-sm hover:text-gray-100 cursor-pointer text-gray-200"
                  }`}
                >
                  <span>{isLoggingOut ? "Saliendo..." : "Salir"}</span>
                  <FiLogOut size={15} />
                </button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="xs"
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gray-700/80 backdrop-blur-sm hover:bg-cyan-500 hover:text-gray-900 px-3 py-1.5 rounded-lg flex items-center space-x-2 hover:scale-105 transition-all duration-100 text-sm"
              >
                <FiUser size={16} />
                <span>Ingresar</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Modal de autenticación */}
      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </header>
  );
}
