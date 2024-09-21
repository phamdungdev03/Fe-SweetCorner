import React from "react";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const SimplePagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  handlePageClick,
}) => {
  return (
    <div className="flex justify-center items-center mt-8 mr-10 w-full">
      <div className="flex items-center justify-center">
        <div className="py-3 border rounded-lg">
          <ol className="flex items-center text-sm text-gray-500 divide-x rtl:divide-x-reverse divide-gray-300">
            <li>
              <button
                type="button"
                className="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-violet-500/10 focus:ring-2 focus:ring-violet-500 transition text-violet-600"
                aria-label="Previous"
                rel="prev"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <GrLinkPrevious
                  strokeWidth={2}
                  className={
                    currentPage === 1 ? "h-4 w-4 text-gray-300" : "h-4 w-4"
                  }
                />
              </button>
            </li>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              return (
                <li key={pageNumber}>
                  <button
                    type="button"
                    className={`relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none transition text-violet-600 ${
                      currentPage === pageNumber
                        ? "focus:underline bg-violet-500/10 ring-2 ring-violet-500"
                        : "hover:bg-gray-500/5 focus:bg-violet-500/10 focus:ring-2 focus:ring-violet-500 focus:text-violet-600"
                    }`}
                    onClick={() => handlePageClick(pageNumber)}
                  >
                    <span>{pageNumber}</span>
                  </button>
                </li>
              );
            })}

            <li>
              <button
                type="button"
                className="relative flex items-center justify-center font-medium min-w-[2rem] px-1.5 h-8 -my-3 rounded-md outline-none hover:bg-gray-500/5 focus:bg-violet-500/10 focus:ring-2 focus:ring-violet-500 transition text-violet-600"
                aria-label="Next"
                rel="next"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <GrLinkNext
                  className={
                    currentPage === totalPages
                      ? "h-4 w-4 text-gray-300"
                      : "h-4 w-4"
                  }
                />
              </button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SimplePagination;
