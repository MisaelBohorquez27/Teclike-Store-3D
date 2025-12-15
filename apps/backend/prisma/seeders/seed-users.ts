// seeders/seed-users.ts
import { PrismaClient, RoleType } from "@prisma/client";
import * as bcrypt from "bcrypt";

export async function seedUsers(prisma: PrismaClient) {
  console.log("👥 Insertando usuarios...");
  console.log("==============================================");

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
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

    for (const userData of users) {
      try {
        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
          where: { email: userData.email },
        });

        if (existingUser) {
          skipped++;
          console.log(`⏭️  ${userData.username} - Ya existe (${userData.email})`);
          continue;
        }

        // Crear nuevo usuario
        const newUser = await prisma.user.create({
          data: {
            role: userData.role,
            photoURL: userData.photoURL,
            username: userData.username,
            phone: userData.phone,
            email: userData.email,
            password: userData.password,
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
        console.log(`✅ ${userData.username} creado exitosamente`);
      } catch (userError) {
        errors++;
        const errorMsg = userError instanceof Error ? userError.message : String(userError);
        console.error(`❌ Error con ${userData.username}: ${errorMsg}`);
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
