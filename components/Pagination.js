"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Pagination = ({ totalPages, page }) => {
  const pageC = page ?? 1;

  const [currentPage, setCurrentPage] = useState(pageC);
  const router = useRouter();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push(`?page=${page}`, undefined, { shallow: true });
  };

  return (
    <div className="join">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="join-item btn"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={
            currentPage === page ? "join-item btn btn-active" : "join-item btn"
          }
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="join-item btn"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
