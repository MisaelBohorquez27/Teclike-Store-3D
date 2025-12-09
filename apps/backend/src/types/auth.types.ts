export interface User {
  id: number;
  email: string;
  role: string;
  photoURL?: string | null;
  username: string;
  phone?: string | null;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  user: Omit<User, "password">;
  accessToken: string;
  refreshToken: string;
  message?: string;
}

export interface JWTPayload {
  id: number;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
