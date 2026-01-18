import httpClient from "./httpClient";
import { AuthResponse, LoginFormData, RegisterFormData } from "../types/auth.types";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

// Detectar si estamos en el cliente (no en servidor)
const isClient = typeof window !== "undefined";

export class AuthService {
  static async login(data: LoginFormData): Promise<AuthResponse> {
    try {
      console.log('📡 Llamando a /auth/login con:', { email: data.email });
      const response = await httpClient.post<AuthResponse>("/auth/login", data);
      console.log('✅ Respuesta del servidor:', response.data);
      
      // Guardar tokens y usuario INMEDIATAMENTE
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      this.saveUser(response.data.user);
      console.log('✅ Tokens y usuario guardados en localStorage');
      
      // NO sincronizar carrito aquí - hacerlo después cuando el usuario cargue la página
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      console.error('Respuesta del error:', error.response?.data);
      throw new Error(error.response?.data?.message || error.message || "Error en login");
    }
  }

  static async register(data: RegisterFormData): Promise<AuthResponse> {
    try {
      console.log('📡 Llamando a /auth/register con:', { email: data.email, username: data.username });
      const response = await httpClient.post<AuthResponse>("/auth/register", data);
      console.log('✅ Respuesta del servidor:', response.data);
      
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      this.saveUser(response.data.user);
      console.log('✅ Usuario y tokens guardados');
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Error en registro:', error);
      console.error('Respuesta del error:', error.response?.data);
      throw new Error(error.response?.data?.message || error.message || "Error en registro");
    }
  }

  static async logout(): Promise<void> {
    console.log('📤 Iniciando logout...');
    
    // Intentar notificar al servidor (pero no esperar si falla)
    try {
      console.log('📡 Notificando al servidor sobre logout...');
      // No esperamos esta llamada - fire and forget con timeout corto
      const logoutPromise = httpClient.post("/auth/logout");
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 2000)
      );
      
      try {
        await Promise.race([logoutPromise, timeoutPromise]);
        console.log('✅ Servidor notificado');
      } catch {
        console.warn('⚠️ No se pudo notificar al servidor (continuando con limpieza)');
      }
    } catch (error) {
      console.error("⚠️ Error:", error);
    }
    
    // SIEMPRE limpiar tokens y usuario - esto es lo importante
    console.log('🧹 Limpiando estado local...');
    this.clearTokens();
    this.clearUser();
    
    // Detener sincronización automática del carrito
    try {
      const { CartService } = await import('./cart.service');
      CartService.stopAutoSync();
      console.log('🛒 Sincronización del carrito detenida');
    } catch (error) {
      console.warn('⚠️ Error deteniendo sync:', error);
    }
    
    console.log('✅ Logout completado - sesión cerrada en cliente');
  }

  static async refreshToken(): Promise<string> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await httpClient.post<AuthResponse>("/auth/refresh-token", {
        refreshToken,
      });
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      return response.data.accessToken;
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  }

  static async getMe(): Promise<any> {
    try {
      const response = await httpClient.get("/auth/me");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        this.clearTokens();
      }
      throw error;
    }
  }

  // Token management
  static saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  static getAccessToken(): string | null {
    if (!isClient) return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  static getRefreshToken(): string | null {
    if (!isClient) return null;
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch {
      return null;
    }
  }

  static clearTokens(): void {
    if (!isClient) return;
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error limpiando tokens:', error);
    }
  }

  static isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) {
      console.log('⏰ No hay token - considerado expirado');
      return true;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      console.log(`⏰ Token exp: ${new Date(payload.exp * 1000).toISOString()}, Expirado: ${isExpired}`);
      return isExpired;
    } catch {
      console.log('⏰ Error decodificando token - considerado expirado');
      return true;
    }
  }

  // User management
  static saveUser(user: any): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    console.log('💾 Usuario guardado en localStorage');
  }

  static getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static clearUser(): void {
    console.log('🧹 Limpiando usuario del localStorage...');
    localStorage.removeItem(USER_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const expired = this.isTokenExpired();
    const result = !!token && !expired;
    console.log(`🔐 isAuthenticated(): token=${!!token}, expirado=${expired}, resultado=${result}`);
    return result;
  }
}
