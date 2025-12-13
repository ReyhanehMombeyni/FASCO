"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    if (pageNumber === 1) {
      params.delete("page");
    } else {
      params.set("page", pageNumber.toString());
    }
    return `${pathname}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null;

  return (
    <div className="pt-5">
        <nav className="pagination-controls flex gap-4 items-center">
        <Link
            aria-disabled={currentPage <= 1}
            href={currentPage <= 1 ? '#' : createPageURL(currentPage - 1)}
            className={`${currentPage <= 1 ? "text-gray-400 cursor-auto" : ""} text-xl`}
            
        >
            «
        </Link>

        {pages.map((page) => (
            <Link
            key={page}
            href={page === currentPage ? '#' : createPageURL(page)}
            className={`${page === currentPage ? "bg-gray-100 px-2 rounded-full cursor-auto" : ""}`}
            >
            {page}
            </Link>
        ))}

        <Link
            aria-disabled={currentPage >= totalPages}
            href={currentPage >= totalPages ? '#' : createPageURL(currentPage + 1)}
            className={`${currentPage >= totalPages ? "text-gray-400 cursor-auto" : ""} text-xl`}
        >
            »
        </Link>
        </nav>
    </div>
  );
}
