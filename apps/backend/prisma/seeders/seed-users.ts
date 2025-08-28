// seeders/seed-users.ts
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

export async function seedUsers(prisma: PrismaClient) {
  console.log("👥 Insertando usuarios...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const users = [
    {
      roleId: 1,
      photoURL: "https://example.com/photo1.jpg",
      firstName: "Admin",
      lastName: "User",
      email: "admin@teclike.com",
      password: hashedPassword,
      phone: "+1234567890",
      documentType: "ID",
      documentNumber: "ADMIN001",
    },
    {
      roleId: 2,
      photoURL: "https://example.com/photo2.jpg",
      firstName: "John",
      lastName: "Doe",
      email: "john@teclike.com",
      password: hashedPassword,
      phone: "+1987654321",
      documentType: "ID",
      documentNumber: "CUST001",
    },
    {
      roleId: 2,
      photoURL: "https://example.com/photo3.jpg",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@teclike.com",
      password: hashedPassword,
      phone: "+1122334455",
      documentType: "Passport",
      documentNumber: "CUST002",
    },
  ];

  for (const userData of users) {
    const role = await prisma.role.findUnique({
      where: { id: userData.roleId },
    });

    if (role) {
      const user = await prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: {
          roleId: role.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          phone: userData.phone,
          documentType: userData.documentType,
          documentNumber: userData.documentNumber,
        },
      });

      // Crear carrito para el usuario
      await prisma.cart.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
        },
      });

      console.log(`✅ Usuario: ${user.firstName} ${user.lastName}`);
    }
  }
}
