import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={() => paginate(currentPage - 1)}
        className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'} mr-2`}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <button
        onClick={() => paginate(currentPage + 1)}
        className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
