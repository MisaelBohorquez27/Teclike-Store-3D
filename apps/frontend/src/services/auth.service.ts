import httpClient from "./httpClient";
import { AuthResponse, LoginFormData, RegisterFormData } from "../types/auth.types";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export class AuthService {
  static async login(data: LoginFormData): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>("/auth/login", data);
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      this.saveUser(response.data.user);
      
      // Sincronizar carrito local con servidor después de login
      // Importar CartService aquí para evitar circular dependency
      const { CartService } = await import('./cartService');
      try {
        await CartService.syncLocalCartWithServer();
        console.log('✅ Carrito sincronizado después del login');
      } catch (error) {
        console.warn('⚠️ No se pudo sincronizar carrito:', error);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error en login");
    }
  }

  static async register(data: RegisterFormData): Promise<AuthResponse> {
    try {
      const response = await httpClient.post<AuthResponse>("/auth/register", data);
      this.saveTokens(response.data.accessToken, response.data.refreshToken);
      this.saveUser(response.data.user);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Error en registro");
    }
  }

  static async logout(): Promise<void> {
    try {
      await httpClient.post("/auth/logout");
    } catch (error) {
      console.error("Error en logout:", error);
    } finally {
      // Limpiar tokens y usuario SIEMPRE
      this.clearTokens();
      this.clearUser();
      
      // Detener sincronización automática y limpiar carrito local
      try {
        const { CartService } = await import('./cartService');
        CartService.stopAutoSync();
        CartService.clearLocalCart();
      } catch (error) {
        console.warn('Error limpiando carrito:', error);
      }
      
      console.log('✅ Sesión cerrada correctamente');
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
    return localStorage.getItem(TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static clearTokens(): void {
    console.log('🧹 Limpiando tokens del localStorage...');
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    // Verificar que realmente se borraron
    const token = localStorage.getItem(TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!token && !refreshToken) {
      console.log('✅ Tokens limpiados correctamente');
    } else {
      console.error('❌ Error: Los tokens no se borraron');
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
