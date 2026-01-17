// seeders/seed-users.ts
import { PrismaClient, RoleType } from "@prisma/client";
import * as bcrypt from "bcrypt";
import usersData from "../data/users.json";

export async function seedUsers(prisma: PrismaClient) {
  console.log("👥 Insertando usuarios...");
  console.log("==============================================");

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const userData of usersData) {
      try {
        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
          where: { email: userData.email },
        });

        if (existingUser) {
          skipped++;
          console.log(`⏭️  ${userData.firstName} - Ya existe (${userData.email})`);
          continue;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(userData.password || "password123", 10);

        // Crear nuevo usuario
        const newUser = await prisma.user.create({
          data: {
            role: (userData.role === "Admin" ? RoleType.ADMIN : RoleType.CUSTOMER),
            photoURL: userData.photoURL || "https://example.com/default-photo.jpg",
            username: userData.firstName,
            phone: userData.phone || "",
            email: userData.email,
            password: hashedPassword,
          },
        });

        // Crear carrito para el usuario
        try {
          await prisma.cart.create({
            data: {
              userId: newUser.id,
            },
          });
          console.log(`   🛒 Carrito creado`);
        } catch (cartError) {
          const cartMsg = cartError instanceof Error ? cartError.message : String(cartError);
          if (!cartMsg.includes("Unique constraint")) {
            console.warn(`   ⚠️  No se pudo crear carrito: ${cartMsg}`);
          }
        }

        created++;
        console.log(`✅ ${userData.firstName} creado exitosamente`);
      } catch (userError) {
        errors++;
        const errorMsg = userError instanceof Error ? userError.message : String(userError);
        console.error(`❌ Error con ${userData.firstName}: ${errorMsg}`);
      }
    }

    console.log("\n==============================================");
    console.log("📊 Estadísticas finales:");
    console.log(`   • Creados: ${created}`);
    console.log(`   • Saltados: ${skipped}`);
    console.log(`   • Errores: ${errors}`);
    console.log("==============================================");
  } catch (error) {
    console.error("❌ Error fatal en seedUsers:", error);
    throw error;
  }
}
