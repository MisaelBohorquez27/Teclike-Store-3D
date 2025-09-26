'use client';

import { useState } from 'react';
import faq from '@/data/faq.json';


export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {faq.map((faq, index) => (
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