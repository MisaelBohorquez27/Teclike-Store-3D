"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.url; // úsala como imageUrl del producto
}
