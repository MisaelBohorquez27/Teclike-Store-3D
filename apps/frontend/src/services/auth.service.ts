import httpClient from "./httpclient";
import { AuthResponse, LoginFormData, RegisterFormData } from "../types/auth.types";
import { debug } from "../utils/debug";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

// Detectar si estamos en el cliente (no en servidor)
const isClient = typeof window !== "undefined";

export class AuthService {
  static async login(data: LoginFormData): Promise<AuthResponse> {
    try {
      debug.log('📡 Llamando a /auth/login');
      const response = await httpClient.post<AuthResponse>("/auth/login", data);
      debug.log('✅ Respuesta del servidor OK');
      
      // Guardar tokens y usuario INMEDIATAMENTE
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      this.saveUser(response.data.user);
      debug.log('✅ Tokens y usuario guardados');
      
      // NO sincronizar carrito aquí - hacerlo después cuando el usuario cargue la página
      
      return response.data;
    } catch (error: any) {
      debug.error('❌ Error en login');
      throw new Error(error.response?.data?.message || error.message || "Error en login");
    }
  }

  static async register(data: RegisterFormData): Promise<AuthResponse> {
    try {
      debug.log('📡 Llamando a /auth/register');
      const response = await httpClient.post<AuthResponse>("/auth/register", data);
      debug.log('✅ Respuesta del servidor OK');
      
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      this.saveUser(response.data.user);
      debug.log('✅ Usuario y tokens guardados');
      
      return response.data;
    } catch (error: any) {
      debug.error('❌ Error en registro');
      throw new Error(error.response?.data?.message || error.message || "Error en registro");
    }
  }

  static async logout(): Promise<void> {
    debug.log('📤 Iniciando logout...');
    
    // Intentar notificar al servidor (pero no esperar si falla)
    try {
      debug.log('📡 Notificando al servidor sobre logout...');
      // No esperamos esta llamada - fire and forget con timeout corto
      const logoutPromise = httpClient.post("/auth/logout");
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 2000)
      );
      
      try {
        await Promise.race([logoutPromise, timeoutPromise]);
      } catch {
        // No se pudo notificar al servidor
      }
    } catch (error) {
      // Error en logout notify
    }
    
    // SIEMPRE limpiar tokens y usuario - esto es lo importante
    this.clearTokens();
    this.clearUser();
    
    // Detener sincronización automática del carrito
    try {
      const { CartService } = await import('./cart.service');
      CartService.stopAutoSync();
    } catch (error) {
      // Error deteniendo sync
    }
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
    }
  }

  static isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) {
      return true;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      return isExpired;
    } catch {
      return true;
    }
  }

  // User management
  static saveUser(user: any): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  static getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  static clearUser(): void {
    localStorage.removeItem(USER_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const expired = this.isTokenExpired();
    const result = !!token && !expired;
    return result;
  }
}
