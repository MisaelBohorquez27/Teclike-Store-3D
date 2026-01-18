"use client";

import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "@/context/authcontext";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const { login, register, isLoading, error, clearError, isAuthenticated } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateLoginForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = "Email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email no válido";
    }

    if (!formData.password) {
      errors.password = "Contraseña es requerida";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = "Email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email no válido";
    }

    if (!formData.username) {
      errors.username = "Usuario es requerido";
    } else if (formData.username.length < 3) {
      errors.username = "El usuario debe tener al menos 3 caracteres";
    }

    if (!formData.password) {
      errors.password = "Contraseña es requerida";
    } else if (formData.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirmar contraseña es requerido";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    if (mode === "login") {
      if (!validateLoginForm()) return;

      try {
        console.log('🔐 Iniciando login...');
        await login(formData.email, formData.password);
        console.log('✅ Login completado');
        
        // Verificar que los tokens se guardaron
        const token = localStorage.getItem('accessToken');
        console.log('✅ Token guardado en localStorage:', !!token);
        
        // Cerrar modal
        onClose();
        
        // Esperar un poco y hacer reload simple
        console.log('⏳ Esperando 500ms antes de recargar...');
        setTimeout(() => {
          console.log('🔄 Recargando página...');
          window.location.reload();
        }, 500);
      } catch (err) {
        console.error("❌ Login error:", err);
        const errorMsg = err instanceof Error ? err.message : "Error desconocido en login";
        console.error("Mensaje de error:", errorMsg);
      }
    } else {
      if (!validateRegisterForm()) return;

      try {
        console.log('📝 Iniciando registro...');
        await register(
          formData.email,
          formData.username,
          formData.password,
          formData.confirmPassword
        );
        console.log('✅ Registro completado');
        
        // Verificar que los tokens se guardaron
        const token = localStorage.getItem('accessToken');
        console.log('✅ Token guardado en localStorage:', !!token);
        
        // Cerrar modal
        onClose();
        
        // Esperar un poco y hacer reload simple
        console.log('⏳ Esperando 500ms antes de recargar...');
        setTimeout(() => {
          console.log('🔄 Recargando página...');
          window.location.reload();
        }, 500);
      } catch (err) {
        console.error("❌ Register error:", err);
        const errorMsg = err instanceof Error ? err.message : "Error desconocido en registro";
        console.error("Mensaje de error:", errorMsg);
      }
    }
  };

  const handleModeSwitch = (newMode: "login" | "register") => {
    setMode(newMode);
    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    setValidationErrors({});
    clearError();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
        <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-cyan-500/20">
            <h2 className="text-2xl font-bold text-white">
              {mode === "login" ? "Iniciar Sesión" : "Registrarse"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  disabled={isLoading}
                  className={`w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 transition-colors ${
                    validationErrors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-700 focus:border-cyan-500"
                  } focus:outline-none disabled:opacity-50`}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-400">{validationErrors.email}</p>
                )}
              </div>

              {/* Username (solo en registro) */}
              {mode === "register" && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="tu_usuario"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 transition-colors ${
                      validationErrors.username
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-700 focus:border-cyan-500"
                    } focus:outline-none disabled:opacity-50`}
                  />
                  {validationErrors.username && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.username}</p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className={`w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 transition-colors ${
                    validationErrors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-700 focus:border-cyan-500"
                  } focus:outline-none disabled:opacity-50`}
                />
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-400">{validationErrors.password}</p>
                )}
              </div>

              {/* Confirm Password (solo en registro) */}
              {mode === "register" && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className={`w-full px-4 py-2 bg-gray-800/50 border rounded-lg text-white placeholder-gray-500 transition-colors ${
                      validationErrors.confirmPassword
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-700 focus:border-cyan-500"
                    } focus:outline-none disabled:opacity-50`}
                  />
                  {validationErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">{validationErrors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? "Cargando..." : mode === "login" ? "Iniciar Sesión" : "Registrarse"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">O</span>
              </div>
            </div>

            {/* Mode Switch */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                {mode === "login"
                  ? "¿No tienes cuenta?"
                  : "¿Ya tienes cuenta?"}
              </p>
              <button
                type="button"
                onClick={() => handleModeSwitch(mode === "login" ? "register" : "login")}
                className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors text-sm"
              >
                {mode === "login" ? "Regístrate aquí" : "Inicia sesión aquí"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
