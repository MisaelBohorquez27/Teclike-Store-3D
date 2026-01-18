'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import faq from '../data/faq.json';

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faq.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="group"
        >
          <button
            onClick={() => toggleFaq(index)}
            className="w-full text-left"
          >
            <div className="bg-linear-to-r from-gray-800 to-gray-600 p-0.5 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gray-500/50">
              <div className={`bg-linear-to-r from-gray-900/80 to-black/70 rounded-lg px-5 py-4 transition-all duration-300 border border-gray-800/30 ${
                activeIndex === index ? 'from-gray-800/80 to-black/90' : 'group-hover:from-gray-800/80 group-hover:to-black/90'
              }`}>
                <div className="flex justify-between items-center gap-4">
                  <span className="font-semibold text-base sm:text-lg text-gray-100">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <FiChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </div>
              </div>
            </div>
          </button>

          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-gray-800/30 px-5 py-4 mt-1 rounded-lg border border-gray-800/50 backdrop-blur-sm">
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}