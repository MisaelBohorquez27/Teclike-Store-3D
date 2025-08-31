import nodemailer from "nodemailer";

// Configuración mejorada del transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    ciphers: "SSLv3", // Necesario para Hotmail/Outlook
    rejectUnauthorized: false // Para desarrollo, quitar en producción
  }
});

// Verificar conexión al inicializar
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Error configurando email transporter:", error);
  } else {
    console.log("✅ Servidor de email listo para enviar mensajes");
  }
});

export async function sendContactEmail({
  firstName,
  lastName,
  email,
  phone,
  subject,
  message,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER, // IMPORTANTE: Usar el email autenticado
      replyTo: `${firstName} ${lastName} <${email}>`, // Para responder al usuario
      to: process.env.MAIL_RECEIVER, // Email destino
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>De:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
          <p><strong>Asunto:</strong> ${subject}</p>
          <hr>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${message}
          </p>
        </div>
      `,
      text: `De: ${firstName} ${lastName} (${email})
${phone ? `Teléfono: ${phone}\n` : ''}
Asunto: ${subject}

Mensaje:
${message}`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Email enviado correctamente. Message ID:", info.messageId);
    
    return info;
  } catch (error) {
    console.error("❌ Error enviando email:", error);
    throw new Error(`Error enviando email: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}