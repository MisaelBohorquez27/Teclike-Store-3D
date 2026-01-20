"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType } from "@/types/auth.types";
import { AuthService } from "@/services/auth.service";
import { debug } from "@/utils/debug";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar usuario al cargar y sincronizar estado de autenticación
  useEffect(() => {
    const initAuth = async () => {
      debug.log('🔄 Inicializando AuthContext...');
      try {
        // Verificar si hay token válido
        const hasValidToken = AuthService.isAuthenticated();
        debug.log(`✅ Token válido: ${hasValidToken}`);
        setIsAuthenticated(hasValidToken);

        if (hasValidToken) {
          const user = AuthService.getUser();
          debug.log(`👤 Usuario cargado: ${user?.username}`);
          setUser(user);
        } else {
          // Si no hay token válido, limpiar todo
          debug.log('🗑️ Sin token válido - limpiando todo');
          setUser(null);
          AuthService.clearTokens();
          AuthService.clearUser();
        }
      } catch (error) {
        debug.error("❌ Error initializing auth:", error);
        setUser(null);
        setIsAuthenticated(false);
        AuthService.clearTokens();
        AuthService.clearUser();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.login({ email, password });
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error en login";
      setError(message);
      setIsAuthenticated(false);
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.register({
        email,
        username,
        password,
        confirmPassword,
      });
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error en registro";
      setError(message);
      setIsAuthenticated(false);
      setUser(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    console.log('👋 Ejecutando logout...');
    try {
      await AuthService.logout();
      console.log('✅ AuthService.logout() completado');
    } catch (error) {
      console.error('❌ Error en AuthService.logout():', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      console.log('✅ Estado de React actualizado');
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};
