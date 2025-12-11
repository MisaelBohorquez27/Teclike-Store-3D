import { sendContactEmail } from "../services/mailer.service";
import { Request, Response } from "express";

/**
 * Validar formato de email
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Manejar formulario de contacto
 * Envía email a través del servicio de mailer
 */
export async function handleContact(req: Request, res: Response) {
  const { firstName, lastName, email, phone, subject, message } = req.body;

  // Validaciones de entrada
  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "Faltan campos obligatorios: firstName, lastName, email, subject, message",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: "El formato del email no es válido",
    });
  }

  if (message.length < 10) {
    return res.status(400).json({
      success: false,
      error: "El mensaje es demasiado corto (mínimo 10 caracteres)",
    });
  }

  try {
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
      console.error("⚠️ Email no enviado:", emailError);
      // No fallamos la petición solo porque el email falle
    }

    return res.json({
      success: true,
      message: "Mensaje recibido correctamente. Nos pondremos en contacto pronto.",
    });
  } catch (err) {
    console.error("❌ Error en handleContact:", err);

    return res.status(500).json({
      success: false,
      error: "Error interno del servidor. Por favor, intente más tarde.",
    });
  }
}