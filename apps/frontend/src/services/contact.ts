import { ContactMessage } from "@/types/contactmessage";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export async function sendContactMessage(data: ContactMessage) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
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
