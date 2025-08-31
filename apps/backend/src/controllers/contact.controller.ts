import { PrismaClient } from "@prisma/client";
import { sendContactEmail } from "../services/mailer.service";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Validación de email
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function handleContact(req: Request, res: Response) {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  // Validaciones mejoradas
  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({ 
      error: "Faltan campos obligatorios: firstName, lastName, email, subject, message" 
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "El formato del email no es válido" });
  }

  if (message.length < 10) {
    return res.status(400).json({ error: "El mensaje es demasiado corto" });
  }

  try {
    // Guardar en base de datos
    const contactMessage = await prisma.contactMessage.create({
      data: { 
        firstName, 
        lastName, 
        email, 
        phone: phone || null, 
        subject, 
        message 
      },
    });

    console.log("💾 Mensaje guardado en BD:", contactMessage.id);

    // Enviar email (no bloqueamos la respuesta si falla el email)
    try {
      await sendContactEmail({
        firstName,
        lastName,
        email,
        phone,
        subject,
        message,
      });
    } catch (emailError) {
      console.error("⚠️ Email no enviado, pero mensaje guardado:", emailError);
      // No fallamos la petición solo porque el email falle
    }

    res.json({ 
      success: true, 
      message: "Mensaje recibido correctamente. Nos pondremos en contacto pronto.",
      messageId: contactMessage.id
    });

  } catch (err) {
    console.error("❌ Error en handleContact:", err);
    
    // Manejo específico de errores de Prisma
    if (err instanceof Error) {
      if (err.message.includes('prisma') || err.message.includes('database')) {
        return res.status(500).json({ 
          error: "Error de base de datos. Por favor, intente nuevamente." 
        });
      }
    }

    res.status(500).json({ 
      error: "Error interno del servidor. Por favor, intente más tarde." 
    });
  }
}