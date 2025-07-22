'use client';

import { useState } from 'react';

const FAQS = [
  {
    question: "¿Cómo descargo los modelos 3D después de comprarlos?",
    answer: "Tras completar tu compra, recibirás un email con enlaces de descarga. También puedes acceder a tus productos desde la sección 'Mis Descargas' en tu perfil."
  },
  {
    question: "¿Qué formatos de archivo están disponibles?",
    answer: "Ofrecemos modelos en los formatos más populares: OBJ, FBX, STL y BLEND. Cada producto especifica los formatos disponibles."
  },
  {
    question: "¿Puedo modificar los modelos que compre?",
    answer: "Sí, todos nuestros modelos 3D son editables. Sin embargo, revisa los términos de licencia para uso comercial."
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos tarjetas de crédito/débito, PayPal y transferencias bancarias. Todos los pagos son procesados de forma segura."
  }
];

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {FAQS.map((faq, index) => (
        <div key={index} className="mb-4 border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleFaq(index)}
            className="flex justify-between items-center w-full text-left font-medium text-lg text-gray-800 hover:text-blue-600 focus:outline-none"
          >
            <span>{faq.question}</span>
            <span className="text-xl">{activeIndex === index ? '−' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className="mt-2 text-gray-600">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}