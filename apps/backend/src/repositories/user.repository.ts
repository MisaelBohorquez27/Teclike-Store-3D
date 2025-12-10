import { PrismaClient, Prisma } from "@prisma/client";
import { User } from "../types/auth.types";

const prisma = new PrismaClient();

export async function findUserById(id: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  });
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserByUsername(username: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { username },
  });
}

export async function createUser(userData: {
  email: string;
  username: string;
  password: string;
}): Promise<User> {
  return prisma.user.create({
    data: userData,
  });
}

export async function updateUser(
  id: number,
  updates: Prisma.UserUpdateInput
): Promise<User> {
  return prisma.user.update({
    where: { id },
    data: updates,
  });
}

export async function deleteUser(id: number): Promise<User> {
  return prisma.user.delete({
    where: { id },
  });
}

export async function getAllUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
