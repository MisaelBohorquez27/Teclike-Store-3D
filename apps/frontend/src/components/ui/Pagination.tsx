"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  const maxVisiblePages = 3; // Máximo de números de página visibles
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <nav className="flex items-center space-x-1">
        {/* Botón Anterior */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Página anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Primera página */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                1 === currentPage
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 hover:bg-gray-100"
              }`}
            >
              1
            </button>
            {startPage > 2 && (
              <span className="w-8 h-8 flex items-center justify-center text-gray-400">
                ...
              </span>
            )}
          </>
        )}

        {/* Páginas intermedias */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Última página */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="w-8 h-8 flex items-center justify-center text-gray-400">
                ...
              </span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                totalPages === currentPage
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Botón Siguiente */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Página siguiente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>
    </div>
  );
};