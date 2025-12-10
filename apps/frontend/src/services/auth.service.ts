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
      this.clearTokens();
      this.clearUser();
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
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  static isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
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
    return !!this.getAccessToken() && !this.isTokenExpired();
  }
}
