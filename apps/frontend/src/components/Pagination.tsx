import React from "react";
import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generar páginas visibles (máximo 5)
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas alrededor de la actual
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      
      if (currentPage <= 3) {
        start = 1;
        end = 5;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 4;
        end = totalPages;
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Botón Anterior */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl
          ${currentPage === 1 
            ? "bg-gray-800/30 text-gray-500 cursor-not-allowed" 
            : "bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/50 hover:border-cyan-500/30 text-white hover:text-cyan-300 cursor-pointer"
          }
        `}
      >
        <FiChevronLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Anterior</span>
      </button>

      {/* Páginas */}
      <div className="flex items-center gap-1">
        {/* Primera página si no está visible */}
        {visiblePages[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3.5 py-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 text-gray-400 hover:text-white text-sm font-medium transition-all duration-300 border border-gray-800/50 hover:border-gray-700/50"
            >
              1
            </button>
            {visiblePages[0] > 2 && (
              <span className="px-2 text-gray-600">
                <FiMoreHorizontal className="w-4 h-4" />
              </span>
            )}
          </>
        )}

        {/* Páginas visibles */}
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-3.5 py-2 rounded-lg text-sm font-medium
              ${currentPage === page
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                : "bg-gray-900/50 hover:bg-gray-800/50 text-gray-400 hover:text-white border border-gray-800/50 hover:border-gray-700/50"
              }
            `}
          >
            {page}
          </button>
        ))}

        {/* Última página si no está visible */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-2 text-gray-600">
                <FiMoreHorizontal className="w-4 h-4" />
              </span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3.5 py-2 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 text-gray-400 hover:text-white text-sm font-medium border border-gray-800/50 hover:border-gray-700/50"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Botón Siguiente */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`
          flex items-center gap-2 px-4 py-2.5 rounded-xl
          ${currentPage === totalPages
            ? "bg-gray-800/30 text-gray-500 cursor-not-allowed"
            : "bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/50 hover:border-cyan-500/30 text-white hover:text-cyan-300 cursor-pointer"
          }
        `}
      >
        <span className="text-sm font-medium">Siguiente</span>
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}