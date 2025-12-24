import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as userRepo from "../repositories/user.repository";
import prisma from "../prisma";
import { User, LoginRequest, RegisterRequest, TokenPair, JWTPayload } from "../types/auth.types";

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// Validación lazy - se hace cuando se necesita, no al importar
function validateSecrets() {
  if (!JWT_SECRET || !REFRESH_SECRET) {
    throw new Error("JWT_SECRET y REFRESH_SECRET son requeridos en variables de entorno");
  }
}

export async function login(request: LoginRequest) {
  const { email, password } = request;

  // Validar que los campos no estén vacíos
  if (!email || !password) {
    throw new Error("Credenciales inválidas");
  }

  // Validar formato de email
  if (!isValidEmail(email)) {
    throw new Error("Credenciales inválidas");
  }

  // Buscar usuario por email normalizado
  const user = await userRepo.findUserByEmail(email.toLowerCase());
  if (!user) {
    // No revelar si existe el usuario (evitar enumeración)
    throw new Error("Credenciales inválidas");
  }

  // Validar contraseña
  const isPasswordValid = await bcrypt.compare(password, user.password!);
  if (!isPasswordValid) {
    // Mismo mensaje genérico (evitar enumeración)
    throw new Error("Credenciales inválidas");
  }

  // Generar tokens
  const tokens = generateTokens(user);

  return {
    user: sanitizeUser(user),
    ...tokens,
  };
}

export async function register(request: RegisterRequest) {
  const { email, username, password, confirmPassword } = request;

  // Validaciones
  if (!email || !username || !password || !confirmPassword) {
    throw new Error("Todos los campos son requeridos");
  }

  if (password !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden");
  }

  if (password.length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres");
  }

  if (!isValidEmail(email)) {
    throw new Error("Email no válido");
  }

  // Verificar que el usuario no exista
  const existingUser = await userRepo.findUserByEmail(email.toLowerCase());
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }

  const existingUsername = await userRepo.findUserByUsername(username);
  if (existingUsername) {
    throw new Error("El username ya está registrado");
  }

  // Encriptar contraseña con salt rounds más alto (12 en lugar de 10)
  const hashedPassword = await bcrypt.hash(password, 12);

  // Crear usuario con email normalizado
  const user = await userRepo.createUser({
    email: email.toLowerCase(),
    username,
    password: hashedPassword,
  });

  // Crear carrito automáticamente para el nuevo usuario
  await prisma.cart.create({
    data: {
      userId: user.id,
    },
  });

  console.log(`✅ Carrito creado para nuevo usuario: ${user.id}`);

  // Generar tokens
  const tokens = generateTokens(user);

  return {
    user: sanitizeUser(user),
    ...tokens,
  };
}

export async function refreshToken(token: string): Promise<TokenPair> {
  validateSecrets();
  try {
    const payload = jwt.verify(token, REFRESH_SECRET!) as JWTPayload;

    // Buscar usuario
    const user = await userRepo.findUserById(payload.userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Generar nuevos tokens
    return generateTokens(user);
  } catch (error) {
    throw new Error("Token de refresco inválido o expirado");
  }
}

export function verifyAccessToken(token: string): JWTPayload {
  validateSecrets();
  try {
    return jwt.verify(token, JWT_SECRET!) as JWTPayload;
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
}

export async function validateToken(token: string): Promise<User | null> {
  try {
    const payload = verifyAccessToken(token);
    const user = await userRepo.findUserById(payload.userId);
    return user || null;
  } catch (error) {
    return null;
  }
}

export async function logout(userId: number) {
  // En esta arquitectura simple, el logout se maneja en frontend eliminando tokens
  // Si necesitas blacklist, puedes almacenar tokens revocados en Redis
  return { success: true, message: "Sesión cerrada correctamente" };
}

// Funciones privadas
function generateTokens(user: User): TokenPair {
  validateSecrets();
  
  const payload = {
    id: user.id,
    userId: user.id,  // ✅ Agregar userId explícitamente
    email: user.email,
    username: user.username,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(payload, REFRESH_SECRET!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  return { accessToken, refreshToken };
}

function sanitizeUser(user: User): Omit<User, "password"> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
