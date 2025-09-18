import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="mx-1 px-3 py-1 bg-gray-100 rounded-lg disabled:opacity-60 cursor-pointer disabled:cursor-auto"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3.5 py-1 rounded-lg bg-gray-100 text-black hover:bg-gray-300 ${
            currentPage === page ? "bg-gray-300 text-black" : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="mx-1 px-3 py-1 bg-gray-100 rounded-lg disabled:opacity-60 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
