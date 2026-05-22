// components/Pagination.tsx

"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="flex gap-1.5 justify-center mt-4 sm:mt-6">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`font-sans text-xs px-2.5 sm:px-3 py-1 border rounded-md transition-colors ${
            page === currentPage
              ? "bg-blog-accent text-white border-blog-accent"
              : "bg-blog-surface text-blog-text-muted border-blog-border hover:border-blog-accent"
          }`}
        >
          {page}
        </button>
      ))}
      <button className="font-sans text-xs px-2.5 sm:px-3 py-1 bg-blog-surface text-blog-text-muted border border-blog-border rounded-md hover:border-blog-accent transition-colors">
        →
      </button>
    </div>
  );
}