// components/ImageUploader.tsx
"use client";

import { useState } from "react";
import { uploadImage } from "@/services/imageuploader"; 

export function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const imageUrl = await uploadImage(file);
      setPreview(imageUrl);
      // Aquí puedes guardar imageUrl en tu base de datos o estado global
    } catch (err) {
      // Upload error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {loading && <p className="text-sm text-gray-500">Subiendo imagen...</p>}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-64 h-64 object-cover rounded border"
        />
      )}
    </div>
  );
}
