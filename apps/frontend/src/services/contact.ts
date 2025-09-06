import { ContactMessage } from "@/types/contactMessage";

export async function sendContactMessage(data: ContactMessage) {
  const res = await fetch("http://localhost:5000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error || "Error al enviar el mensaje");
  }

  return res.json();
}
