// seeders/seed-users.ts
import { PrismaClient, RoleType } from "@prisma/client";
import * as bcrypt from "bcrypt";

export async function seedUsers(prisma: PrismaClient) {
  console.log("👥 Insertando usuarios...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  const users = [
    {
      role: RoleType.ADMIN,
      photoURL: "https://example.com/photo1.jpg",
      username: "Admin",
      phone: "+1234567890",
      email: "admin@teclike.com",
      password: hashedPassword,
    },
    {
      role: RoleType.CUSTOMER,
      photoURL: "https://example.com/photo2.jpg",
      username: "JohnDoe",
      phone: "+1987654321",
      email: "john@teclike.com",
      password: hashedPassword,
    },
    {
      role: RoleType.CUSTOMER,
      photoURL: "https://example.com/photo3.jpg",
      username: "JaneSmith",
      phone: "+1122334455",
      email: "jane@teclike.com",
      password: hashedPassword,
    },
  ];

  // ✅ LOOP para crear cada usuario
  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        role: userData.role,
        photoURL: userData.photoURL,
        username: userData.username,
        phone: userData.phone,
        email: userData.email,
        password: userData.password,
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

    console.log(`✅ Usuario creado: ${user.username} (${user.email})`);
  }

  console.log("✅ Usuarios insertados correctamente");
}

