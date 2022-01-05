import Link from "next/link";
import React from "react";

interface PaginationProps {
  pageCount: number;
  page: number;
}

const Pagination = ({ pageCount, page }: PaginationProps) => {
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {pageCount > page && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </>
  );
};

export default Pagination;
