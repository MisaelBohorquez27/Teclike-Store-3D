"use client";

import Button from "@/components/common/pagesbuttons";
import { useState } from "react";
import { sendContactMessage } from "@/services/contact";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

//contact form component
export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await sendContactMessage({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone ? formData.phone : undefined,
        subject: formData.subject,
        message: formData.message,
      });

      setSuccess("✅ Mensaje enviado con éxito. Te responderemos pronto!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Auto-clear success message
      setTimeout(() => setSuccess(null), 5000);
    } catch (err: any) {
      setError(err.message || "❌ Error inesperado. Intenta de nuevo.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Nombre y Apellido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-100 mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-600"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-100 mb-2">
            Apellido
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-600"
            required
          />
        </motion.div>
      </div>

      {/* Email y Teléfono */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="email" className="block text-sm font-semibold text-gray-100 mb-2">
            <span className="flex items-center gap-2">
              <FiMail className="w-4 h-4" />
              Correo Electrónico
            </span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-600"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-100 mb-2">
            <span className="flex items-center gap-2">
              <FiPhone className="w-4 h-4" />
              Teléfono (Opcional)
            </span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+57 320 000 0000"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-600"
          />
        </motion.div>
      </div>

      {/* Asunto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-100 mb-2">
          Asunto
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-600 cursor-pointer"
          required
        >
          <option value="">Selecciona un asunto...</option>
          <option value="soporte">🛠️ Soporte Técnico</option>
          <option value="ventas">💼 Consulta de Ventas</option>
          <option value="facturacion">📄 Facturación</option>
          <option value="devolucion">🔄 Devoluciones</option>
          <option value="otros">❓ Otros</option>
        </select>
      </motion.div>

      {/* Mensaje */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <label htmlFor="message" className="block text-sm font-semibold text-gray-100 mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Cuéntanos cómo podemos ayudarte..."
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-600 resize-none"
          required
        />
        <p className="text-xs text-gray-400 mt-2">
          {formData.message.length}/500 caracteres
        </p>
      </motion.div>

      {/* Botón Submit */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <button
          type="submit"
          disabled={loading || !formData.firstName || !formData.lastName || !formData.email || !formData.message}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
        >
          {loading ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <FiMail className="w-5 h-5" />
              Enviar Mensaje
            </>
          )}
        </button>
      </motion.div>

      {/* Alertas Animadas */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
          >
            <FiCheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">{success}</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
          >
            <FiAlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
